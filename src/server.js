import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
     "https://front-jorfp6y2k-alejos-projects-4a7fb234.vercel.app",
    ],
  })
);
app.use(express.json());
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
console.log(`Servidor levantado en puerto ${PORT}`);
  });
});