import { getThemeImages } from "./theme.js";

// Get query parameters for theme and level
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme"); // Selected theme
const level = parseInt(urlParams.get("level")); // Selected level

const allContainer = document.getElementById("all");

let timerInterval; // To track the timer
let elapsedTime = 0; // Elapsed time in seconds
let movesCount = 0; // To track moves
let matchedPairs = 0; // To track matched pairs
let totalPairs; // Total pairs in the game
let topScore = Infinity; // Track the best score (lowest moves)

// Function to create game cards dynamically
function createCards(gridSize, images) {
    allContainer.innerHTML = ""; // Clear existing cards
    allContainer.style.display = "grid";
    allContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set grid columns
    allContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; // Set grid rows
    allContainer.style.gap = "10px";

    const totalCards = gridSize * gridSize;
    totalPairs = totalCards / 2; // Calculate total pairs
    document.getElementById("left").value = totalPairs; // Initialize Left count

    const pairedImages = [...images, ...images] // Duplicate images to create pairs
    .slice(0, totalCards) // Limit the total number to fit the grid size
    .sort(() => Math.random() - 0.5); // Shuffle images randomly

    console.log("Shuffled Images:", pairedImages); // Log shuffled images for verification


    const shuffledImages = [...images, ...images] // Create pairs of images
        .sort(() => Math.random() - 0.5) // Shuffle images randomly
        .slice(0, totalCards); // Adjust the number of cards to grid size

    let flippedCards = [];

    // const totalCards = gridSize * gridSize;
    // const shuffledImages = [...images, ...images] // Create pairs of images
    //     .sort(() => Math.random() - 0.5) // Shuffle images randomly
    //     .slice(0, totalCards); // Adjust the number of cards to grid size

    // let flippedCards = [];
    // let matchedPairs = 0;

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
        backFace.style.width = "100%";
        backFace.style.height = "100%";
        backFace.style.backfaceVisibility = "hidden";
        backFace.style.backgroundImage = "url('/assets/styles/logo.jpg')"; // مسار اللوجو
        backFace.style.backgroundSize = "cover"; // اجعل الصورة تغطي كامل المساحة
        backFace.style.backgroundPosition = "center";
        backFace.style.backgroundRepeat = "no-repeat";
        backFace.style.borderRadius = "10px";

        // Sounds
        const matchSound = document.getElementById('matchSound');
        const noMatchSound = document.getElementById('noMatchSound');

        // Flip logic
        card.addEventListener("click", () => {
            if (flippedCards.length < 2 && card.style.transform === "rotateY(0deg)") {
                card.style.transform = "rotateY(180deg)";
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    movesCount++; // Increment moves count after every 2 flips
                    document.getElementById("moves").value = movesCount;

                    const [card1, card2] = flippedCards;

                    // Check for match
                    const isMatch =
                        card1.querySelector("div").style.backgroundImage ===
                        card2.querySelector("div").style.backgroundImage;

                    if (isMatch) {
                        matchSound.play();
                        flippedCards = [];
                        matchedPairs++;
                        document.getElementById("match").value = matchedPairs;

                        // Update Left
                        document.getElementById("left").value = totalPairs - matchedPairs;

                        if (matchedPairs === totalPairs) {
                            clearInterval(timerInterval); // Stop the timer
 ////////////////////////////////////////////////                           
                            if (movesCount < topScore) {
                                topScore = movesCount;
                                document.getElementById("topscore").value = topScore;
                            }
                            
                            // Show celebration and score
                            showCelebration();
///////////////////////////////////////////

                            // alert("You won!");

                            // Update Top Score
                            if (movesCount < topScore) {
                                topScore = movesCount;
                                document.getElementById("topscore").value = topScore;
                            }
                        }
                    } else {
                        noMatchSound.play();
                        // Flip back if no match
                        setTimeout(() => {
                            card1.style.transform = "rotateY(0)";
                            card2.style.transform = "rotateY(0)";
                            flippedCards = [];
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

// Function to start the timer
function startTimer() {
    clearInterval(timerInterval); // Stop any existing timer
    elapsedTime = 0; // Reset elapsed time
    const timeInput = document.getElementById("time");

    timerInterval = setInterval(() => {
        elapsedTime++;
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
        const seconds = (elapsedTime % 60).toString().padStart(2, "0");
        timeInput.value = `${minutes}:${seconds}`;
    }, 1000);
}

// Function to reset the game
function resetGame() {
    clearInterval(timerInterval); // Stop the current timer
    matchedPairs = 0; // Reset matched pairs
    movesCount = 0; // Reset moves
    elapsedTime = 0; // Reset elapsed time

    document.getElementById("match").value = "0";
    document.getElementById("moves").value = "0";
    document.getElementById("time").value = "00:00";
    document.getElementById("left").value = totalPairs; // Reset Left count

    initializeGame(level, theme); // Reinitialize the game
    startTimer(); // Start the timer again
}

// Initialize the game board based on the selected level and theme
function initializeGame(level, theme) {
    let gridSize;
    // const images = getThemeImages(theme); // Get images for the selected theme
    const images = getThemeImages(theme, level); // Pass theme and level


    if (!images || images.length === 0) {
        console.error("No images found for theme and level:", theme, level);
        // console.error("No images found for theme:", theme);
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

const silentBtn = document.getElementById("silent-btn");
let isMuted = false;

// التحكم في الصوت عبر زر Silent
silentBtn.addEventListener("click", () => {
    const gameAudio = document.getElementById("audio");
    isMuted = !isMuted;
    gameAudio.muted = isMuted; // كتم أو إلغاء كتم الصوت
    silentBtn.textContent = isMuted ? "Unmute" : "Silent"; // تحديث النص
});


// Add event listener to the Restart button
const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", resetGame);

// Call the function to initialize the game
initializeGame(level, theme);
startTimer(); // Start the timer

//////////////////////////////
function showCelebration() {
    const celebrationOverlay = document.createElement("div");
    celebrationOverlay.id = "celebration-overlay";
    celebrationOverlay.style.position = "fixed";
    celebrationOverlay.style.top = "0";
    celebrationOverlay.style.left = "0";
    celebrationOverlay.style.width = "100%";
    celebrationOverlay.style.height = "100%";
    celebrationOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    celebrationOverlay.style.zIndex = "1000";
    celebrationOverlay.style.display = "flex";
    celebrationOverlay.style.flexDirection = "column";
    celebrationOverlay.style.justifyContent = "center";
    celebrationOverlay.style.alignItems = "center";
    celebrationOverlay.style.color = "white";
    celebrationOverlay.style.fontSize = "2rem";
    celebrationOverlay.style.textAlign = "center";

    const message = document.createElement("div");
    message.innerHTML = `
        🎉 <strong>Congratulations!</strong> 🎉 <br>
        Your Score: ${movesCount} <br>
        ${movesCount <= topScore ? `<span style="color: #FFD700;">New Top Score! 🏆</span>` : ""}
        <button id="closeBtn" style="
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 1rem;
            color: #fff;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            border: none;
            border-radius: 5px;
            cursor: pointer;
        ">Play Again</button>
    `;
    celebrationOverlay.appendChild(message);
    document.body.appendChild(celebrationOverlay);

    const closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", closeCelebration);

    // تشغيل الصواريخ
    launchFireworks();

    // تشغيل تأثيرات Confetti
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });

    // Confetti إضافية
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const confettiInterval = setInterval(() => {
        if (Date.now() > animationEnd) {
            clearInterval(confettiInterval);
            return;
        }
        confetti({
            particleCount: 50,
            spread: 80,
            origin: { x: Math.random(), y: Math.random() * 0.6 }
        });
    }, 250);
}


function closeCelebration() {
    // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    window.location.href = "/Home.html";
}

function launchFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 500);
    }
}

function createFirework() {
    const firework = document.createElement("div");
    firework.classList.add("firework");

    // إنشاء تأثير الانفجار
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");

    // إضافة خطوط ملونة صغيرة
    for (let i = 0; i < 15; i++) {
        const spark = document.createElement("div");
        spark.classList.add("spark");
        spark.style.backgroundColor = getRandomColor();
        explosion.appendChild(spark);
    }

    firework.appendChild(explosion);
    document.body.appendChild(firework);

    // تحديد موقع عشوائي للصاروخ
    const randomX = Math.random() * window.innerWidth;
    firework.style.left = `${randomX}px`;

    // إزالة العنصر بعد انتهاء الأنيميشن
    setTimeout(() => {
        firework.remove();
    }, 10000);
}

// وظيفة لجعل الألوان عشوائية
function getRandomColor() {
    const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#581845", "#33FF57", "#33FFF9", "#FF33F6"];
    return colors[Math.floor(Math.random() * colors.length)];
}


// Confetti animation setup
function initConfetti() {
    const confettiSettings = { target: 'confetti-canvas', max: 150, size: 1.2 };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

