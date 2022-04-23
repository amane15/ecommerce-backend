const { User } = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/login", async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid username or password");

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send("Invalid username or password");

    const token = user.generateAuthToken();
    return res.send(token);
});

function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(user);
}

module.exports = router;
