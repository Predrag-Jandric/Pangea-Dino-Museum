import express from "express";
import { getNews } from "./news.controller.js";
import { methodNotAllowed } from "../errors/index.js";

const router = express.Router();

router.route("/").get(getNews).all(methodNotAllowed);

export default router;
