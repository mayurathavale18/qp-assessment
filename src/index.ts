import express, { Request, Response } from "express";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import "reflect-metadata";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Registering the routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
