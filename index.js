require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { brandRoutes } = require('./routes/Brand');
const { categoryRoutes } = require('./routes/Category');
const { productRoutes } = require('./routes/Product');
const { userRoutes } = require('./routes/User');
const { authRoutes } = require('./routes/Auth');
const { cartRoutes } = require('./routes/Cart');
const { orderRoutes } = require('./routes/Order');


const server = express()

// MIDDLEWARES
server.use(cors({                          // for cross origin error
    exposedHeaders :["X-Total-Count"]
}))
server.use(express.json()) // to parse req.body

// our APIs
server.use("/api/products", productRoutes)
server.use("/api/categories", categoryRoutes)
server.use("/api/brands", brandRoutes)
server.use("/api/users", userRoutes)
server.use("/api/users/auth", authRoutes)
server.use("/api/cart", cartRoutes)
server.use("/api/orders", orderRoutes)


// DATABASE CONNECTION
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DATABASE CONNECTED')
}


server.get("/", (req, res) => res.json({ data: "success" }))




const port = process.env.PORT
server.listen(port, () => {
    console.log("Hi, I am listening at " + port)
})