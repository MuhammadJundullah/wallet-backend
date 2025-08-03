// import express from "express";
// import dotenv from "dotenv";
// import { initDB }  from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";
// import transactionsRoute from "./route/transactionsRoute.js";

// dotenv.config()

// const port = process.env.PORT || 5001;

// const app = express();

// app.use(rateLimiter);
// app.use(express.json());

// app.get("/health", (req, res) => {
//     res.send("it's working");
// })

// app.use("/api/v1/transactions", transactionsRoute);

// initDB().then(() => {
//     app.listen(port, () => {
//       console.log("server is up and running on port", port);
//     });
// })

import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./route/transactionsRoute.js";

dotenv.config(); // Memuat variabel lingkungan dari .env

// Pastikan initDB dipanggil
// Untuk produksi di Vercel, initDB() akan dipanggil saat cold start.
// Di lokal, ini akan dipanggil saat Anda menjalankan server.
initDB();

const app = express();

app.use(rateLimiter);
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("it's working");
});

app.use("/api/v1/transactions", transactionsRoute);

// Logika untuk menjalankan server HANYA DI LOKAL
if (process.env.NODE_ENV !== "production") {
  // Atau bisa juga 'development'
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log("server is up and running on port", port);
  });
}

// Export aplikasi Express agar bisa digunakan oleh Vercel
export default app;
