import express from "express";
import dotenv from "dotenv";
import { initDB }  from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./route/transactionsRoute.js";

dotenv.config()

const port = process.env.PORT || 5001;

const app = express();

app.use(rateLimiter);
app.use(express.json()); 

app.get("/health", (req, res) => {
    res.send("it's working");
})

app.use("/api/v1/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(port, () => {
      console.log("server is up and running on port", port);
    });
})

