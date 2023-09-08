const { Category } = require("../models/Category");


exports.createCategory = (async (req, res) => {
   const category = new Category(req.body)

   try {
      const doc = await category.save();
      res.status(201).json(doc)
      console.log(doc)

   } catch (error) {
      res.status(400).json(error)
   }

})

exports.fetchCategories = (async (req, res) => {
   try {
      const doc = await Category.find();
      res.status(200).json(doc)
   } catch (error) {
      res.status(400).json(error)
   }
})