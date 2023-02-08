import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/data", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
