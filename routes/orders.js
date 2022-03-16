const router = require("express").Router();
const { Order } = require("../models/order");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");

router.get(
    "/",
    auth,
    asyncMiddleware(async (req, res) => {
        const orders = await Order.find({ userId: req.user._id });
        console.log(orders);
        res.send(orders);
    })
);

router.post(
    "/",
    auth,
    asyncMiddleware(async (req, res) => {
        const order = new Order({
            userId: req.user._id,
            ...req.body,
        });

        await order.save();
        res.send("Order successfully placed");
    })
);

module.exports = router;
