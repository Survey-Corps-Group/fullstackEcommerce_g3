  require('dotenv').config()

  const express = require("express")
  const cors = require("cors")
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = require('./swagger')

  const userRoutes = require('./routes/userRoutes')
  const warehouseRoutes = require('./routes/warehouseRoutes')
  const rajaOngkirRoutes = require('./routes/rajaOngkirRoutes')
  const productRoutes = require('./routes/productRoutes')
  const feedbackRoutes = require('./routes/feedbackRoutes')
  const salesOrderRoutes = require('./routes/salesOrderRoutes')

  const app = express()
  const PORT = process.env.PORT

  // Middlewares
  app.use(express.json())
  app.use(cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  }))

  // Swagger Docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Static Files
  app.use("/uploads", express.static("uploads"))

  // Routes
  app.get("/", (_, res) => res.status(200).json({ message: "Hello world!" }))
  app.use('/api', rajaOngkirRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/warehouses', warehouseRoutes)
  app.use('/api/products', productRoutes)
  app.use('/api', feedbackRoutes)
  app.use('/api', salesOrderRoutes)

  // Start Server
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
