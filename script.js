document.addEventListener('DOMContentLoaded', () => {
    // Custom Context Menu
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = e;
            contextMenu.style.top = `${mouseY}px`;
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.classList.add('active');
        });

        window.addEventListener('click', (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.classList.remove('active');
            }
        });

        // Context Menu Actions
        document.getElementById('ctx-toggle-theme')?.addEventListener('click', () => {
            document.getElementById('theme-toggle')?.click();
            contextMenu.classList.remove('active');
        });
        document.getElementById('ctx-copy-email')?.addEventListener('click', () => {
            navigator.clipboard.writeText('yugdabhi974@gmail.com');
            alert('Email copied to clipboard!');
            contextMenu.classList.remove('active');
        });
        document.getElementById('ctx-trigger-confetti')?.addEventListener('click', () => {
            if (typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
            contextMenu.classList.remove('active');
        });
    }

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.getElementById('nav-links');
    
    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = navLinksList.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navItems = navLinksList.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    const splashCounter = document.getElementById('splash-counter');
    const splashProgress = document.getElementById('splash-progress');
    
    if (splashScreen) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                    document.body.style.overflow = ''; // Restore scrolling
                    setTimeout(() => splashScreen.remove(), 500);
                }, 500);
            }
            if (splashCounter) splashCounter.textContent = `${progress}%`;
            if (splashProgress) splashProgress.style.width = `${progress}%`;
        }, 100);
    }

    // Interactive Terminal
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalBody) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim().toLowerCase();
                this.value = '';
                
                if (cmd === '') return;
                
                // Echo command
                const echoLine = document.createElement('div');
                echoLine.className = 'terminal-line';
                echoLine.innerHTML = `<span class="prompt">guest@yugdabhi:~$</span> ${cmd}`;
                terminalBody.insertBefore(echoLine, terminalBody.lastElementChild);
                
                // Process command
                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-line';
                
                switch(cmd) {
                    case 'help':
                        responseLine.innerHTML = `Available commands:<br>- <span class="highlight">whoami</span>: Display info about the author<br>- <span class="highlight">skills</span>: List technical skills<br>- <span class="highlight">projects</span>: View featured projects<br>- <span class="highlight">clear</span>: Clear terminal window`;
                        break;
                    case 'whoami':
                        responseLine.innerHTML = `Yug Dabhi - Software Developer passionate about clean code and algorithms.`;
                        break;
                    case 'skills':
                        responseLine.innerHTML = `Frontend: React, JS, HTML, CSS<br>Backend: Node.js, Python, SQL, C/C++<br>Tools: Git, Linux`;
                        break;
                    case 'projects':
                        responseLine.innerHTML = `1. Route Optimizer<br>2. Secure Notes<br>3. Smart To-Do List<br>4. Code Snippet Tool`;
                        break;
                    case 'clear':
                        while (terminalBody.children.length > 1) {
                            terminalBody.removeChild(terminalBody.firstChild);
                        }
                        return; // exit early
                    default:
                        responseLine.innerHTML = `Command not found: ${cmd}. Type <span class="highlight">help</span> to see available commands.`;
                }
                
                terminalBody.insertBefore(responseLine, terminalBody.lastElementChild);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
        
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    // Live GitHub Stats
    const ghRepos = document.getElementById('gh-repos');
    const ghFollowers = document.getElementById('gh-followers');
    
    if (ghRepos && ghFollowers) {
        fetch('https://api.github.com/users/yugdabhi03')
            .then(res => res.json())
            .then(data => {
                if (data.public_repos !== undefined) {
                    let repoCount = 0;
                    let followerCount = 0;
                    const repoTarget = data.public_repos;
                    const followerTarget = data.followers;
                    const interval = 50;
                    const steps = 40; // 2 seconds
                    const repoStep = repoTarget / steps;
                    const followerStep = followerTarget / steps;
                    
                    const counter = setInterval(() => {
                        repoCount += repoStep;
                        followerCount += followerStep;
                        if (repoCount >= repoTarget) repoCount = repoTarget;
                        if (followerCount >= followerTarget) followerCount = followerTarget;
                        ghRepos.textContent = Math.floor(repoCount);
                        ghFollowers.textContent = Math.floor(followerCount);
                        if (repoCount >= repoTarget && followerCount >= followerTarget) {
                            clearInterval(counter);
                        }
                    }, interval);
                }
            })
            .catch(err => console.error("Error fetching GitHub stats:", err));
    }

    // Snake Game Easter Egg (Konami Code)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const gameModal = document.getElementById('game-modal');
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let snake = [];
    let food = {};
    let dx = 20;
    let dy = 0;
    let score = 0;
    let gameLoop;
    let isGameOver = false;
    let isPaused = false;
    
    function initSnake() {
        snake = [{x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}];
        generateFood();
        dx = 20; dy = 0; score = 0; isGameOver = false; isPaused = false;
        document.getElementById('snake-score').textContent = score;
        document.getElementById('game-over-screen').classList.add('hidden');
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(() => {
            if (isGameOver || isPaused) return;
            clearCanvas();
            drawFood();
            advanceSnake();
            drawSnake();
            checkCollision();
        }, 100);
        
        // Remove focus from any buttons so Space doesn't re-trigger them
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
    
    function clearCanvas() {
        if (!ctx) return;
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function drawFood() {
        if (!ctx) return;
        ctx.fillStyle = '#ff5f56';
        ctx.fillRect(food.x, food.y, 20, 20);
    }
    function drawSnake() {
        if (!ctx) return;
        snake.forEach(part => {
            ctx.fillStyle = '#6366f1';
            ctx.strokeStyle = '#a855f7';
            ctx.fillRect(part.x, part.y, 20, 20);
            ctx.strokeRect(part.x, part.y, 20, 20);
        });
    }
    function advanceSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            document.getElementById('snake-score').textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }
    function generateFood() {
        if (!canvas) return;
        food.x = Math.round((Math.random() * (canvas.width - 20)) / 20) * 20;
        food.y = Math.round((Math.random() * (canvas.height - 20)) / 20) * 20;
    }
    function checkCollision() {
        if (!canvas) return;
        if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
            endGame();
            return;
        }
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                endGame();
                return;
            }
        }
    }
    function endGame() {
        isGameOver = true;
        clearInterval(gameLoop);
        document.getElementById('game-over-screen').classList.remove('hidden');
    }
    
    document.getElementById('restart-game')?.addEventListener('click', (e) => {
        e.preventDefault();
        initSnake();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!gameModal?.classList.contains('hidden')) {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevents space from clicking buttons or scrolling
                if (!isGameOver) isPaused = !isPaused;
                return;
            }
            if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -20; e.preventDefault(); return; }
            if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 20; e.preventDefault(); return; }
            if (e.key === 'ArrowLeft' && dx === 0) { dx = -20; dy = 0; e.preventDefault(); return; }
            if (e.key === 'ArrowRight' && dx === 0) { dx = 20; dy = 0; e.preventDefault(); return; }
        }
        
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                if (gameModal) {
                    gameModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                    initSnake();
                }
            }
        } else {
            konamiIndex = 0;
        }
    });

    document.getElementById('game-close')?.addEventListener('click', () => {
        gameModal.classList.add('hidden');
        document.body.style.overflow = '';
        clearInterval(gameLoop);
    });

    // Typed.js Animation
    const typedText = document.getElementById('typed-text');
    if (typedText && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Software Developer.', 'Problem Solver.', 'Full-Stack Engineer.', 'Tech Enthusiast.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // ScrollSpy Navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a.nav-link');
    let scrollSpyTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollSpyTicking) {
            window.requestAnimationFrame(() => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - sectionHeight / 3)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                scrollSpyTicking = false;
            });
            scrollSpyTicking = true;
        }
    });

    // tsParticles Background
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5
                        }
                    }
                },
            },
            particles: {
                color: {
                    value: "#6366f1",
                },
                links: {
                    color: "#a855f7",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 40,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        });
    }

    // Scroll Progress
    let progressTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            window.requestAnimationFrame(() => {
                const totalHeight = document.body.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / totalHeight) * 100;
                if (scrollProgress) {
                    scrollProgress.style.width = `${progress}%`;
                }
                progressTicking = false;
            });
            progressTicking = true;
        }
    });

    // Custom Cursor
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    
    if (cursorDot && cursorRing) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let cursorVisible = false;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!cursorVisible) {
                cursorDot.classList.add('visible');
                cursorRing.classList.add('visible');
                cursorVisible = true;
            }

            // Dot follows instantly
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.classList.add('visible');
            cursorRing.classList.add('visible');
            cursorVisible = true;
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('visible');
            cursorRing.classList.remove('visible');
            cursorVisible = false;
        });

        window.addEventListener('blur', () => {
            cursorDot.classList.remove('visible');
            cursorRing.classList.remove('visible');
            cursorVisible = false;
        });
        
        // Lerp loop for the ring
        const renderCursor = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);
        
        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });
    }

    // GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Temporarily disable CSS transitions during GSAP animations to prevent conflicts
        const elementsToAnimate = document.querySelectorAll('.skill-category-card, .project-card, .contact-card, .timeline-item');
        elementsToAnimate.forEach(el => {
            const originalTransition = el.style.transition;
            el.style.transition = 'none';
            // Wait for GSAP to finish, then restore
            setTimeout(() => {
                el.style.transition = '';
            }, 2000);
        });

        // Hero Section Animation
        const heroTimeline = gsap.timeline();
        heroTimeline.from('.hero-content h1', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
                    .from('.hero-content p', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
                    .from('.hero-buttons .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, "-=0.4");

        // Section Headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // About Timeline
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
            },
            x: -50,
            opacity: 0,
            stagger: 0.3,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });

        // Skills Grid
        gsap.from('.skill-category-card', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: "all" // Clears inline styles after animation so vanilla-tilt and hover states work perfectly
        });

        // Projects Grid
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.project-grid',
                start: 'top 85%',
            },
            y: 100,
            opacity: 0,
            rotation: 2,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            clearProps: "all"
        });

        // Contact Card
        gsap.from('.contact-card', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 85%',
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        });
    }

    // Full-Screen Project Modals
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectModal && modalClose) {
        projectCards.forEach(card => {
            // Re-label expand button to "View Details"
            const btn = card.querySelector('.expand-btn');
            if (btn) btn.innerHTML = 'View Details <i class="fa-solid fa-arrow-right"></i>';

            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const desc = card.querySelector('p').textContent;
                const imgSrc = card.querySelector('img').src;
                const tagsHTML = card.querySelector('.tags').innerHTML;
                const detailsHTML = card.querySelector('.project-details').innerHTML;
                
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-description').textContent = desc;
                document.getElementById('modal-image').src = imgSrc;
                document.getElementById('modal-tags').innerHTML = tagsHTML;
                document.getElementById('modal-features').innerHTML = detailsHTML;
                
                // Hide actions inside features
                const actionsInFeatures = document.getElementById('modal-features').querySelector('.project-actions');
                if (actionsInFeatures) actionsInFeatures.style.display = 'none';
                
                projectModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            projectModal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = null;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Check for saved theme preference or use dark by default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let targetTheme = 'light';
            
            if (currentTheme === 'light') {
                targetTheme = 'dark';
                document.documentElement.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
            
            localStorage.setItem('theme', targetTheme);
        });
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Send the form data to Web3Forms API
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin" style="margin-left: 0.5rem;"></i>';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formStatus.textContent = "Thank you! Your message has been sent successfully.";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Oops! Something went wrong. Please try again.";
                    formStatus.className = "form-status error";
                    console.error("Web3Forms Error:", data);
                }
            })
            .catch(error => {
                formStatus.textContent = "Oops! Something went wrong. Please try again.";
                formStatus.className = "form-status error";
                console.error("Fetch Error:", error);
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;

                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = "";
                    formStatus.className = "form-status";
                }, 5000);
            });
        });
    }
});
