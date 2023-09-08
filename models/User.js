
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  email: { type: String, required: true, unique : true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  addresses: { type: [mongoose.Schema.Types.Mixed] }, 
  // TODO:  We can make a separate Schema for this
  name: { type: String },
  orders: { type: [mongoose.Schema.Types.Mixed] }
  
});

const virtual = UserSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

UserSchema.set("toJSON", {
  virtuals : true,
  versionKey : false,
  transform : function (doc, ret) {delete ret._id}
})

exports.User = mongoose.model('User', UserSchema);


// {
//   "email": "abcd@gmail.com",
//   "password": "Abcd@8674",
//   "address": [
//     {
//       "fullName": "Mohd Abdullah Zubair",
//       "email": "shafi@gmail.com",
//       "phone": "08674834127",
//       "street": "Azamgarhj",
//       "city": "Azamgarh",
//       "state": "up",
//       "postalcode": "276111"
//     }
//   ],
//   "id": 2,
//   "role": "user"
// }