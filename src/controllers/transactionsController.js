import { sql } from "../config/db.js";

export async function getAllTransactions(req, res) {
  try {
    const transactions = await sql`SELECT * FROM transactions`;
    res.status(200).json({
      message: "data succesfully getted",
      success: true,
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
}

export async function getTransactionByUserId(req, res) {
  try {
    const { userId } = req.params;

    // if (isNaN(parseInt(userId))) {
    //   return res.status(400).json({ message: "invalid transaction ID." });
    // }

    const transaction =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;

    if (transaction.length != 0) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "data not found." });
    }
  } catch (error) {
    console.log("error getting transactions.");
    res.status(500).json({ message: "internal error" });
  }
}

export async function getSummaryTransactionByUserId(req, res) {
  try {
    const { userId } = req.params;

    // if (isNaN(parseInt(userId))) {
    //   return res.status(400).json({ message: "invalid transaction ID." });
    // }

    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;

    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("error getting transactions.");
    res.status(500).json({ message: "internal error" });
  }
}

export async function createTransaction(req, res) {
    try {

    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ message: "all fields are required." });
    }

    const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
}

export async function deleteTransactionById(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "invalid transaction ID." });
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length !== 0) {
      res.status(200).json({ message: `transactions deleted successfully.` });
    } else {
      res.status(404).json({ message: `transactions not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error.", success: false });
  }
}
