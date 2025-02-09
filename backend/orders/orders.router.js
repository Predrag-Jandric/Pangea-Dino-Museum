import express from "express";
import { createOrder } from "./orders.controller.js";
import {methodNotAllowed} from "../errors/index.js";

const router = express.Router();

router.route("/").post(createOrder).all(methodNotAllowed);

export default router;

// get/fetch create/add update/modify delete/modify