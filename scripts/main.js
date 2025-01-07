 // Show/hide dropdowns for Start, Themes, and Settings
 const startBtn = document.getElementById("start-btn");
 const dropdownStart = document.getElementById("dropdown-start");
 const themesBtn = document.getElementById("themes-btn");
 const dropdownThemes = document.getElementById("dropdown-themes");
 const settingsBtn = document.getElementById("settings-btn");
 const dropdownSettings = document.getElementById("dropdown-settings");

 // Toggle visibility of dropdown
 function toggleDropdown(dropdown) {
     dropdown.classList.toggle("hidden");
 }

 startBtn.addEventListener("click", () => {
     toggleDropdown(dropdownStart);
     dropdownThemes.classList.add("hidden");
     dropdownSettings.classList.add("hidden");
 });

 themesBtn.addEventListener("click", () => {
     toggleDropdown(dropdownThemes);
     dropdownStart.classList.add("hidden");
     dropdownSettings.classList.add("hidden");
 });

 settingsBtn.addEventListener("click", () => {
     toggleDropdown(dropdownSettings);
     dropdownStart.classList.add("hidden");
     dropdownThemes.classList.add("hidden");
 });

 // Redirect to game page with selected level
 const levelButtons = document.querySelectorAll(".dropdown-btn[data-level]");
 levelButtons.forEach((button) => {
     button.addEventListener("click", () => {
         const level = button.getAttribute("data-level");
         window.location.href = `in.html?level=${level}`;
     });
 });

 // Update volume slider value
 const audioVolume = document.getElementById("audio-volume");
 const volumeValue = document.getElementById("volume-value");

audioVolume.addEventListener("input", () => {
  volumeValue.textContent = audioVolume.value;
});

// themes selection
let selectedTheme = null;
let themeButtons = document.querySelectorAll("#dropdown-themes button");
for (let i = 0; i < themeButtons.length; i++) {
  themeButtons[i].addEventListener("click", () => {
    //add class selected to the clicked button
    themeButtons[i].classList.add("selected");
    selectedTheme = themeButtons[i].textContent;
    toggleVisibility(dropdownThemes);
    themeerror.style.display = "none";
  });
}

// Start Button
startBtn.addEventListener("click", () => {
  if (!selectedTheme) {
    themeerror.style.display = "block";
    return;
  }

  if (selectedTheme === "Football") {
    window.location.href = "football.html";
  } else if (selectedTheme === "Anime") {
    window.location.href = "anime.html";
  } else if (selectedTheme === "Animals") {
    window.location.href = "animals.html";
  } else if (selectedTheme === "Animation") {
    window.location.href = "animation.html";
  } else {
    alert("Invalid theme selected!");
  }
});
