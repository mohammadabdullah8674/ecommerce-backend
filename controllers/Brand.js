const { Brand } = require("../models/Brand");


exports.createBrands = (async (req, res) => {
   
   const brand = new Brand(req.body)

   try {
      const doc = await brand.save();
      res.status(201).json(doc)
      console.log(doc)

   } catch (error) {
      res.status(400).json(error)
   }

})

exports.fetchBrands = (async (req, res) => {
   try {
      const doc = await Brand.find();
      res.status(200).json(doc)
   } catch (error) {
      res.status(400).json(error)
   }
})