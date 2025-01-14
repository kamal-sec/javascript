import { getThemeImages } from "./theme.js";

const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme");
const level = parseInt(urlParams.get("level"));

const allContainer = document.getElementById("all");

const homeBtn = document.getElementById('home-btn');
homeBtn.addEventListener('click', () => {
    window.location.href = "Home.html"; 
});

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

    let flippedCards = [];
    let isClickable = false;

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

    function showOverlay() {
        const overlay = document.getElementById('Go_overlay');
        overlay.style.opacity = '1';
  
        setTimeout(() => {
          overlay.style.opacity = '0';
          startTimer();
        }, 1000); 
    }

    function startGame() {
        const cards = document.querySelectorAll('.cards');
    
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.transform = "rotateY(0deg)"; 
        }
        setTimeout(() => {
            for (let i = 0; i < cards.length; i++) {
                cards[i].style.transform = "rotateY(180deg)";
            }
            setTimeout(() => {
                for (let i = 0; i < cards.length; i++) {
                    cards[i].style.transform = "rotateY(0deg)";
                }
                showOverlay();
                isClickable = true;
            }, 1500); 
        }, 1000); 
    }

    pairedImages.forEach((imageData) => {
        const card = document.createElement("div");
        card.classList.add("cards");
        card.style.position = "relative";
        card.style.transformStyle = "preserve-3d";
        card.style.transform = "rotateY(0)";
        card.style.transition = "transform 0.6s";
        card.style.cursor = "pointer";

        const frontFace = document.createElement("div");
        frontFace.style.backgroundImage = `url('${imageData.image}')`;
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
        backFace.style.backgroundImage = "url('/assets/styles/logo.png')";
        backFace.style.backgroundSize = "cover";
        backFace.style.backgroundPosition = "center";
        backFace.style.backgroundRepeat = "no-repeat";
        backFace.style.borderRadius = "10px";

        const matchSound = document.getElementById('matchSound');
        const noMatchSound = document.getElementById('noMatchSound');
        const flipSound = document.getElementById('flipSound');

        card.addEventListener("click", () => {
            if (!isClickable || flippedCards.length >= 2 || card.classList.contains('matched') ||card.style.transform === "rotateY(180deg)" ) {
                return;
            }

            flipSound.play();
            card.style.transform = "rotateY(180deg)";
            card.style.animation = "ColorMovement 0.6s infinite";
            flippedCards.push({ card, imageData });

            setTimeout(() => {
                card.style.animation = "none";
            }, 600);

            if (flippedCards.length === 2) {
                movesCount++;
                document.getElementById("moves").value = movesCount;

                const [card1, card2] = flippedCards;

                const isMatch = card1.imageData.image === card2.imageData.image;

                if (isMatch) {
                    const animalSound = new Audio(card1.imageData.sound);
                    animalSound.play();
                    matchSound.play();

                    const handleTransitionEnd = () => {
                        card1.card.classList.add('matched');
                        card2.card.classList.add('matched');
                
                        card1.card.removeEventListener('transitionend', handleTransitionEnd);
                        card2.card.removeEventListener('transitionend', handleTransitionEnd);

                        setTimeout(() => {
                            card1.card.classList.remove('matched');
                            card2.card.classList.remove('matched');
                        }, 800);
                    };
                
                    card1.card.addEventListener('transitionend', handleTransitionEnd);
                    card2.card.addEventListener('transitionend', handleTransitionEnd);

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
                    const handleNonMatchTransitionEnd = () => {
                        card1.card.classList.add('nonmatched');
                        card2.card.classList.add('nonmatched');
                
                        card1.card.removeEventListener('transitionend', handleNonMatchTransitionEnd);
                        card2.card.removeEventListener('transitionend', handleNonMatchTransitionEnd);
                
                        setTimeout(() => {
                            card1.card.classList.remove('nonmatched');
                            card2.card.classList.remove('nonmatched');
                        }, 800);
                    };
                
                    card1.card.addEventListener('transitionend', handleNonMatchTransitionEnd);
                    card2.card.addEventListener('transitionend', handleNonMatchTransitionEnd);

                    setTimeout(() => {
                        card1.card.style.transform = "rotateY(0)";
                        card2.card.style.transform = "rotateY(0)";
                        flippedCards = [];
                    }, 1000);
                }
            }
        });

        card.appendChild(frontFace);
        card.appendChild(backFace);
        allContainer.appendChild(card);
    });
    
    startGame();
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
    if (speakerIcon.src.includes('assets/styles/mute.png')) {
        speakerIcon.src = 'assets/styles/muted.png';
    } else {
        speakerIcon.src = 'assets/styles/mute.png'; 
    }
});

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", resetGame);

