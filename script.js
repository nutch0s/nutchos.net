const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Route for the root path
app.get("/", (req, res) => {
    res.send("Welcome to the leaderboard API! Go to /leaderboard to view the leaderboard.");
});

// Route to fetch leaderboard data
app.get("/leaderboard", async (req, res) => {
    const { trackId } = req.query;  // Get trackId from the query params

    if (!trackId) {
        return res.status(400).json({ error: "Track ID is required" });
    }

    try {
        const response = await axios.get("https://vps.kodub.com:43273/leaderboard", {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Origin": "https://app-polytrack.kodub.com"
            },
            params: {
                version: "0.4.2",
                trackId: trackId,  // Use the trackId from the request
                skip: 0,
                amount: 20,
                onlyVerified: false,
                userTokenHash: '58de417a96f074e2e74759f1d6444a82e9380e005a428a3061e7ad857c31b583',  // Replace with actual token if needed
            }
        });

        console.log("Leaderboard data received:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching leaderboard:", error.response && error.response.data ? error.response.data : error.message);

        res.status(error.response && error.response.status ? error.response.status : 500).json({
            error: error.response && error.response.data ? error.response.data : "Server error",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
