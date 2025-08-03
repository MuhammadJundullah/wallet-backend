import express from "express";
import dotenv from "dotenv";
import { initDB }  from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./route/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

app.use(express.json());

const port = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(port, () => {
      console.log("server is up and running on port", port);
    });
})

