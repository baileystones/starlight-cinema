import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { connectToDb } from "./db/connection.js";

import employeeRoutes from "./routes/employees.js";
import positionRoutes from "./routes/positions.js";

import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectToDb();

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));
const app = express();
app.use(express.json());

// Trust proxy for Render (needed for secure cookies)
app.set("trust proxy", 1);

// Session setup (only once)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Home route
app.get("/", (req, res) => {
  res.send(`
    <h2> Starlight Cinema API</h2>
    <p><a href="/auth/google">Log in with Google</a> | <a href="/api-docs">View API Docs</a></p>
  `);
});

// Routes
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/positions", positionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));