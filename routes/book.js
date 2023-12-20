import express from "express";

import * as bookController from "../controllers/book.js";


const router = express.Router();

router.get("/", bookController.getAllBook)
router.get("/:bookid", bookController.getBookById)
router.delete("/:id", bookController.deletBookById)
router.post("/", bookController.addBook)
router.put("/:id", bookController.updateBook)

export default router;