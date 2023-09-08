const express = require('express');
const { createBrands, fetchBrands } = require('../controllers/Brand');

const router = express.Router();

router
.post("/", createBrands)
.get("/", fetchBrands)


exports.brandRoutes = router