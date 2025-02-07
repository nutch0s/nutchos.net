const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Hardcoded userTokenHash for testing
const USER_TOKEN_HASH = "58de417a96f074e2e74759f1d6444a82e9380e005a428a3061e7ad857c31b583";

// Route for the root path
app.get("/", (req, res) => {
    res.send("Welcome to the leaderboard API! Go to /leaderboard to view the leaderboard.");
});

// Route to fetch leaderboard data
app.get("/leaderboard", async (req, res) => {
    const trackId = req.query.trackId;  // Get trackId from query parameter

    // If no trackId is provided, return an error
    if (!trackId) {
        return res.status(400).json({ error: "Track ID is required" });
    }

    console.log(`Fetching leaderboard for trackId: ${trackId}`);

    try {
        const response = await axios.get("https://vps.kodub.com:43273/leaderboard", {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Origin": "https://app-polytrack.kodub.com"
            },
            params: {
                version: "0.4.2",
                trackId: trackId,  // Use the dynamic trackId from query
                skip: 0,
                amount: 20,
                onlyVerified: false,
                userTokenHash: USER_TOKEN_HASH,
            }
        });

        console.log("Leaderboard data received:", response.data);
        res.json(response.data);  // Send the fetched data to the frontend
    } catch (error) {
        console.error("Error fetching leaderboard:", error.response?.data || error.message);

        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Server error",
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

