import express from "express";
import { getAllProducts, getAllProductstesting } from "../controllers/products.js";

// const {getAllProducts, getAllProductstesting} = require("../controllers/products.js")

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/Testing").get(getAllProductstesting);

export default router;