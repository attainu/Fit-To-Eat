var mongoose = require("mongoose")
var Schema = mongoose.Schema

var cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        product: [
            {
                type: Schema.Types.ObjectId,
                ref: "product"
            }
        ]
    },
    { timestamps: true }
);

var Cart = mongoose.model("cart", cartSchema)
module.exports = Cart;