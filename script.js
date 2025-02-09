async function fetchLeaderboard() {
    const trackId = document.getElementById("trackIdInput").value.trim();

    if (!trackId) {
        alert("Please enter a valid Track ID.");
        return;
    }

    try {
        const response = await fetch('https://poly-board-api-bed3a0d8395d.herokuapp.com/leaderboard?trackId=${trackId}', { mode: 'no-cors'});
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Log the data to inspect its structure
        console.log(data);

        // Extract the leaderboard entries
        const leaderboardData = data.entries || [];

        // Hide loading message and display the table
        document.querySelector(".loading").style.display = "none";
        document.querySelector("#leaderboard").style.display = "table";

        // Check if leaderboardData is an array before calling forEach
        if (Array.isArray(leaderboardData)) {
            // Populate the table with data
            const tableBody = document.querySelector("#leaderboard tbody");
            tableBody.innerHTML = '';  // Clear any previous leaderboard rows
            leaderboardData.forEach((entry, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.name || "N/A"}</td>  <!-- Use entry.name for the user's name -->
                    <td>${entry.frames || "N/A"}</td>    <!-- Use entry.frames for the score -->
                `;
                tableBody.appendChild(row);
            });
        } else {
            // If data.entries is not an array, show an error message
            alert("Leaderboard data is not in the expected format.");
            console.error("Expected array, but got:", leaderboardData);
        }
    } catch (error) {
        console.error("Error fetching leaderboard:", error);  // More detailed logging
        alert("Error fetching leaderboard data: " + error.message);
    }
}
