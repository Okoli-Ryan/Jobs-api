require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const app = express();
const connectDB = require("./db/connect");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { auth: authorization } = require("./middleware/authentication");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authorization, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
