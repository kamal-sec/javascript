import { getThemeImages } from "./theme.js";

const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme");
const level = parseInt(urlParams.get("level"));

const allContainer = document.getElementById("all");

let timerInterval;
let elapsedTime = 0;
let movesCount = 0;
let matchedPairs = 0;
let totalPairs;
let topScore = Infinity;

function createCards(gridSize, images) {
    allContainer.innerHTML = "";
    allContainer.style.display = "grid";
    allContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    allContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    allContainer.style.gap = "10px";

    const totalCards = gridSize * gridSize;
    totalPairs = totalCards / 2;
    document.getElementById("left").value = totalPairs;

    const pairedImages = [...images, ...images].slice(0, totalCards).sort(() => Math.random() - 0.5);

    const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5).slice(0, totalCards);

    let flippedCards = [];

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement("div");
        card.style.position = "relative";
        card.style.transformStyle = "preserve-3d";
        card.style.transform = "rotateY(0)";
        card.style.transition = "transform 0.6s";
        card.style.cursor = "pointer";

        const frontFace = document.createElement("div");
        frontFace.style.backgroundImage = `url('${shuffledImages[i]}')`;
        frontFace.style.backgroundSize = "contain";
        frontFace.style.backgroundPosition = "center";
        frontFace.style.backgroundRepeat = "no-repeat";
        frontFace.style.position = "absolute";
        frontFace.style.width = "100%";
        frontFace.style.height = "100%";
        frontFace.style.backfaceVisibility = "hidden";
        frontFace.style.transform = "rotateY(180deg)";
        frontFace.style.borderRadius = "10px";

        const backFace = document.createElement("div");
        backFace.style.position = "absolute";
        backFace.style.width = "100%";
        backFace.style.height = "100%";
        backFace.style.backfaceVisibility = "hidden";
        backFace.style.backgroundImage = "url('/assets/styles/logo.jpg')";
        backFace.style.backgroundSize = "cover";
        backFace.style.backgroundPosition = "center";
        backFace.style.backgroundRepeat = "no-repeat";
        backFace.style.borderRadius = "10px";

        const matchSound = document.getElementById('matchSound');
        const noMatchSound = document.getElementById('noMatchSound');
        const flipSound = document.getElementById('flipSound');

        card.addEventListener("click", () => {
            flipSound.play();
            if (flippedCards.length < 2 && card.style.transform === "rotateY(0deg)") {
                card.style.transform = "rotateY(180deg)";
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    movesCount++;
                    document.getElementById("moves").value = movesCount;

                    const [card1, card2] = flippedCards;

                    const isMatch = card1.querySelector("div").style.backgroundImage ===
                        card2.querySelector("div").style.backgroundImage;

                    if (isMatch) {
                        matchSound.play();
                        flippedCards = [];
                        matchedPairs++;
                        document.getElementById("match").value = matchedPairs;

                        document.getElementById("left").value = totalPairs - matchedPairs;

                        if (matchedPairs === totalPairs) {
                            clearInterval(timerInterval);
                            if (movesCount < topScore) {
                                topScore = movesCount;
                                document.getElementById("topscore").value = topScore;
                            }
                            showCelebration();
                        }
                    } else {
                        noMatchSound.play();
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

function startTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    const timeInput = document.getElementById("time");

    timerInterval = setInterval(() => {
        elapsedTime++;
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
        const seconds = (elapsedTime % 60).toString().padStart(2, "0");
        timeInput.value = `${minutes}:${seconds}`;
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval);
    matchedPairs = 0;
    movesCount = 0;
    elapsedTime = 0;

    document.getElementById("match").value = "0";
    document.getElementById("moves").value = "0";
    document.getElementById("time").value = "00:00";
    document.getElementById("left").value = totalPairs;

    initializeGame(level, theme);
    startTimer();
}

function initializeGame(level, theme) {
    let gridSize;
    const images = getThemeImages(theme, level);

    if (!images || images.length === 0) {
        console.error("No images found for theme and level:", theme, level);
        return;
    }

    if (level === 1) gridSize = 4;
    else if (level === 2) gridSize = 6;
    else if (level === 3) gridSize = 8;
    else gridSize = 4;

    createCards(gridSize, images);
    console.log(`Game initialized with theme: ${theme}, level: ${level}`);
}

const silentBtn = document.getElementById("silent-btn");
let isMuted = false;

silentBtn.addEventListener("click", () => {
    const gameAudio = document.getElementById("audio");
    isMuted = !isMuted;
    gameAudio.muted = isMuted;
    const speakerIcon = document.getElementById('speaker-icon')
    // silentBtn.textContent = isMuted ? "Unmute" : "Silent";
    if (speakerIcon.src.includes('assets/styles/mute.png')) {
        speakerIcon.src = 'assets/styles/muted.png';
    }else {
            speakerIcon.src = 'assets/styles/mute.png'; 
        }
});

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", resetGame);

initializeGame(level, theme);
startTimer();

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

    launchFireworks();

    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });

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

    const explosion = document.createElement("div");
    explosion.classList.add("explosion");

    for (let i = 0; i < 15; i++) {
        const spark = document.createElement("div");
        spark.classList.add("spark");
        spark.style.backgroundColor = getRandomColor();
        explosion.appendChild(spark);
    }

    firework.appendChild(explosion);
    document.body.appendChild(firework);

    const randomX = Math.random() * window.innerWidth;
    firework.style.left = `${randomX}px`;

    setTimeout(() => {
        firework.remove();
    }, 10000);
}

function getRandomColor() {
    const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#581845", "#33FF57", "#33FFF9", "#FF33F6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function initConfetti() {
    const confettiSettings = { target: 'confetti-canvas', max: 150, size: 1.2 };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}
