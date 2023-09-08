const express = require('express');
const { createOrder, fetchOrderByUser, deleteOrder, updateOrder, fetchAllOrder } = require('../controllers/Order');

const router = express.Router();

router
.post("/", createOrder)
.get("/user", fetchOrderByUser)
.get("/", fetchAllOrder)
.delete("/:id", deleteOrder)
.patch("/:id", updateOrder)


exports.orderRoutes = router


