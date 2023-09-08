const { User } = require("../models/User");


exports.fetchUserById = (async (req, res) => {
   const { id } = req.params;
   console.log(id, "from user fetch")

   try {
      const user = await User.findById(id, 'id role email name addresses');
      res.status(200).json(user)
   } catch (error) {
      res.status(400).json(error)
   }
})

exports.updateUser = (async (req, res) => {
   const { id } = req.params;
   console.log(id, "from update conttt")

   try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      console.log(user, "update user controoller")
      res.status(200).json(
         {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            addresses: user.addresses,
            orders: user.orders
         })
   } catch (error) {
      res.status(400).json(error)
   }
})