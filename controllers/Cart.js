const { Cart } = require("../models/Cart");


exports.addToCart = (async (req, res) => {
    console.log(req.body, "from add to cart controller")
   const newCart = new Cart(req.body)

   try {
      const doc = await newCart.save();
      const cart = await doc.populate("product")
      res.status(201).json(cart)
      console.log(doc)

   } catch (error) {
      res.status(400).json(error)
   }

})

exports.fetchCartByUser = (async (req, res) => {
    const {user} = req.query
   try {
     const cart = await Cart.find({user : user}).populate('product')
     res.status(200).json(cart)
   } catch (error) {
      res.status(400).json(error)
   }
})

exports.updateCart = (async (req, res) => {
     const {id} = req.params;
     
     try {
      const cart = await Cart.findByIdAndUpdate(id, req.body, {new : true}).populate('product');
      res.status(200).json(cart)
   } catch (error) {
      res.status(400).json(error)
   }
})
exports.deleteFromCart = (async (req, res) => {
     const {id} = req.params;
     try {
      const cart = await Cart.findByIdAndDelete(id);
      res.status(200).json(cart)
   } catch (error) {
      res.status(400).json(error)
   }
})