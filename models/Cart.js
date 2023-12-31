const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new mongoose.Schema({

    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' , required: true },
    quantity: { type: Number, required: true }


});

const virtual = CartSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
CartSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Cart = mongoose.model('Cart', CartSchema);


