require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require('./routes/userRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const rajaOngkirRoutes = require('./routes/rajaOngkirRoutes');
const productRoutes = require('./routes/productRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); 
const salesOrderRoutes = require('./routes/salesOrderRoutes');

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

// testing route
app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello world!" });
});

// users
app.use('/api', rajaOngkirRoutes);
app.use('/api/users', userRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/products', productRoutes);
app.use('/api', feedbackRoutes); 
app.use('/api', salesOrderRoutes);


app.listen(8000, () => {
  console.log("Server started on port 8000");
});
