# Yug Dabhi | Developer Portfolio

A modern, high-performance personal developer portfolio built from scratch. Designed with a focus on minimalism, smooth interactive animations, and professional presentation of software projects.



## ✨ Features

- **High-Performance Animations:** Custom scroll-triggered animations powered by GSAP and Vanilla-Tilt.
- **Interactive UI/UX:** Features a custom cursor, dynamic background particles, and glassmorphic design elements.
- **Fully Responsive:** Fluid layouts that provide an optimal viewing experience across all devices, from mobile phones to 4K desktop monitors.
- **Integrated Contact System:** Fully functional, serverless contact form powered by Web3Forms.
- **Hidden Easter Eggs:** Interactive terminal and a playable Snake game hidden within the UI for an engaging visitor experience.

## 🛠️ Tech Stack

This project was intentionally built without heavy frontend frameworks to demonstrate strong fundamentals in core web technologies:

- **Structure:** HTML5 (Semantic)
- **Styling:** CSS3 (Custom Variables, Flexbox, Grid, Glassmorphism)
- **Logic:** Vanilla JavaScript (ES6+)
- **Animation Libraries:** 
  - [GSAP](https://greensock.com/gsap/) (ScrollTrigger)
  - [Vanilla-Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
  - [tsParticles](https://particles.js.org/)
  - [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

## 🚀 Running Locally

Since this is a static site built with standard web technologies, setting it up locally is incredibly straightforward:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yugdabhi03/portfolio.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd portfolio
   ```

3. **Run the site:**
   You can simply open `index.html` in your browser. However, for the best experience (and to avoid CORS issues with local assets), use a local development server like Live Server (VS Code Extension) or Python's HTTP server:
   ```bash
   # If you have Python installed:
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.

## 🌐 Deployment

This project is configured for seamless deployment on [Vercel](https://vercel.com/). Continuous Integration/Continuous Deployment (CI/CD) is enabled, meaning any push to the `main` branch automatically triggers a new build and deployment.

---
&copy; 2026 Yug Dabhi. All rights reserved.
