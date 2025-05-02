// server/server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import db from "./db/connection.js";           // <- importa la DB
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// **SEED ADMIN**  
(async () => {
  const users = db.collection("users");
  const exists = await users.findOne({ email: "admin@admin.com" });
  if (!exists) {
    const bcrypt = await import("bcrypt");
    const hashed = await bcrypt.hash("admin", 12);
    await users.insertOne({
      nombre: "Super",
      apellido: "Admin",
      edad: 30,
      email: "admin@admin.com",
      password: hashed,
      role: "admin",
    });
    console.log("Admin seed creado: admin@admin.com / admin");
  }
})();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
