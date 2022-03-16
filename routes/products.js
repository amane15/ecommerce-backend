const router = require("express").Router();
const mongoose = require("mongoose");
const { Product, validateProduct } = require("../models/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

router.get("/", async (req, res) => {
    const products = await Product.find({});

    res.send(products);
});

router.get(
    "/:id",
    asyncMiddleware(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("product does not exists");

        res.send(product);
    })
);

router.post(
    "/add",
    [auth, admin],
    asyncMiddleware(async (req, res) => {
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { title, description, category, price, img, numberInStock } =
            req.body;
        const product = new Product({
            title,
            description,
            category,
            price,
            img,
            numberInStock,
        });
        await product.save();

        res.send("Product added successfully");
    })
);

module.exports = router;
