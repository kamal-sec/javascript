const startBtn = document.querySelector("#start-btn");
const dropdownStart = document.querySelector("#dropdown-start");
const themesBtn = document.querySelector("#themes-btn");
const dropdownThemes = document.querySelector("#dropdown-themes");
const themeButtons = document.querySelectorAll("#dropdown-themes button");
const levelButtons = document.querySelectorAll(".dropdown-btn[data-level]");
const howToPlayBtn = document.querySelector("#How-To-Play-btn");

let selectedTheme = null;

startBtn.disabled = true;
startBtn.style.opacity = "0.5";

for (let i = 0; i < themeButtons.length; i++) {
    themeButtons[i].addEventListener("click", () => {
        selectedTheme = themeButtons[i].textContent.toLowerCase();

        for (let j = 0; j < themeButtons.length; j++) {
            themeButtons[j].style.backgroundColor = "";
        }
        themeButtons[i].style.backgroundColor = "lightblue";

        startBtn.disabled = false;
        startBtn.style.opacity = "1";

        dropdownThemes.style.display = "none";
    });
}

themesBtn.addEventListener("click", () => {
    if (dropdownThemes.style.display === "none" || dropdownThemes.style.display === "") {
      dropdownThemes.style.display = "block";
      dropdownSettings.style.display = "none";

    } else {
      dropdownThemes.style.display = "none";
    }
  });

startBtn.addEventListener("click", () => {
    if (selectedTheme) {
        dropdownStart.style.display = "block";
        dropdownSettings.style.display = "none";
    } else {
        alert("Please select a theme before starting the game.");
        dropdownSettings.style.display = "none";
    }
});

for (let i = 0; i < levelButtons.length; i++) {
    levelButtons[i].addEventListener("click", () => {
        const level = levelButtons[i].getAttribute("data-level");

        if (selectedTheme) {
            window.location.href = `/game.html?theme=${selectedTheme}&level=${level}`;
        }
    });
}

const settingsBtn = document.querySelector("#settings-btn");
const dropdownSettings = document.querySelector("#dropdown-settings");
const audio = document.querySelector("audio");
const audioVolume = document.getElementById("audio-volume");
const volumeValue = document.getElementById("volume-value");
const volumeIcon = document.getElementById("volume-icon");

settingsBtn.addEventListener("click", () => {
    const rect = settingsBtn.getBoundingClientRect();
    dropdownSettings.style.top = `${rect.bottom + window.scrollY}px`;
    dropdownSettings.style.left = `${rect.left}px`;
    dropdownSettings.style.display =
        dropdownSettings.style.display === "block" ? "none" : "block";
       
});

audioVolume.addEventListener("input", () => {
    const volume = audioVolume.value / 100;
    audio.volume = volume;
    volumeValue.textContent = `${audioVolume.value}%`;

    if (volume === 0) {
        volumeIcon.textContent = "🔇";
    } else if (volume <= 0.5) {
        volumeIcon.textContent = "🔉";
    } else {
        volumeIcon.textContent = "🔊";
    }
});

audio.volume = audioVolume.value / 100;

howToPlayBtn.addEventListener("click", () => {
    let rulesDiv = document.getElementById("game-rules");
    if (!rulesDiv) {
        rulesDiv = document.createElement("div");
        rulesDiv.id = "game-rules";
        rulesDiv.style.position = "fixed";
        rulesDiv.style.top = "50%";
        rulesDiv.style.left = "50%";
        rulesDiv.style.transform = "translate(-50%,-190%)";
        rulesDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        rulesDiv.style.color = "white";
        rulesDiv.style.padding = "20px";
        rulesDiv.style.borderRadius = "10px";
        rulesDiv.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
        rulesDiv.style.zIndex = "1000";
        rulesDiv.style.textAlign = "center";
        rulesDiv.style.maxWidth = "400px";

        const rulesParagraph = document.createElement("p");
        rulesParagraph.textContent =
            "Welcome to FlipMatch! Select a theme and level, then flip cards to match pairs. Match all pairs to win. Good luck!";

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.style.marginTop = "20px";
        closeButton.style.padding = "10px 15px";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.background = "linear-gradient(to right, #ff758c, #ff7eb3)";
        closeButton.style.color = "white";
        closeButton.style.cursor = "pointer";
        closeButton.style.transition = "transform 0.2s, box-shadow 0.2s";
        closeButton.addEventListener("click", () => {
            rulesDiv.remove();
        });

        rulesDiv.appendChild(rulesParagraph);
        rulesDiv.appendChild(closeButton);

        document.body.appendChild(rulesDiv);
    }
});
