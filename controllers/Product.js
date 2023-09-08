const { Product } = require("../models/Product");


exports.createProducts = (async (req, res) => {
   //  this data we will get from api frontend
   const product = new Product(req.body)

   try {
      const doc = await product.save();
      res.status(201).json(doc)
      console.log(doc)

   } catch (error) {
      res.status(400).json(error)
   }

})

exports.getAllProducts = (async (req, res) => {

   let query =  Product.find({});
   let totalProducts = Product.find({});

   if (req.query.category) {
      query = query.find({ category: req.query.category })
      totalProducts = totalProducts.find({ category: req.query.category })
   }
   if (req.query.brand) {
      query = query.find({ brand: req.query.brand })
      totalProducts = totalProducts.find({ brand: req.query.brand })
   }
   if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order })
   }

   const totalDoc = await totalProducts.count().exec();

   if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit
      const page = req.query._page
      query = query.skip(pageSize * (page - 1)).limit(pageSize)
   }

   try {
      const doc = await query.exec();
      res.set('X-Total-Count' , totalDoc);
      res.status(200).json(doc)
   } catch (error) {
      res.status(400).json(error)
   }
})

exports.getProductById = (async (req, res) => {
     const {id} = req.params;
     console.log(id, "from get product by id controller")
     
     try {
      const product = await Product.findById(id);
      res.status(200).json(product)
   } catch (error) {
      res.status(400).json(error)
   }
})

exports.updateProduct = (async (req, res) => {
     const {id} = req.params;
     
     try {
      const product = await Product.findByIdAndUpdate(id, req.body, {new : true});
      res.status(200).json(product)
   } catch (error) {
      res.status(400).json(error)
   }
})