const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true, min: [0, "wrong min price"] },
  discountPercentage: { type: Number, min: [10, "wrong min discount"], max: [90, "wrong max discount"] },
  rating: { type: Number, min: [0, "wrong min rating"], max: [5, "wrong max rating"], default: 0 },
  stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
  
});

const virtual = ProductSchema.virtual('id');
virtual.get(function(){
  return this._id;
})
ProductSchema.set("toJSON", {
  virtuals : true,
  versionKey : false,
  transform : function (doc, ret) {delete ret._id}
})

exports.Product = mongoose.model('Product', ProductSchema);


