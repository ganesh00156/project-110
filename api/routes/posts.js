import express from "express";
import { getAllData, getData } from "../controllers/post.js";

const router = express.Router();

router.get("/", getAllData);
router.get("/:id", getData);

export default router;
