const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cart:{
        items:[
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity:{type:Number,required:true}
            }
            
        ]
    }
   
});

cartSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.findIndex(cp =>{
        return cp.productId.toString() === product._id.toString();

    });
    let newQuantity = 1;
    const updatedCartItems =[...this.cart.items];

    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity =newQuantity;

    } else {
        updatedCartItems.push({
            productId: new ObjectId(object._id),
            quantity: newQuantity
        }); 
    }
    const updatedCart ={
        items: updatedCartItems
    }; 
    this.cart = updatedCart;
    return this.save();
 
};

module.exports = mongoose.model('Cart', cartSchema);