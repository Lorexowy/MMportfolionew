document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const header = document.getElementById("header");
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const faders = document.querySelectorAll(".fade-in");
    const slideLefts = document.querySelectorAll(".slide-in-left");
    const slideRights = document.querySelectorAll(".slide-in-right");
    const themeToggle = document.getElementById("themeToggle");
    const loader = document.getElementById("loader");
    const scrollBar = document.getElementById("scrollBar");
    
    // Performance tracking variables (simplified)
    let scrollTicking = false;
    let mouseTicking = false;
    let resizeTicking = false;
    
    // Initialize theme (dark mode as default)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        // Dark mode is default, no need to add class
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme Toggle Functionality with optimized animation
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
        
        // Optimized animation with GPU acceleration
        themeToggle.style.transform = 'scale3d(1.2, 1.2, 1) rotateZ(180deg)';
        themeToggle.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            themeToggle.style.transform = 'scale3d(1, 1, 1) rotateZ(0deg)';
        }, 300);
    });
    
    // Hide loader after page load with optimization
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation for better performance
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 500);
    });
    
    // Optimized Scroll Progress Bar
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
        
        // Use transform for better performance
        scrollBar.style.transform = `scaleX(${scrollProgress / 100})`;
        scrollBar.style.transformOrigin = 'left center';
    }
    
    // Advanced Magnetic Effect with performance optimization
    function addMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            let magneticTicking = false;
            
            element.addEventListener('mousemove', function(e) {
                if (!magneticTicking) {
                    requestAnimationFrame(() => {
                        const rect = element.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        
                        const moveX = x * 0.2;
                        const moveY = y * 0.2;
                        
                        // Use transform3d for GPU acceleration
                        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                        element.style.transition = 'transform 0.1s ease-out';
                        
                        magneticTicking = false;
                    });
                    magneticTicking = true;
                }
            }, { passive: true });
            
            element.addEventListener('mouseleave', function() {
                element.style.transform = 'translate3d(0px, 0px, 0)';
                element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });
    }
    
    // Optimized text animation for hero section
    const heroWords = document.querySelectorAll('.hero-word');
    
    if (heroWords.length > 0) {
        setTimeout(() => {
            heroWords.forEach((word, index) => {
                setTimeout(() => {
                    word.classList.add('animate');
                    // Add GPU acceleration
                    word.style.transform = 'translate3d(0, 0, 0)';
                }, index * 200);
            });
        }, 800);
    }
    
    // Performance-optimized Parallax Effect for Hero
    function initParallaxEffects() {
        const browserMockup = document.querySelector('.browser-mockup');
        const floatingShapes = document.querySelectorAll('.floating-shape');
        
        if (browserMockup && window.innerWidth > 768) {
            function updateParallaxOnScroll() {
                const scrollPosition = window.scrollY;
                
                // Use transform3d for GPU acceleration
                const rotateY = 5 + scrollPosition * 0.02;
                const rotateX = 5 + scrollPosition * 0.01;
                const translateZ = scrollPosition * -0.3;
                
                browserMockup.style.transform = `translate3d(-50%, -50%, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
                
                floatingShapes.forEach((shape, index) => {
                    const speed = 0.5 + (index * 0.1);
                    const translateY = scrollPosition * speed;
                    const rotate = scrollPosition * 0.1;
                    shape.style.transform = `translate3d(0, ${translateY}px, 0) rotateZ(${rotate}deg)`;
                });
                
                scrollTicking = false;
            }
            
            window.addEventListener('scroll', () => {
                if (!scrollTicking) {
                    requestAnimationFrame(updateParallaxOnScroll);
                    scrollTicking = true;
                }
            }, { passive: true });
            
            function updateParallaxOnMouse(e) {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                
                // Use transform3d for GPU acceleration
                const rotateY = 5 + mouseX * 8;
                const rotateX = 5 + mouseY * 4;
                const translateZ = mouseX * 15;
                
                browserMockup.style.transform = `translate3d(-50%, -50%, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
                
                mouseTicking = false;
            }
            
            window.addEventListener('mousemove', (e) => {
                if (!mouseTicking) {
                    requestAnimationFrame(() => updateParallaxOnMouse(e));
                    mouseTicking = true;
                }
            }, { passive: true });
        }
    }

    // Mobile Menu Toggle (simplified)
    hamburger.addEventListener("click", function() {
        this.classList.toggle("active");
        navbar.classList.toggle("active");
        
        // Add body scroll lock when menu is open
        if (navbar.classList.contains("active")) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navbar.classList.remove("active");
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        });
    });

    // Simplified Scroll Events (removed navbar hide/show)
    function updateOnScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Batch DOM reads and writes
        requestAnimationFrame(() => {
            // Header style change on scroll
            if (currentScrollTop > 100) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

            // Highlight active section in navbar
            const sectionOffset = currentScrollTop + 150;
            
            navLinks.forEach(link => {
                const section = document.querySelector(link.getAttribute("href"));
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (sectionOffset >= sectionTop && sectionOffset < sectionTop + sectionHeight) {
                        navLinks.forEach(item => item.classList.remove("active"));
                        link.classList.add("active");
                    }
                }
            });
            
            // Update scroll progress and animations
            updateScrollProgress();
            checkAnimations();
        });
        
        scrollTicking = false;
    }
    
    window.addEventListener("scroll", function() {
        if (!scrollTicking) {
            requestAnimationFrame(updateOnScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    // Performance-optimized Animation System
    function checkAnimations() {
        const triggerBottom = window.innerHeight * 0.85;
        
        // Use requestAnimationFrame for smooth animations
        const animateElements = (elements, className) => {
            elements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerBottom && !element.classList.contains("appear")) {
                    setTimeout(() => {
                        element.classList.add("appear");
                        // Add GPU acceleration
                        element.style.transform = 'translate3d(0, 0, 0)';
                    }, index * 50); // Reduced delay for smoother staggering
                }
            });
        };
        
        // Batch DOM reads and writes for better performance
        requestAnimationFrame(() => {
            animateElements(faders, "fade-in");
            animateElements(slideLefts, "slide-in-left");
            animateElements(slideRights, "slide-in-right");
            
            // Optimized skill bar animation
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const elementTop = bar.getBoundingClientRect().top;
                if (elementTop < triggerBottom && !bar.classList.contains('animated')) {
                    bar.classList.add('animated');
                    const targetWidth = bar.getAttribute('data-width') || '0%';
                    
                    // Force GPU acceleration and optimize animation
                    bar.style.transform = 'translateZ(0)';
                    bar.style.width = '0%';
                    bar.style.transition = 'none';
                    
                    // Force reflow
                    bar.offsetHeight;
                    
                    // Animate with optimized timing
                    requestAnimationFrame(() => {
                        bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                        bar.style.width = targetWidth;
                    });
                }
            });
        });
    }

    // Run initial checks with optimization
    requestAnimationFrame(() => {
        checkAnimations();
        addMagneticEffect();
        initParallaxEffects();
    });

    // Enhanced smooth anchor scrolling with performance optimization
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                // Enhanced smooth scroll with better easing
                smoothScrollTo(offsetPosition, 600);
            }
        });
    });
    
    // Custom smooth scroll function with optimized easing
    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Optimized easing function (ease-out-quart)
            const ease = 1 - Math.pow(1 - progress, 4);
                
            window.scrollTo(0, start + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Initialize terminal in about section with optimization
    initializeTerminal();
    
    // Performance-optimized resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (!resizeTicking) {
                requestAnimationFrame(() => {
                    // Reinitialize effects that depend on window size
                    addMagneticEffect();
                    resizeTicking = false;
                });
                resizeTicking = true;
            }
        }, 150);
    }, { passive: true });
    
    // Optimized image loading with progressive enhancement
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading optimization
        img.loading = 'lazy';
        
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale3d(1.05, 1.05, 1)';
            
            requestAnimationFrame(() => {
                this.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                this.style.opacity = '1';
                this.style.transform = 'scale3d(1, 1, 1)';
            });
        });
    });
    
    // Performance monitoring (optional - can be removed in production)
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark('script-initialization-complete');
        
        // Measure performance after everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                performance.mark('page-fully-interactive');
                
                if (performance.measure) {
                    performance.measure('initialization-time', 'script-initialization-complete', 'page-fully-interactive');
                }
            }, 1000);
        });
    }
});

