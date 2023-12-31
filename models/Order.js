const { mongoose,  } = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new mongoose.Schema({

    items: { type: [Schema.Types.Mixed], required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true, },
    totalItems: { type: Number, required: true, },
    paymentMethod: { type: String, required: true, },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
    status: { type: String, required: true , default: "pending"},
    
  });
  
  const virtual = OrderSchema.virtual('id');
  virtual.get(function(){
    return this._id;
  })
  OrderSchema.set("toJSON", {
    virtuals : true,
    versionKey : false,
    transform : function (doc, ret) {delete ret._id}
  })
  
  exports.Order = mongoose.model('Order', OrderSchema);
  
  
  