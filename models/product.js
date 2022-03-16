const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, min: 3, max: 255 },
        description: { type: String, required: true, max: 255 },
        category: { type: String, required: true, min: 3, max: 255 },
        price: { type: Number, required: true, min: 0 },
        img: { type: String, default: "" },
        numberInStock: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().required(),
        category: Joi.string().min(3).max(255).required(),
        price: Joi.number().min(0).required(),
        img: Joi.string().default("").required(),
        numberInStock: Joi.number().min(1).required(),
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
