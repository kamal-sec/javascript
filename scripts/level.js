const urlParams = new URLSearchParams(window.location.search);
const level = parseInt(urlParams.get("level")); // Get the level from URL parameters
const allContainer = document.getElementById("all");

// Function to create game cards for a specific grid size
function createCards(gridSize) {
    allContainer.innerHTML = ""; // Clear any existing cards
    allContainer.style.display = "grid";
    allContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Columns based on grid size
    allContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; // Rows based on grid size
    allContainer.style.gap = "10px";

    const totalCards = gridSize * gridSize;

    for (let i = 1; i <= totalCards; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.style.border = "1px solid #ccc";
        card.style.backgroundColor = "#fff";
        card.style.textAlign = "center";
        card.style.padding = "20px";
        card.style.cursor = "pointer";

        allContainer.appendChild(card);
    }
}

// Initialize the game board based on the level
function initializeGame(level) {
    let gridSize;

    if (level === 1) gridSize = 4; // Level 1 (4x4)
    else if (level === 2) gridSize = 6; // Level 2 (6x6)
    else if (level === 3) gridSize = 8; // Level 3 (8x8)
    else gridSize = 4; // Default to 4x4

    createCards(gridSize);
}

initializeGame(level);
