document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const header = document.getElementById("header");
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const faders = document.querySelectorAll(".fade-in");
    
    // Text animation for hero section
    const heroWords = document.querySelectorAll('.hero-word');
    
    if (heroWords.length > 0) {
        setTimeout(() => {
            heroWords.forEach((word, index) => {
                setTimeout(() => {
                    word.style.opacity = '1';
                    word.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    }
    
    // Mesh animation on scroll
    const meshContainer = document.querySelector('.gradient-mesh-container');
    const meshItems = document.querySelectorAll('.mesh-item');
    
    if (meshContainer && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            meshContainer.style.transform = `translate(-50%, -50%) rotateY(${scrollPosition * 0.05}deg) rotateX(${10 + scrollPosition * 0.02}deg)`;
        });
    }
    
    if (meshItems.length && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            meshItems.forEach((item, index) => {
                const depth = 20 * (index + 1);
                item.style.transform = `translateX(${mouseX * depth}px) translateY(${mouseY * depth}px)`;
            });
        });
    }
    
    // Particle Network Animation
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        
        // Resize canvas to full size
        function resizeCanvas() {
            const canvasContainer = canvas.parentElement;
            width = canvasContainer.offsetWidth;
            height = canvasContainer.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = Math.random() * 0.2 - 0.1;
                this.vy = Math.random() * 0.2 - 0.1;
                this.size = Math.random() * 2 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fill();
            }
        }
        
        // Create particles
        const particleCount = 50;
        const particles = [];
        let mouseX = null;
        let mouseY = null;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Mouse interaction
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        canvas.addEventListener('mouseleave', () => {
            mouseX = null;
            mouseY = null;
        });
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw connections between particles
            ctx.strokeStyle = 'rgba(58, 134, 255, 0.15)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.globalAlpha = 1 - (distance / 100);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            
            // Connect to mouse position
            if (mouseX !== null && mouseY !== null) {
                ctx.strokeStyle = 'rgba(124, 77, 255, 0.2)';
                
                for (const particle of particles) {
                    const dx = particle.x - mouseX;
                    const dy = particle.y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(mouseX, mouseY);
                        ctx.globalAlpha = 1 - (distance / 150);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            
            // Update and draw particles
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Mobile Menu Toggle
    hamburger.addEventListener("click", function() {
        this.classList.toggle("active");
        navbar.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navbar.classList.remove("active");
        });
    });

    // Scroll Events
    window.addEventListener("scroll", function() {
        // Header style change on scroll
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Highlight active section in navbar
        const currentPos = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
                navLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");
            }
        });
        
        // Fade in elements on scroll
        checkFade();
    });

    // Fade in elements when they come into view
    function checkFade() {
        const triggerBottom = window.innerHeight * 0.8;
        
        faders.forEach(fader => {
            const elementTop = fader.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                fader.classList.add("appear");
            }
        });
    }

    // Run fade check on page load
    checkFade();

    // Enhanced hover effect for contact card
    const contactCard = document.querySelector('.contact-card');
    
    if (contactCard) {
        contactCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
        });
        
        contactCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px var(--glass-shadow)';
        });
    }

    // Smooth anchor scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});