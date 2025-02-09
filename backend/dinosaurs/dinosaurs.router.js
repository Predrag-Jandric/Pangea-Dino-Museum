import express from "express";
import { getAllDinosaurs } from "./dinosaurs.controller.js";
import { methodNotAllowed } from "../errors/index.js";

const router = express.Router();

router.route("/").get(getAllDinosaurs).all(methodNotAllowed);

export default router;

// get/fetch create/add update/modify delete/modify