// Performance-optimized Terminal functionality
function initializeTerminal() {
    const aboutPlaceholder = document.querySelector('.about-placeholder');
    if (!aboutPlaceholder) return;

    const welcomeScreen = `
        <div class="term-welcome">
            <pre class="term-ascii-art">
  __  __ _      _        _ ____             
 |  \\/  (_) ___| |__  __| |  _ \\  _____   __
 | |\\/| | |/ __| '_ \\/ _\` | | | |/ _ \\ \\ / /
 | |  | | | (__| | | | (_| | |_| |  __/\\ V / 
 |_|  |_|_|\\___|_| |_|\\__,_|____/ \\___| \\_/  
            </pre>
            <p>Witaj w moim interaktywnym terminalu portfolio!</p>
            <p>Wpisz <span class="cmd">help</span> aby zobaczyć dostępne komendy lub kliknij na dowolną podświetloną komendę.</p>
        </div>
    `;

    // Use innerHTML only once for better performance
    aboutPlaceholder.innerHTML = `
        <div class="terminal-container">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="terminal-button close"></span>
                    <span class="terminal-button minimize"></span>
                    <span class="terminal-button maximize"></span>
                </div>
                <div class="terminal-title">MichelDev@portfolio ~ </div>
            </div>
            <div class="terminal-body">
                <div class="terminal-output">
                    ${welcomeScreen}
                </div>
                <div class="terminal-command-line">
                    <span class="terminal-prompt">guest@portfolio:~$</span>
                    <span class="terminal-input"></span>
                    <span class="terminal-cursor"></span>
                </div>
            </div>
        </div>
    `;

    // Cache DOM elements for better performance
    const terminalOutput = aboutPlaceholder.querySelector('.terminal-output');
    const terminalInput = aboutPlaceholder.querySelector('.terminal-input');
    const terminalCursor = aboutPlaceholder.querySelector('.terminal-cursor');
    const terminalBody = aboutPlaceholder.querySelector('.terminal-body');

    // Pre-defined commands for better performance
    const commands = [
        {
            command: "whoami",
            response: `<div class="term-response-title">O mnie:</div>
                       <p>Jestem programistą frontend i projektantem grafiki komputerowej z pasją do tworzenia wyjątkowych doświadczeń wizualnych.</p>
                       <p>Specjalizuję się w tworzeniu atrakcyjnych wizualnie stron internetowych oraz grafik które pomagają markom wyróżnić się.</p>`
        },
        {
            command: "contact",
            response: `<div class="term-response-title">Informacje kontaktowe:</div>
                       <p><span class="term-highlight">Email:</span> mateusz.michel7@gmail.com</p>
                       <p><span class="term-highlight">Lokalizacja:</span> Kraków, Polska</p>
                       <p><span class="term-highlight">Godziny pracy:</span> Poniedziałek - Piątek, 9:00 - 17:00</p>`
        },
        {
            command: "help",
            response: `<div class="term-response-title">Dostępne komendy:</div>
                       <p><span class="cmd">whoami</span> - Informacje o mnie</p>
                       <p><span class="cmd">contact</span> - Informacje kontaktowe</p>
                       <p><span class="cmd">clear</span> - Zresetuj ekran terminala</p>
                       <p><span class="cmd">help</span> - Wyświetl dostępne komendy</p>`
        },
        {
            command: "clear",
            response: welcomeScreen,
            reset: true
        }
    ];

    // Create a command lookup map for O(1) access
    const commandMap = new Map();
    commands.forEach(cmd => commandMap.set(cmd.command, cmd));

    function addResponse(text, reset = false) {
        if (reset) {
            terminalOutput.innerHTML = text;
            return;
        }
        
        // Use document fragments for better performance
        const fragment = document.createDocumentFragment();
        
        const commandElement = document.createElement('div');
        commandElement.classList.add('terminal-history-line');
        commandElement.innerHTML = `<span class="terminal-prompt">guest@portfolio:~$</span> ${terminalInput.textContent}`;
        fragment.appendChild(commandElement);
        
        const responseElement = document.createElement('div');
        responseElement.classList.add('terminal-response');
        responseElement.innerHTML = text;
        fragment.appendChild(responseElement);
        
        terminalOutput.appendChild(fragment);
        
        // Smooth scroll to bottom
        requestAnimationFrame(() => {
            terminalBody.scrollTo({
                top: terminalBody.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    function executeCommand(commandText) {
        const command = commandMap.get(commandText);
        
        if (command) {
            addResponse(command.response, command.reset);
        } else {
            addResponse(`<span class="term-error">Błąd: Nie znaleziono komendy: ${commandText}</span><br>Wpisz <span class="cmd">help</span> aby zobaczyć dostępne komendy.`);
        }
        
        terminalInput.textContent = '';
    }

    // Optimized terminal loading animation
    requestAnimationFrame(() => {
        aboutPlaceholder.classList.add('terminal-loaded');
    });

    // Optimized click handlers with event delegation
    aboutPlaceholder.addEventListener('click', function(e) {
        // Handle terminal focus
        if (!e.target.closest('.cmd')) {
            terminalCursor.classList.add('active');
        }
        
        // Handle command clicks
        const cmdElement = e.target.closest('.cmd');
        if (cmdElement) {
            const commandText = cmdElement.textContent;
            terminalInput.textContent = commandText;
            
            // Use requestAnimationFrame for smooth execution
            requestAnimationFrame(() => {
                executeCommand(commandText);
            });
        }
    });
    
    // Optimized keyboard handler with better performance
    let keyboardTicking = false;
    document.addEventListener('keydown', function(e) {
        if (!terminalCursor.classList.contains('active')) return;
        
        if (!keyboardTicking) {
            requestAnimationFrame(() => {
                if (e.key === 'Enter') {
                    const commandText = terminalInput.textContent.trim();
                    if (commandText) {
                        executeCommand(commandText);
                    }
                } else if (e.key === 'Backspace') {
                    const text = terminalInput.textContent;
                    if (text.length > 0) {
                        terminalInput.textContent = text.substring(0, text.length - 1);
                    }
                } else if (e.key === 'Escape') {
                    terminalCursor.classList.remove('active');
                } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    // Only add printable characters
                    terminalInput.textContent += e.key;
                }
                
                keyboardTicking = false;
            });
            keyboardTicking = true;
        }
    });
    
    // Add click outside to blur terminal
    document.addEventListener('click', function(e) {
        if (!aboutPlaceholder.contains(e.target)) {
            terminalCursor.classList.remove('active');
        }
    });
}

// Utility functions for performance optimization
const Utils = {
    // Throttle function for performance-critical events
    throttle: function(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },
    
    // Debounce function for resize events
    debounce: function(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    // Check if element is in viewport (optimized)
    isInViewport: function(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= windowHeight + offset &&
            rect.right <= windowWidth + offset
        );
    },
    
    // Optimized RAF wrapper
    raf: function(callback) {
        return requestAnimationFrame(callback);
    },
    
    // Get optimized transform string
    getTransform3d: function(x = 0, y = 0, z = 0, rotateX = 0, rotateY = 0, rotateZ = 0, scale = 1) {
        return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale3d(${scale}, ${scale}, 1)`;
    }
};