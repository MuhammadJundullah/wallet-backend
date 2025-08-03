import express from "express";
import {createTransaction, deleteTransactionById, getAllTransactions, getSummaryTransactionByUserId, getTransactionByUserId} from "../controllers/transactionsController.js"

const router = express.Router();

// get all transactions
router.get("/", getAllTransactions)

// get transaction by user id
router.get("/:userId", getTransactionByUserId);

// get summary transactions by user id
router.get("/summary/:userId", getSummaryTransactionByUserId);

// create transaction
router.post("/", createTransaction);

// delete transaction by id
router.delete("/:id", deleteTransactionById);

export default router;