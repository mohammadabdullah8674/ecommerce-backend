const express = require('express');
const { createProducts, getAllProducts, getProductById, updateProduct } = require('../controllers/Product');

const router = express.Router();

router
.post("/", createProducts)
.get("/", getAllProducts)
.get("/:id", getProductById)
.patch("/:id", updateProduct)


exports.productRoutes = router