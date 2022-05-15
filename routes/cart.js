const router = require("express").Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Cart } = require("../models/cart");
const { Product } = require("../models/product");
const asyncMiddleware = require("../middleware/async");

router.get(
    "/",
    auth,
    asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.user._id);
        res.send(user.cart);
    })
);

router.post(
    "/add",
    auth,
    asyncMiddleware(async (req, res) => {
        const { productId } = req.body;
        try {
            const product = await Product.findById(productId);
        } catch (ex) {
            return res.send("The product with the given id does not exists");
        }

        const cart = new Cart(req.body);
        const user = await User.findById(req.user._id);
        user.cart.push(cart);
        await user.save();
        res.send("Item added to cart");
    })
);

router.put(
    "/updateCart",
    auth,
    asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.user._id);
        let index;
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].productId.valueOf() === req.body.productId) {
                index = i;
                break;
            }
        }
        user.cart[index] = req.body;
        await user.save();
        res.send("Updated cart");
    })
);

router.put(
    "/deleteProduct",
    auth,
    asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.user._id);
        let index;
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].productId.valueOf() === req.body.productId) {
                index = i;
                break;
            }
        }
        user.cart.splice(index, 1);
        await user.save();
        res.send("Deleted Product");
    })
);

router.put(
    "/empty",
    auth,
    asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.user._id);
        user.cart = [];
        await user.save();
        res.send("cart emptied");
    })
);

module.exports = router;
