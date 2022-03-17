const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./routes/users");
const auths = require("./routes/auth");
const carts = require("./routes/cart");
const products = require("./routes/products");
const orders = require("./routes/orders");
const error = require("./middleware/error");
const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auths);
app.use("/api/products", products);
app.use("/api/cart", carts);
app.use("/api/orders", orders);
app.use(error);

mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("Connected to database"))
    .catch((e) => console.log("Error", e));

app.listen(process.env.PORT || 3001, () => {
    console.log("Listening on port 3001");
});
