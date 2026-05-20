<div align="center">
  <h1>🎾 Pickleball Point Counter</h1>
  <p><i>A beautifully minimal, zero-build Pickleball scoreboard. Runs entirely in your browser as a single HTML file with offline PWA support.</i></p>
  
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready">
<img src="https://img.shields.io/badge/Zero--Build-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Zero Build">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black" alt="Babel">
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</div>

---

### ✨ Features

* **🧘 Zen UI & Court Positioning:** A clean, distraction-free interface. Includes a dynamic, rotating mini-court that visualizes exactly who is serving, receiving, and which side (Odd/Even) players should stand on.
* **📜 Flexible Rule Sets:** * **Standard:** 0-0-2 (Doubles) or 0-0 (Singles), play to 11, win by 2.
  * **14-Point Rally:** Play to 15, with an optional "Must Serve to Win" toggle at 14-14 sudden death.
  * **Custom:** Define your own 'Play To', 'Win By', and 'Serve to Score' rules.
* **🗣️ Smart Voice Announcer:** Built-in Text-to-Speech acts as your referee, announcing scores and side-outs using high-quality native voices across 12 languages.
* **👻 Ghost Replay & Timeline:** A visual dot-matrix timeline of every match. Click any point in the history to view a "Ghost Replay" of exactly where players were standing at that exact moment.
* **☁️ Cloud Sync (PIN Transfer):** Securely migrate your match history and saved player roster to another device in seconds using a 5-digit temporary PIN (Powered by Cloudflare Workers).
* **📸 Shareable Scorecards:** Instantly generate and export a sleek, Instagram-ready (4:5) graphic of your final match results.
* **🎮 Hidden Arcade Room:** Tap the title "Pickleball" 5 times to unlock a secret retro arcade featuring 8 mini-games (Tic-Tac-Toe, Quick Dink, Memory Match, and more!).
* **🌍 12 Languages Supported:** English, 简体中文, 繁體中文, Bahasa Melayu, Español, Français, Tiếng Việt, ไทย, 日本語, 한국어, Deutsch, and Português.

---

### 🚀 Zero-Build Setup

No Node.js, Webpack, or Vite required! The entire application runs natively in a **single `index.html` file** utilizing CDNs for React, Babel, and Tailwind. 

1. Clone or download the repository.
2. Open `index.html` directly in any modern web browser.

> [!WARNING]
> **Domain Security Lock:** For security purposes, this application is domain-locked. If you wish to host it yourself, you must add your domain to the `allowedDomains` array in the `index.html` file, otherwise it will trigger an Unauthorized Error.

---

### 📱 Installing on your Phone (PWA)

You can install this app to use offline directly from your mobile browser!

* **iOS (Safari):** Tap the **Share** icon at the bottom of the screen and select **"Add to Home Screen"**.
* **Android (Chrome):** Tap the browser menu (three dots) and select **"Install App"** or "Add to Home screen".

---

### 📖 How to Use

1. **Setup Match:** Choose Singles/Doubles, select your rules, and add players from your saved roster.
2. **Score:** Tap a team's card to award a point. The app automatically calculates side-outs, second servers, and court swaps.
3. **Mistakes?** Use the **Undo** button to safely reverse the last action.
4. **Timeouts & Swaps:** Track timeouts and prompt players to switch ends at the half-point mark.
5. **Review:** Access the **Stats** menu to see your overall win rates, average match durations, and format breakdowns.

---

### 📄 License & Usage

* **Non-Commercial Use Only:** This project is strictly for personal, educational, and non-commercial use. You may not use this application or its source code for any business, commercial, or monetized purposes.
* **Forks & Attribution:** You are welcome to fork, modify, and experiment with this code for your own personal projects! However, if you share your forked version, **you must provide proper citation** to the original author (Amos) and include a direct link back to this repository.

---

<div align="center">
  <b>Designed and Developed by Amos</b><br>
  <i>Built with ❤️ for the Pickleball community.</i>
</div>
