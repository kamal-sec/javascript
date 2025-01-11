import { getThemeImages } from "./theme.js";

// Get query parameters for theme and level
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme"); // Selected theme
const level = parseInt(urlParams.get("level")); // Selected level

const allContainer = document.getElementById("all");

// Function to create game cards dynamically
function createCards(gridSize, images) {
    allContainer.innerHTML = ""; // Clear existing cards
    allContainer.style.display = "grid";
    allContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set grid columns
    allContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; // Set grid rows
    allContainer.style.gap = "10px";

    const totalCards = gridSize * gridSize;
    const shuffledImages = [...images, ...images] // Create pairs of images
        .sort(() => Math.random() - 0.5) // Shuffle images randomly
        .slice(0, totalCards); // Adjust the number of cards to grid size

    let flippedCards = [];
    let matchedPairs = 0;

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement("div");
        card.style.position = "relative";
        card.style.transformStyle = "preserve-3d";
        card.style.transform = "rotateY(0)";
        card.style.transition = "transform 0.6s";
        card.style.cursor = "pointer";

        // Front face (hidden image)
        const frontFace = document.createElement("div");
        frontFace.style.backgroundImage = `url('${shuffledImages[i]}')`;
        frontFace.style.backgroundSize = "contain"; // Ensure the entire image fits within the card
        frontFace.style.backgroundPosition = "center";
        frontFace.style.backgroundRepeat = "no-repeat";
        frontFace.style.position = "absolute";
        frontFace.style.width = "100%"; // Match the card width
        frontFace.style.height = "100%"; // Match the card height
        frontFace.style.backfaceVisibility = "hidden";
        frontFace.style.transform = "rotateY(180deg)";
        frontFace.style.borderRadius = "10px";
        // Back face (visible by default)
        const backFace = document.createElement("div");
        backFace.style.position = "absolute";
        backFace.style.width = "80%";
        backFace.style.height = "90%";
        backFace.style.backfaceVisibility = "hidden";
        backFace.style.background = "linear-gradient(135deg, #6a11cb, #2575fc)";
        backFace.style.borderRadius = "10px";

        // Flip logic
        card.addEventListener("click", () => {
            if (flippedCards.length < 2 && card.style.transform === "rotateY(0deg)") {
                card.style.transform = "rotateY(180deg)";
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;

                    // Check for match
                    const isMatch =
                        card1.querySelector("div").style.backgroundImage ===
                        card2.querySelector("div").style.backgroundImage;
                    ;
                    if (isMatch) {
                        flippedCards = [];
                        matchedPairs++;
                        // add one match
                        const matchInput = document.getElementById("match");
                        matchInput.value = parseInt(matchInput.value) + 1;
                        // add one move
                        const movesInput = document.getElementById("moves");
                        movesInput.value = parseInt(movesInput.value) + 1;
                        if (matchedPairs === totalCards / 2) {
                            alert("You won!");
                        }
                    } else {
                        // Flip back if no match
                        setTimeout(() => {
                            card1.style.transform = "rotateY(0)";
                            card2.style.transform = "rotateY(0)";
                            flippedCards = [];
                            // add one move
                            const movesInput = document.getElementById("moves");
                        movesInput.value = parseInt(movesInput.value) + 1;
                        }, 1000);
                    }
                }
            }
        });

        card.appendChild(frontFace);
        card.appendChild(backFace);
        allContainer.appendChild(card);
    }
}

// Initialize the game board based on the selected level and theme
function initializeGame(level, theme) {
    let gridSize;
    const images = getThemeImages(theme); // Get images for the selected theme

    if (!images || images.length === 0) {
        console.error("No images found for theme:", theme);
        return;
    }

    // Determine grid size based on level
    if (level === 1) gridSize = 4; // Level 1 (4x4)
    else if (level === 2) gridSize = 6; // Level 2 (6x6)
    else if (level === 3) gridSize = 8; // Level 3 (8x8)
    else gridSize = 4; // Default to 4x4

    // Create the cards with the chosen theme and grid size
    createCards(gridSize, images);
    console.log(`Game initialized with theme: ${theme}, level: ${level}`);
}

// Call the function to initialize the game
initializeGame(level, theme);
