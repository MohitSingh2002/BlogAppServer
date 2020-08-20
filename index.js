const express = require("express");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Connected to MongoDB");
});

const app = express();

const Port = process.env.Port || 5000

app.use(express.json());
const userRoute = require("./routes/user");
app.use("/user", userRoute);

app.route("/").get((req,res) => {
    res.json("First REST API");
});

app.listen(Port, (req,res) => {
    console.log(`Listening on ${Port}`);
});
