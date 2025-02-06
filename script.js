async function fetchLeaderboard(trackId) {
    const url = `https://vps.kodub.com:43273/leaderboard?version=0.4.2&trackId=${trackId}&skip=0&amount=20&onlyVerified=false&userTokenHash=58de417a96f074e2e74759f1d6444a82e9380e005a428a3061e7ad857c31b583`;
// 
https://vps.kodub.com:43273/leaderboard?version=0.4.2&trackId=d87220991018ace06080ca59dbbe86bda8198131bd72f7c7020547d179d843ea&skip=0&amount=20&onlyVerified=false&userTokenHash=58de417a96f074e2e74759f1d6444a82e9380e005a428a3061e7ad857c31b583


    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch leaderboard");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return null;
    }
}

async function displayLeaderboard(trackId) {
    const leaderboardData = await fetchLeaderboard(trackId);
    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = ""; // Clear previous results

    if (!leaderboardData || !leaderboardData.entries.length) {
        tbody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
        return;
    }

    leaderboardData.entries.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${(entry.frames / 60).toFixed(2)} sec</td>
        `;
        tbody.appendChild(row);
    });
}

function updateLeaderboard() {
    const trackId = document.getElementById("trackIdInput").value.trim();
    if (trackId) {
        displayLeaderboard(trackId);
    }
}
