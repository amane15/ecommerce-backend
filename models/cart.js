const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
    },
});

const Cart = mongoose.model("Cart", cartSchema);

exports.Cart = Cart;
