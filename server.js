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

//Enable sessions and passport
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

//Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/auth", authRoutes);

app.use("/employees", employeeRoutes);
app.use("/positions", positionRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
