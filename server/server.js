const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const myFirstSecret = process.env.FIRST_SECRET_KEY;

// const payload = {
//     id: user._id
// };

// notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);

const connectDb = require("./config/mongoose.config");
connectDb();

app.use(cookieParser());

app.use(cors());

app.use(express.json());


// app.use(cors({ credentials: true, origin: `http://localhost:8000/api/users` }));

// res.cookie("mycookie", "mydata", { httpOnly: true }).json({
//     message: "This response has a cookie",
// });

const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));