initializeGame(level, theme);

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
    celebrationOverlay.style.gap = "20px"; 

    const Xbtn = document.createElement("button");
    Xbtn.textContent = "×";
    Xbtn.style.position = "absolute";
    Xbtn.style.top = "10px";
    Xbtn.style.right = "10px";
    Xbtn.style.fontSize = "1.5rem";
    Xbtn.style.color = "#fff";
    Xbtn.style.background = "transparent";
    Xbtn.style.border = "none";
    Xbtn.style.cursor = "pointer";
    Xbtn.style.fontWeight = "bold";

    Xbtn.addEventListener("click", () => {
        celebrationOverlay.remove(); 
    });

    const message = document.createElement("div");
    message.innerHTML = `
        🎉 <strong>Congratulations!</strong> 🎉 <br>
        Your Score: ${movesCount} <br>
        ${movesCount <= topScore ? `<span style="color: #FFD700;">New Top Score! 🏆</span>` : ""}
    `;

    const playAgainBtn = document.createElement("button");
    playAgainBtn.id = "closeBtn";
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.style.padding = "10px 20px";
    playAgainBtn.style.fontSize = "1rem";
    playAgainBtn.style.color = "#fff";
    playAgainBtn.style.background = "linear-gradient(to right, #6a11cb, #2575fc)";
    playAgainBtn.style.border = "none";
    playAgainBtn.style.borderRadius = "5px";
    playAgainBtn.style.cursor = "pointer";

    celebrationOverlay.appendChild(message);
    celebrationOverlay.appendChild(Xbtn);
    celebrationOverlay.appendChild(playAgainBtn);
    document.body.appendChild(celebrationOverlay);

    playAgainBtn.addEventListener("click", closeCelebration);

    const clapSound = document.getElementById("clapSound");
    clapSound.play();

    launchFireworks();

    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
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
            origin: { x: Math.random(), y: Math.random() * 0.6 },
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
    firework.className = "firework";
    firework.style.position = "absolute";
    firework.style.bottom = "0";
    firework.style.left = `${Math.random() * 100}%`; 
    firework.style.width = "5px";
    firework.style.height = "50px";
    firework.style.background = "linear-gradient(to top, red, yellow)";
    firework.style.animation = "launch 1.5s ease-out, fadeOut 2s ease-out 1.5s";
    document.body.appendChild(firework);

    setTimeout(() => {
        createExplosion(firework.offsetLeft, firework.offsetTop);
        firework.remove(); 
    }, 1500);
}

function createExplosion(x, y) {
    const explosion = document.createElement("div");
    explosion.className = "explosion";
    explosion.style.position = "absolute";
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.width = "100px";
    explosion.style.height = "100px";
    explosion.style.transform = "translate(-50%, -50%)";
    explosion.style.borderRadius = "50%";
    explosion.style.background = "radial-gradient(circle, rgba(255, 165, 0, 0.8), rgba(255, 0, 0, 0))";
    explosion.style.animation = "expand 1s ease-out, fadeOut 1s ease-out";
    document.body.appendChild(explosion);


    for (let i = 0; i < 15; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";
        spark.style.position = "absolute";
        spark.style.width = "5px";
        spark.style.height = "5px";
        spark.style.backgroundColor = getRandomColor();
        spark.style.borderRadius = "50%";
        spark.style.animation = `sparkMove 1s ease-out`;
        spark.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
        explosion.appendChild(spark);
    }

    setTimeout(() => explosion.remove(), 1000);
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