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


// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});


