const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId },
        products: [
            {
                productId: {
                    type: String,
                },
                img: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        total: { type: Number, required: true, min: 0 },
        status: { type: String, default: "pending" },
        date: { type: Date, default: Date.now() },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
exports.orderSchema = orderSchema;
