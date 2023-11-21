const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
require('dotenv').config();


function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader 
  && authHeader.split(" ")[1]; //biar token yg asli ga dirubah2
  if (token == null) return res.sendStatus(401);

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
}
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  optionsSuccessStatus: 200
}));

app.use('/uploads', express.static('uploads'));

// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage, limits: { fileSize: 10000000 } // 10MB limit
});


// cth aja
// app.post("/register", async (req, res) => {});





//activity 7,8,9 (bagian mukti)

//api dashboard home admin (menampilkan list product)


//api admin add product
app.post('/product', async (req, res) => {
  try {
    const { productName, price, description, color, packageWeight, stockItem, warehouseId, imageUrl } = req.body;

  //memungkinkan admin untuk menambahkan produk tanpa membuat gudang baru 
// (menggunakan gudang yang sudah ada), Anda dapat menyediakan pilihan gudang 
// yang sudah ada di formulir penambahan produk.
// dokumentasi front end: https://chat.openai.com/c/85b88042-1135-4b2b-9cfb-621ca8bf67aa

    // Menambah produk tanpa membuat gudang baru
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
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//api admin edit product by id
app.put('/product/:itemId', async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const { productName, price, description, color, packageWeight, stockItem, warehouseId, imageUrl } = req.body;

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
      return res.status(404).json({ success: false, error: 'Product not found' });
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
    console.error('Error editing product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//api admin delete product





app.listen(8000, () => {
  console.log('Server started on port 8000');
});


