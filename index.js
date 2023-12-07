require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// raja ongkir
const RAJA_ONGKIR_KEY = process.env.RAJA_ONGKIR_KEY;
const RAJA_ONGKIR_URL = process.env.RAJA_ONGKIR_URL;

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //biar token yg asli ga dirubah2
  if (token == null)
    return res.status(401).json({
      success: false,
      message: "Unauthorized, Please login first",
    });

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  req.role = user.role;
  req.city_id = user.city_id;
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
    origin: process.env.FRONTEND_URL,
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

// smtp email
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
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
    city_id,
    province_id
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
    const createUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        address,
        full_name,
        phone,
        role: 'customer',
        city_id: parseInt(city_id),
        province_id: parseInt(province_id)
      },
    });

    // create cart
    const createCart = await prisma.cart.create({
      data: {
        userId: createUser.user_id,
        cartId: createUser.user_id,
      },
    });

    res.json({
      success: true,
      message: "User registered and cart register successfully",
      createCart,
      createUser
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: `Error registering user and cart: ${err.message}`,
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
        message: "username or password is wrong",
      });
    }
    const token = jwt.sign(
      { userId: user.user_id, role: user.role, city_id: user.city_id },
      process.env.JWT_SECRET);
    res.json({
      success: true,
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error registering user: ${err.message}`,
    });
  }
});

// Get User
app.get("/api/users", authenticateTokenMiddleware, authorizeAdmin, async (_, res) => {
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
        city_id: true,
        province_id: true
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

// get order user
app.get("/api/users/orders", authenticateTokenMiddleware, async (req, res) => {
  const user_id = req.userId
  try {
    const order = await prisma.salesOrder.findMany({
      where: {
        user_id: user_id
      }
    })

    res.json(order)
  } catch (e) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
})

// Get User By Id
app.get("/api/users/:id", authenticateTokenMiddleware, async (req, res) => {
  const userId = parseInt(req.params.id);

  if (req.userId !== userId && req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        username: true,
        email: true,
        address: true,
        full_name: true,
        phone: true,
        role: true,
        city_id: true,
        province_id: true
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
app.put("/api/users/:id", authenticateTokenMiddleware, async (req, res) => {
  const userId = parseInt(req.params.id);

  if (req.userId !== userId && req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  }

  const {
    username,
    email,
    password,
    address,
    full_name,
    phone,
    city_id,
    province_id
  } = req.body;

  try {
    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10); // Hash password jika ada
    if (address) updateData.address = address;
    if (full_name) updateData.full_name = full_name;
    if (phone) updateData.phone = phone;
    if (city_id) updateData.city_id = parseInt(city_id);
    if (province_id) updateData.province_id = parseInt(province_id);

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
        city_id: updatedUser.city_id,
        province_id: updatedUser.province_id
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
app.delete("/api/users/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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

app.post("/api/users/admin/register", async (req, res) => {
  const {
    username,
    email,
    password,
    address,
    full_name,
    phone,
    province_id,
    city_id
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
        role: 'admin',
        city_id: parseInt(city_id),
        province_id: parseInt(province_id)
      },
    });

    res.json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: `Error registering user: ${err.message}`,
    });
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
  const limit = 9;
  const offset = page ? (page - 1) * limit : 0;
  const ratingThreshold = rating ? parseFloat(rating) : null;

  try {
    // Filter dasar untuk query
    const whereFilter = {
      item_name: item_name ? { contains: item_name, mode: 'insensitive' } : undefined,
      price: price ? { equals: parseFloat(price) } : undefined,
    };

    // Mengambil data produk
    const products = await prisma.item.findMany({
      skip: offset,
      take: limit,
      where: whereFilter,
      include: {
        images: {
          select: {
            image_url: true,
          },
        },
        WarehouseItem: {
          include: {
            warehouse: {
              select: {
                city: true,
              }
            }
          }
        },
      },
    });

    // Menambahkan rata-rata rating
    for (const product of products) {
      const aggregateFeedback = await prisma.feedback.aggregate({
        where: {
          item_id: product.item_id,
        },
        _avg: {
          rating: true,
        },
      });
      product.summary_rating = aggregateFeedback._avg.rating ? Math.round(aggregateFeedback._avg.rating) : null;
    }

    // Filter produk berdasarkan rating jika diperlukan
    let filteredProducts = products;
    if (rating) {
      const ratingThreshold = parseFloat(rating);
      filteredProducts = products.filter(
        (product) =>
        Math.round(product.summary_rating) === ratingThreshold
      );
    }

    const result = filteredProducts.map((product) => ({
      item_id: product.item_id,
      item_name: product.item_name,
      price: product.price,
      description: product.description,
      color: product.color,
      package_weight: product.package_weight,
      stock_item: product.stock_item,
      summary_rating: product.summary_rating,
      warehouse_city: product.WarehouseItem[0]?.warehouse?.city,
      images: product.images.map((img) => img.image_url),
    }));

    if (ratingThreshold) {
      totalRecords = await prisma.item.count({
        where: {
          ...whereFilter,
          feedbacks: {
            some: {
              rating: {
                gte: ratingThreshold
              }
            }
          }
        }
      });
    } else {
      totalRecords = await prisma.item.count({
        where: whereFilter
      });
    }

    res.json({ products: result, page: parseInt(page || 1), total_records: totalRecords });
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
app.get("/admin/products", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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
app.post("/admin/products", authenticateTokenMiddleware, authorizeAdmin, upload.array("images", 5), async (req, res) => {
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
  "/admin/products/:itemId", authenticateTokenMiddleware, authorizeAdmin,
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
app.delete("/admin/products/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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
app.get("/admin/listorder", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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
app.get("/admin/orders/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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
app.put("/admin/orders/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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
app.get("/api/warehouses", authenticateTokenMiddleware, authorizeAdmin, async (_, res) => {
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
app.get("/api/warehouses/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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
        city_id: true,
        province_id: true
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
app.post("/api/warehouses", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
  const { city, province, city_id, province_id } = req.body;

  try {
    const newWarehouse = await prisma.warehouse.create({
      data: {
        city: city,
        province: province,
        city_id: parseInt(city_id),
        province_id: parseInt(province_id)
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

app.put("/api/warehouses/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
  const warehouseId = parseInt(req.params.id);
  const { city, province, city_id, province_id } = req.body;

  try {
    let updateData = {};
    if (city) updateData.city = city;
    if (province) updateData.province = province;
    if (city_id) updateData.city_id = parseInt(city_id);
    if (province_id) updateData.province_id = parseInt(province_id);

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
app.delete("/api/warehouses/:id", authenticateTokenMiddleware, authorizeAdmin, async (req, res) => {
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

// integrasi raja ongkir
app.get("/api/province", async (req, res) => {
  const id = req.query.id
  try {
    const response = await axios.get(`${RAJA_ONGKIR_URL}/province`, {
      params: { id: id, key: RAJA_ONGKIR_KEY },
    });
    res.json(response.data.rajaongkir.results);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});

app.get("/api/city", async (req, res) => {
  const provinceId = req.query.province;
  const id = req.query.id
  if (!provinceId) {
    return res.status(400).json({
      success: false,
      message: "Province ID is required",
    });
  }

  try {
    const response = await axios.get(`${RAJA_ONGKIR_URL}/city`, {
      params: { id: id, province: provinceId, key: RAJA_ONGKIR_KEY },
    });
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});


app.post("/api/cost", async (req, res) => {
  const { origin, destination, weight, courier } = req.body;

  if (!origin || !destination || !weight || !courier) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required parameter: origin, destination, weight, or courier",
    });
  }

  try {
    const response = await axios.post(
      `${RAJA_ONGKIR_URL}/cost`,
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: { key: RAJA_ONGKIR_KEY },
      }
    );
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error calculating shipping cost",
    });
  }
});

// Search Product name
app.get('/api/products/search/:name', async (req, res) => {
  const product_name = req.params.name
  try {
    const productByName = await prisma.item.findMany({
      where: {
        item_name: {
          contains: product_name,
          mode: 'insensitive'
        }
      },
    });

    if (productByName) {
      res.json({ productByName });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// find product by id
app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const productById = await prisma.item.findUnique({
      where: { item_id: Number(id) },
      include: {
        feedbacks: true,
        images: {
          select: {
            image_url: true
          }
        }
      }
    });

    if (productById) {
      res.json(productById);
    } else {
      res.status(404).json({ success: "false", message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "false", message: 'Internal Server Error' });
  }
});


// create feedback
app.post('/api/products/:id/feedback', async (req, res) => {
  const id = req.params.id

  const { rating, description } = req.body
  try {
    const createFeedback = await prisma.feedback.create({
      data: {
        item_id: Number(id),
        rating,
        description
      }
    })
    res.json({ createFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// upload payment 
app.put('/api/payment_proof/:salesorder_id', upload.single('image'), async (req, res) => {
  const salesorder_id = req.params.salesorder_id

  try {
    const updateImagePayment = await prisma.salesOrder.update({
      where: {
        salesorder_id: Number(salesorder_id)
      },
      data: {
        image_payment: req.file.path
      }
    })
    res.json({ updateImagePayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// status recieved
app.put('/api/product/recieved/:salesorder_id', async (req, res) => {
  const salesorder_id = req.params.salesorder_id

  const recievedProduct = await prisma.salesOrder.update({
    where:
    {
      salesorder_id: Number(salesorder_id)
    }, data: {
      order_status: 'recieved'
    }
  })

  res.json({ recievedProduct })
})

// create order
app.post('/api/products/cart/checkout', authenticateTokenMiddleware, async (req, res) => {
  const { salesorder_no, order_status, customer_name, shipping_cost, sub_total } = req.body
  const orderDetails = req.body.orderDetails;
  try {
    const createOrder = await prisma.SalesOrder.create({
      data: {
        salesorder_no,
        user_id: req.userId,
        order_status,
        customer_name,
        shipping_cost,
        sub_total,
        is_verified: false,
        image_payment: ""
      }
    })

    const salesOrderId = createOrder.salesorder_id;
    const createdOrderDetails = await Promise.all(orderDetails.map(async orderDetail => {
      return prisma.SalesOrderDetail.create({
        data: {
          salesorder_id: salesOrderId,
          item_id: orderDetail.item_id,
          item_price: orderDetail.item_price,
          quantity: orderDetail.quantity
        }
      });
    }));

    const findCartId = await prisma.cart.findFirst({
      where: {
        userId: req.userId,
      }
    })
    const deleteCart = await prisma.cartItem.deleteMany({
      where: {
        cartId: findCartId.cartId
      }
    })
    res.json({ createOrder, createdOrderDetails, deleteCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


//createcart digunakan di tombol yang sama dengan create user
//skenarionya : jika klik tombol create user maka, masukan api ini juga utk create cart nya berdsarkan userId
app.post("/api/createcart", authenticateTokenMiddleware, async (req, res) => {
  try {
    // Get userId from the request body
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required in the request body.",
      });
    }

    // Check if the user with the provided userId exists
    const existingUser = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided userId.",
      });
    }

    // Create a new cart with the given userId and set cartId to userId
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
        cartId: userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Cart created successfully.",
      cartId: newCart.cartId,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

//create iteminsidecart
app.post('/api/itemcart', authenticateTokenMiddleware, async (req, res) => {
  try {

    const { userId, items } = req.body;

    // Cek apakah userId valid
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Buat keranjang baru atau temukan yang sudah ada
    let cart = await prisma.cart.findFirst({
      where: { userId: userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: userId },
      });
    }

    // Tambahkan item ke keranjang
    for (const item of items) {
      const itemData = await prisma.item.findUnique({
        where: { item_id: item.itemId },
      });

      if (!itemData || itemData.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient quantity for item ${item.itemId}` });
      }

      await prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          itemId: item.itemId,
          quantity: item.quantity,
        },
      });
    }

    return res.status(201).json({ message: 'CartItems added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//get isi cart berdasarkan id
app.get('/api/cart/:userId', authenticateTokenMiddleware, async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    // Menggunakan Prisma untuk mengambil data item berdasarkan userId
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
      },
      include: {
        item: {
          select: {
            item_id: true,
            package_weight: true,
            item_name: true,
            price: true,
            stock_item: true,
            images: {
              select: {
                image_url: true,
              },
            },
            WarehouseItem: {
              include: {
                warehouse: {
                  select: {
                    city_id: true,
                  }
                }
              }
            },
          },
        },
      },
    });

    // Mengambil data gambar untuk setiap item
    const itemsWithImages = cartItems.map((cartItem) => ({
      cartId: cartItem.cartId,
      item_id: cartItem.item.item_id,
      package_weight: cartItem.item.package_weight,
      item_name: cartItem.item.item_name,
      price: cartItem.item.price,
      quantity: cartItem.quantity,
      stock_item: cartItem.item.stock_item,
      warehouse_city: cartItem.item.WarehouseItem[0]?.warehouse?.city_id,
      image_url: cartItem.item.images[0]?.image_url || null, // Mengambil image_url pertama, jika ada
    }));

    res.json(itemsWithImages);
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/cart/:userId', authenticateTokenMiddleware, async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: userId,
        },
      },
    });

    res.json({ message: 'Cart items deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/cartItem', authenticateTokenMiddleware, async (req, res) => {
  const itemId = parseInt(req.query.itemId);
  const cartId = parseInt(req.query.cartId);

  try {
    await prisma.cartItem.delete({
      where: {
        cartId_itemId: {
          cartId: cartId,
          itemId: itemId,
        },
      },
    });

    res.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.patch('/api/cartItem', authenticateTokenMiddleware, async (req, res) => {
  const { userId, itemId, newQuantity } = req.body;

  if (newQuantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }

  try {
    const item = await prisma.item.findUnique({
      where: { item_id: parseInt(itemId) },
    });

    if (!item || item.quantity < newQuantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    const userCart = await prisma.cart.findFirst({
      where: { userId: parseInt(userId) },
    });

    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found for the user' });
    }

    const updatedCartItem = await prisma.cartItem.updateMany({
      where: {
        cartId: userCart.cartId,
        itemId: parseInt(itemId),
      },
      data: {
        quantity: parseInt(newQuantity),
      },
    });

    if (updatedCartItem.count === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// verified
app.put('/api/verified/:salesorder_id', authenticateTokenMiddleware, async (req, res) => {
  const salesorder_id = req.params.salesorder_id;
  try {
    const verified = await prisma.salesOrder.update({
      where: {
        salesorder_id: Number(salesorder_id)
      },
      data: {
        is_verified: true
      }
    })
    res.json({
      verified
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

})



// update stock quantity when checkout
app.put("/api/products/:itemId/stock", authenticateTokenMiddleware,
  async (req, res) => {
    try {
      const itemId = parseInt(req.params.itemId);
      const { stock_quantity } = req.body;

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

      const updatedProduct = await prisma.item.update({
        where: {
          item_id: itemId,
        },
        data: {
          stock_item: existingProduct.stock_item - parseInt(stock_quantity),
        },
      });

      res.status(200).json({
        success: true,
        message: "Stock quantity updated successfully",
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



// email
app.post('/api/send_mail', authenticateTokenMiddleware, (req, res) => {
  const { to, full_name, product } = req.body;
  const mailOptions = {
    from: 'surveycorps3@outlook.com',
    to: to,
    subject: 'Kami Ingin Mendengar Pendapat Anda Tentang Pembelian Anda di MommyMall!',
    text: `
    
    Kepada ${full_name},

    Terima kasih telah berbelanja di MommyMall! Kami harap Anda senang dengan pembelian ${product} Anda. Di MommyMall, kami selalu berusaha untuk memberikan produk berkualitas tinggi dan pengalaman berbelanja yang menyenangkan.

    Kami sangat menghargai jika Anda bisa meluangkan waktu sejenak untuk memberikan ulasan tentang ${product} yang Anda beli. Pendapat Anda sangat berharga bagi kami dan komunitas pelanggan kami. Ulasan Anda akan membantu pelanggan lain mendapatkan informasi yang mereka butuhkan sebelum melakukan pembelian dan juga membantu kami untuk terus meningkatkan layanan kami.

    Bagaimana Cara Memberikan Ulasan?

    Kunjungi halaman produk ${product} di MommyMall.
    Klik pada link "Tulis Ulasan" di bawah nama produk.
    Berikan penilaian Anda dan ceritakan pengalaman Anda menggunakan produk tersebut.
    Sebagai ucapan terima kasih, setiap ulasan yang Anda berikan akan membantu bagi customer kami.

    Terima kasih atas dukungan Anda kepada MommyMall. Kami tidak sabar untuk membaca ulasan Anda!

    Salam hangat,
    
    Michelle Wibowo
    CEO MommyMall
    
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: `Email sent: ${error.toString()}`,
      });
    }
    res.status(200).send({
      success: true,
      message: `Email sent: ${info.response}`,
    });
  });
});

//untuk get salesorder by so id
app.get('/api/salesorder/:salesorder_id', async (req, res) => {
  try {
    const salesorder_id = req.params.salesorder_id;
    const salesOrder = await prisma.salesOrder.findUnique({
      where: {
        salesorder_id: Number(salesorder_id),
      },
    });

    if (!salesOrder) {
      return res.status(404).json({ error: 'Sales order not found' });
    }

    res.json({ salesOrder });
  } catch (error) {
    console.error('Error getting sales order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(8000, () => {
  console.log("Server started on port 8000");
});
