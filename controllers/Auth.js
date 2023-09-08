const { User } = require("../models/User");

exports.createUser = (async (req, res) => {
//    console.log(req.body)
    const newUser = new User(req.body)
 
    try {
       const user = await newUser.save();
       res.status(201).json({id:user.id, email:user.email, role: user.role})
       console.log(user)
 
    } catch (error) {
       res.status(400).json(error)
    }
 
 })
 
exports.loginUser = (async (req, res) => {

    try {
      const user = await User.findOne({email : req.body.email})
      if(!user){
        res.status(401).json({message : 'Invalid credentials'})
      }else if(user.password===req.body.password){
        res.status(201).json({id:user.id, email:user.email, role: user.role})
        console.log('LOGIN SUCCESS')
      }else{
        res.status(401).json({message : 'Invalid credentials'})
      }
 
    } catch (error) {
       res.status(400).json(error)
    }
 
 })
 