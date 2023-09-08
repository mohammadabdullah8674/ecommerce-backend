const { Cart } = require("../models/Cart");
const { Order } = require("../models/Order");


exports.createOrder = (async (req, res) => {
    console.log(req.body, "from create order controller")
   const order = new Order(req.body)

   try {
      const doc = await order.save();
    //   const cart = await doc.populate("product")
      res.status(201).json(doc)
      console.log(doc)

   } catch (error) {
      res.status(400).json(error)
   }

})

exports.fetchAllOrder = (async (req, res) => {
    console.log("from fetchall  order")

    let query =  Order.find({});
    let totalOrders = Order.find({});
 
    
    if (req.query._sort && req.query._order) {
       query = query.sort({ [req.query._sort]: req.query._order })
    }
 
    const totalDoc = await totalOrders.count().exec();
 
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

exports.fetchOrderByUser = (async (req, res) => {
    const {user} = req.query
    console.log(user, "from fetch order cont")
   try {
     const orders = await Order.find({user : user})
     res.status(200).json(orders)
   } catch (error) {
      res.status(400).json(error)
   }
})

exports.updateOrder = (async (req, res) => {
     const {id} = req.params;
     console.log(id, "from update order controller")
     
     try {
      const order = await Order.findByIdAndUpdate(id, req.body, {new : true});
      res.status(200).json(order)
   } catch (error) {
      res.status(400).json(error)
   }
})
exports.deleteOrder = (async (req, res) => {
     const {id} = req.params;
     try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order)
   } catch (error) {
      res.status(400).json(error)
   }
})