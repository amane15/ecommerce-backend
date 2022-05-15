const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, min: 3, max: 255 },
        email: {
            type: String,
            default: false,
            unique: true,
            min: 8,
            max: 255,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        phone: { type: String },
        address: { type: String, min: 10, max: 255 },
        isAdmin: { type: Boolean, default: false },
        isSeller: { type: Boolean, default: false },
        cart: { type: Array },
        wishlist: { type: Array },
        orders: { type: Array },
    },
    { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            isAdmin: this.isAdmin,
            phone: this.phone,
            address: this.address,
        },
        process.env.jwtPrivateKey
    );
    return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().min(9).max(20).required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().min(10).max(10),
        address: Joi.string().min(10).max(255),
        isAdmin: Joi.boolean().default(false),
        isSeller: Joi.boolean().default(false),
    });

    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
