require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //biar token yg asli ga dirubah2
  if (token == null)
    return res.status(401).json({
      success: false,
      message: "Forbidden",
    });

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  req.role = user.role;
  next();
}

function authorizeAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
}

function authorizeAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

app.use("/uploads", express.static("uploads"));

// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello world!" });
});

app.post("/api/users/register", async (req, res) => {
  const {
    username,
    email,
    password,
    address,
    full_name,
    phone,
    role,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // pengecekan existing user
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    // Jika tidak ada user dengan email atau username yang sama
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        address,
        full_name,
        phone,
        role,
      },
    });

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: `Error registering user: ${err.message}`,
    });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "username doesnt exits",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({
        success: false,
        message: "invalid credentials",
      });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({
      success: true,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: `Error registering user: ${err.message}`,
    });
  }
});

function calculateSummaryRating(feedbacks) {
  if (!feedbacks.length) return 0;
  const totalRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
  return totalRating / feedbacks.length;
}

app.get("/api/products", async (req, res) => {
  const { page, item_name, price, summary_rating } = req.query;
  const limit = 10;
  const offset = page ? (page - 1) * limit : 0;

  try {
    const products = await prisma.item.findMany({
      skip: offset,
      take: limit,
      where: {
        item_name: item_name ? { contains: item_name } : undefined,
        price: price ? { equals: parseFloat(price) } : undefined,
      },
      include: {
        images: {
          select: {
            image_url: true,
          },
        },
        feedbacks: true,
        WarehouseItem: true,
      },
    });

    const result = products.map((product) => ({
      item_id: product.item_id,
      item_name: product.item_name,
      price: product.price,
      description: product.description,
      color: product.color,
      package_weight: product.package_weight,
      stock_item: product.stock_item,
      feedback_id: product.feedbacks.map((fb) => fb.feedback_id),
      summary_rating: calculateSummaryRating(product.feedbacks),
      warehouse_id: product.WarehouseItem.map((wh) => wh.warehouse_id),
      images: product.images.map((img) => img.image_url),
    }));

    res.json({ products: result, page: parseInt(page || 1) });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

//activity 7,8,9 (bagian mukti)
/* note :
1. api dashboard home admin (menampilkan list product)
get /product
select item_name, price, city from item join warehouse

2. api admin delete product
delete /product/:id
delete * where id = id params

PRODUCT
3. api admin edit data product
put /product/:itemid

5.api admin manage/lihat list order dari customer
get /orders
select salesorder_id, sub_total, is_verified
from salesorder join salesorder_detail

6.api admin lihat detail order (klik 1 order dari list)
get /orders/:id

query :
select salesorder_id
salesorder_no   
  user_id
  product
  order_status
  customer_name
  shipping_cost
  sub_total
  is_verified
  image_payment
item_id
item_price
quantity
 from salesorder join salesorder_detail

7. admin click ACC/ verifikasi pembayaran
PUT
update isverified=true
from salesorder
*/

//api dashboard home login as admin (menampilkan list product)
app.get("/products", async (req, res) => {
  try {
    const productList = await prisma.item.findMany({
      select: {
        item_name: true,
        price: true,
        warehouses: {
          select: {
            city: true,
          },
        },
      },
    });

    res.json(productList);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api admin add product
app.post("/product", async (req, res) => {
  try {
    const {
      productName,
      price,
      description,
      color,
      packageWeight,
      stockItem,
      warehouseId,
      imageUrl,
    } = req.body;

    //memungkinkan admin untuk menambahkan produk tanpa membuat gudang baru
    // (menggunakan gudang yang sudah ada),
    //Anda dapat menyediakan pilihan gudang yang sudah ada, di formulir penambahan produk.
    // dokumentasi front end: https://chat.openai.com/c/85b88042-1135-4b2b-9cfb-621ca8bf67aa

    // Menambah produk tanpa membuat gudang baru(gudang tinggal pilih)
    const newItem = await prisma.item.create({
      data: {
        item_name: productName,
        price,
        description,
        color,
        package_weight: packageWeight,
        stock_item: stockItem,
        warehouse_id: warehouseId, // Menggunakan gudang yang sudah ada
        ItemImage: {
          create: {
            image_url: imageUrl,
          },
        },
      },
    });

    res.json({ success: true, newItem });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//api admin edit product by id
app.put("/product/:itemId", async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const {
      productName,
      price,
      description,
      color,
      packageWeight,
      stockItem,
      warehouseId,
      imageUrl,
    } = req.body;

    //Mengambil informasi produk yang akan diubah
    //warehouse sudah ada tidak perlu ditambah
    //warehouse tinggal milih aja
    const existingItem = await prisma.item.findUnique({
      where: { item_id: itemId },
      include: {
        Warehouse: true,
        ItemImage: true,
      },
    });

    if (!existingItem) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Mengupdate informasi produk
    const updatedItem = await prisma.item.update({
      where: { item_id: itemId },
      data: {
        item_name: productName || existingItem.item_name,
        price: price || existingItem.price,
        description: description || existingItem.description,
        color: color || existingItem.color,
        package_weight: packageWeight || existingItem.package_weight,
        stock_item: stockItem || existingItem.stock_item,
        warehouse_id: warehouseId || existingItem.warehouse_id,
        ItemImage: {
          update: {
            image_url: imageUrl || existingItem.ItemImage?.image_url,
          },
        },
      },
    });

    res.json({ success: true, updatedItem });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//api admin delete product
app.delete("/product/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    // Menggunakan Prisma untuk menghapus produk berdasarkan ID
    const deletedProduct = await prisma.item.delete({
      where: { item_id: productId },
    });

    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//api admin lihat list order dari customer
app.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.salesOrder.findMany({
      select: {
        salesorder_id: true,
        sub_total: true,
        is_verified: true,
      },
      include: {
        details: {
          select: {
            item_price: true,
            quantity: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api admin liat 1 order dari customer (order detail)
//note : depend liat api pembelian
app.get("/orders/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const order = await prisma.salesOrder.findUnique({
      where: { salesorder_id: orderId },
      select: {
        salesorder_id: true,
        salesorder_no: true,
        user_id: true,
        product: true,
        order_status: true,
        customer_name: true,
        shipping_cost: true,
        sub_total: true,
        is_verified: true,
        image_payment: true,
        details: {
          select: {
            item_id: true,
            item_price: true,
            quantity: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Jika is_verified adalah null, setel nilainya ke false
    order.is_verified = order.is_verified ?? false;

    res.json(order);
  } catch (error) {
    console.error("Error retrieving order details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api untuk set isverified = true
//seknario : admin mengklik accept di salah satu order customer (utk mengacc pembayaran)
app.put("/orders/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    // Cek apakah SalesOrder dengan ID tertentu ada
    const existingOrder = await prisma.salesOrder.findUnique({
      where: { salesorder_id: orderId },
    });

    if (!existingOrder) {
      return res.status(404).json({ error: "SalesOrder not found" });
    }

    // Update isVerified menjadi true
    const updatedOrder = await prisma.salesOrder.update({
      where: { salesorder_id: orderId },
      data: { is_verified: true },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
