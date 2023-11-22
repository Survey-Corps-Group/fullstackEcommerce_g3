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

// mengecek apakah user sudah login atau belum
function authorizeUser(req, res, next) {
  if (req.role !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Customers only.",
    });
  }
  next();
}

// middleware admin setelah login
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

// testing route
app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello world!" });
});

// register
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

// login
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

// Get User
app.get("/api/users", async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        email: true,
        address: true,
        full_name: true,
        phone: true,
        role: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// Get User By Id
app.get("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        username: true,
        email: true,
        password: true,
        address: true,
        full_name: true,
        phone: true,
        role: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// Update User
app.put("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const {
    username,
    email,
    password,
    address,
    full_name,
    phone,
    role,
  } = req.body;

  try {
    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10); // Hash password jika ada
    if (address) updateData.address = address;
    if (full_name) updateData.full_name = full_name;
    if (phone) updateData.phone = phone;
    if (role) updateData.role = role;

    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        user_id: updatedUser.user_id,
        username: updatedUser.username,
        email: updatedUser.email,
        address: updatedUser.address,
        full_name: updatedUser.full_name,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// Delete User
app.delete("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });

    res.json({
      success: true,
      message: "User deleted successfully",
      deletedUserId: deletedUser.user_id,
    });
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`,
      });
    }
  }
});

// Filter Produk

// by page ok, by price ok, by rating ok, not about by most popular
function calculateSummaryRating(feedbacks) {
  if (!feedbacks.length) return 0;
  const totalRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
  return totalRating / feedbacks.length;
}

app.get("/api/products", async (req, res) => {
  const { page, item_name, price, rating, sort } = req.query;
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

    let filteredProducts = products;
    console.log(rating);
    if (rating) {
      const ratingThreshold = parseFloat(rating);
      filteredProducts = products.filter(
        (product) =>
          calculateSummaryRating(product.feedbacks) == ratingThreshold
      );
    }

    if (sort === "best-selling") {
      filteredProducts.sort((a, b) => b.feedbacks.length - a.feedbacks.length);
    }

    const result = filteredProducts.map((product) => ({
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

//BAGIAN MUKTI (ACTIVITY 7, 8, 9)
/* note/DOKUMENTASI PENGGUNAAN DATA :
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
app.get("/admin/products", async (req, res) => {
  try {
    const adminProducts = await prisma.item.findMany({
      select: {
        item_name: true,
        price: true,
        description: true,
        color: true,
        package_weight: true,
        stock_item: true,
        feedbacks: {
          select: {
            feedback_id: true,
          },
        },
        images: {
          select: {
            image_url: true,
          },
        },
        WarehouseItem: {
          select: {
            warehouse_id: true,
          },
        },
      },
    });

    const result = adminProducts.map((product) => ({
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

    res.json({ products: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});
//api admin add product
app.post("/admin/products", upload.array("images", 5), async (req, res) => {
  try {
    const {
      item_name,
      price,
      description,
      color,
      package_weight,
      stock_item,
    } = req.body;

    // Check if the product with the same name already exists
    const existingProduct = await prisma.item.findFirst({
      where: {
        item_name: item_name,
      },
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with the same name already exists",
      });
    }

    // Create the new product
    const newProduct = await prisma.item.create({
      data: {
        item_name,
        price: parseFloat(price),
        description,
        color,
        package_weight: parseInt(package_weight),
        stock_item: parseInt(stock_item),
      },
    });

    // If there are image files uploaded, save their information
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const image_url = file.path.replace("\\", "/"); // Fix path for Windows
        await prisma.itemImage.create({
          data: {
            item_id: newProduct.item_id,
            image_url,
          },
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});
//api edit product
app.put(
  "/admin/products/:itemId",
  upload.array("images", 5),
  async (req, res) => {
    try {
      const itemId = parseInt(req.params.itemId);
      const {
        item_name,
        price,
        description,
        color,
        package_weight,
        stock_item,
      } = req.body;

      // Check if the product with the given ID exists
      const existingProduct = await prisma.item.findUnique({
        where: {
          item_id: itemId,
        },
        include: {
          images: {
            select: {
              item_image_id: true,
            },
          },
        },
      });

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Delete existing images associated with the product
      await prisma.itemImage.deleteMany({
        where: {
          item_id: itemId,
        },
      });

      // Update the product information
      const updatedProduct = await prisma.item.update({
        where: {
          item_id: itemId,
        },
        data: {
          item_name,
          price: parseFloat(price),
          description,
          color,
          package_weight: parseInt(package_weight),
          stock_item: parseInt(stock_item),
          // You can include other fields as needed
        },
      });

      // If new images are uploaded, save the image information
      if (req.files) {
        const images = req.files.map((file) => ({
          item_id: itemId,
          image_url: file.path.replace("\\", "/"), // Fix path for Windows
        }));

        await prisma.itemImage.createMany({
          data: images,
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`,
      });
    }
  }
);
//api admin delete product by id
app.delete("/admin/products/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);

    // Check if the product with the given ID exists
    const existingProduct = await prisma.item.findUnique({
      where: {
        item_id: itemId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete the product and its related data
    await prisma.itemImage.deleteMany({
      where: {
        item_id: itemId,
      },
    });

    await prisma.item.delete({
      where: {
        item_id: itemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product and related data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});
//api admin lihat list order dari customer
app.get("/admin/listorder", async (req, res) => {
  try {
    const orders = await prisma.salesOrder.findMany({
      select: {
        salesorder_id: true,
        salesorder_no: true,
        sub_total: true,
        is_verified: true,
      },
    });

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});
// API admin retrieve detailed information about a specific order
app.get("/admin/orders/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);

    const orderDetails = await prisma.salesOrder.findUnique({
      where: {
        salesorder_id: orderId,
      },
      include: {
        details: {
          select: {
            quantity: true,
            item: {
              select: {
                item_name: true,
                price: true,
              },
            },
          },
        },
        user: {
          select: {
            full_name: true,
            address: true,
          },
        },
      },
    });

    if (!orderDetails) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const selectedFields = {
      salesorder_id: true,
      user_id: true,
      order_status: true,
      shipping_cost: true,
      sub_total: true,
      is_verified: true,
      image_payment: true,
    };

    // Include selected fields in the response
    const response = {
      success: true,
      orderDetails: {
        ...orderDetails,
        ...selectedFields,
      },
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});
//api untuk set isverified = true
//sKENario : admin mengklik accept di salah satu order customer (utk mengacc pembayaran)
app.put("/admin/orders/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);

    // Check if the order with the given ID exists
    const existingOrder = await prisma.salesOrder.findUnique({
      where: {
        salesorder_id: orderId,
      },
    });

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update the is_verified status to true
    const updatedOrder = await prisma.salesOrder.update({
      where: {
        salesorder_id: orderId,
      },
      data: {
        is_verified: true,
      },
    });

    res.json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// warehouse
// Get Warehouse
app.get("/api/warehouses", async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      select: {
        warehouse_id: true,
        city: true,
        province: true,
      },
    });

    res.json(warehouses);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// Get Warehouse By Id
app.get("/api/warehouses/:id", async (req, res) => {
  const warehouseId = parseInt(req.params.id);

  try {
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        warehouse_id: warehouseId,
      },
      select: {
        warehouse_id: true,
        city: true,
        province: true,
      },
    });

    if (warehouse) {
      res.json(warehouse);
    } else {
      res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// create warehouse
app.post("/api/warehouses", async (req, res) => {
  const { city, province } = req.body;

  try {
    const newWarehouse = await prisma.warehouse.create({
      data: {
        city: city,
        province: province,
      },
    });

    res.json({
      success: true,
      message: "Warehouse created successfully",
      warehouse: newWarehouse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

app.put("/api/warehouses/:id", async (req, res) => {
  const warehouseId = parseInt(req.params.id);
  const { city, province } = req.body;

  try {
    let updateData = {};
    if (city) updateData.city = city;
    if (province) updateData.province = province;

    const updatedWarehouse = await prisma.warehouse.update({
      where: {
        warehouse_id: warehouseId,
      },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Warehouse updated successfully",
      warehouse: updatedWarehouse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

// delete warehouse
app.delete("/api/warehouses/:id", async (req, res) => {
  const warehouseId = parseInt(req.params.id);

  try {
    const deletedWarehouse = await prisma.warehouse.delete({
      where: {
        warehouse_id: warehouseId,
      },
    });

    res.json({
      success: true,
      message: "Warehouse deleted successfully",
      deletedWarehouseId: deletedWarehouse.warehouse_id,
    });
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`,
      });
    }
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
