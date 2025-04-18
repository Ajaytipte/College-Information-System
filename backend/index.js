require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser")

const app = express();

const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Middleware
// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use('/', Routes);

// Server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
