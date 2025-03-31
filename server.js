const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Dummy database (Replace this with a real database later)
let funds = 0;
let transactions = [];

// ✅ Root Route (Fix for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("MATSALA API is running!");
});

// 1️⃣ Accept Donations
app.post("/donate", (req, res) => {
    const { amount, method } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid donation amount" });
    }
    funds += amount;
    transactions.push({ type: "donation", amount, method, date: new Date() });
    res.status(200).json({ message: "Donation received!", funds });
});

// 2️⃣ Get Funds Balance
app.get("/funds", (req, res) => {
    res.status(200).json({ funds });
});

// 3️⃣ Withdraw Funds
app.post("/withdraw", (req, res) => {
    const { amount, recipient } = req.body;
    if (!amount || amount > funds) {
        return res.status(400).json({ message: "Insufficient funds or invalid amount" });
    }
    funds -= amount;
    transactions.push({ type: "withdrawal", amount, recipient, date: new Date() });
    res.status(200).json({ message: "Funds withdrawn successfully!", funds });
});

// 4️⃣ Get Transactions
app.get("/transactions", (req, res) => {
    res.status(200).json({ transactions });
});

// Start Server
app.listen(port, () => {
    console.log(`MATSALA API running at http://localhost:${port}`);
});
