async function fetchLeaderboard() {
    const trackId = document.getElementById("trackIdInput").value.trim();

    if (!trackId) {
        alert("Please enter a valid Track ID.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/leaderboard?trackId=${trackId}`);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        // Hide loading message and display the table
        document.querySelector(".loading").style.display = "none";
        document.querySelector("#leaderboard").style.display = "table";

        // Populate the table with data
        const tableBody = document.querySelector("#leaderboard tbody");
        tableBody.innerHTML = '';  // Clear any previous leaderboard rows
        data.forEach((entry, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.user || "N/A"}</td>
                <td>${entry.score || "N/A"}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);  // More detailed logging
        alert("Error fetching leaderboard data: " + error.message);
    }
}
