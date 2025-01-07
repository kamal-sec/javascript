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

//  document.addEventListener("DOMContentLoaded", () => {
//     const video = document.getElementById("background-video");

//     video.addEventListener("timeupdate", () => {
//         if (video.currentTime >= video.duration - .2) {
//  
//             video.currentTime = 0;
//             video.play();
//         }
//     });
// });