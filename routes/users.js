const router = require("express").Router();
const { validateUser, User } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");

router.get(
    "/me",
    auth,
    asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.user._id).select("-password");
        res.send(user);
    })
);

router.put(
    "/update",
    auth,
    asyncMiddleware(async (req, res) => {
        const { name, phone, address } = req.body.user;
        const user = await User.findByIdAndUpdate(req.user._id, {
            name,
            phone,
            address,
        });
        await user.save();

        res.send("Updated Successfully");
    })
);

router.post(
    "/register",
    asyncMiddleware(async (req, res) => {
        const { name, email, password } = req.body;
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email });
        if (user) return res.status(400).send("User Already Registered");

        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send({ name, email });
        res.send(user);
    })
);

module.exports = router;
