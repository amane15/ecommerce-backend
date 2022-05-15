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
        console.log("getting wishlist");
        const user = await User.findById(req.user._id);
        res.send(user.wishlist);
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
        user.wishlist.push(cart);
        user.save();
        res.send("Product added to Wishlist");
    })
);

router.put(
    "/deleteProduct",
    auth,
    asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.user._id);
        let index;
        for (let i = 0; i < user.wishlist.length; i++) {
            if (user.wishlist[i].productId.valueOf() === req.body.productId) {
                index = i;
                break;
            }
        }
        user.wishlist.splice(index, 1);
        await user.save();
        res.send("Deleted Product");
    })
);

module.exports = router;
