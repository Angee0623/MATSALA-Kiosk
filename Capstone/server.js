const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('MATSALA Kiosk Server is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
