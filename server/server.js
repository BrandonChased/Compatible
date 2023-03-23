const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const myFirstSecret = process.env.FIRST_SECRET_KEY;

app.use(cors())

const connectDb = require("./config/mongoose.config");
connectDb();

app.use(cookieParser());

app.use(express.json());

const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));
