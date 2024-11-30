document.addEventListener('DOMContentLoaded', function() {
    // Animated Background
    const canvas = document.getElementById('animeBg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Resize canvas when window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Scroll Reveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200
    });

    sr.reveal('.hero h1, .hero p, .hero .btn', { interval: 200 });
    sr.reveal('#about img', { origin: 'left' });
    sr.reveal('#about p, #about .badge', { origin: 'right' });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('#contact form', { origin: 'bottom' });

    // Navbar color change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        console.log('Form submitted!');
        console.log('Name:', form.elements.name.value);
        console.log('Email:', form.elements.email.value);
        console.log('Message:', form.elements.message.value);
        form.reset();
        alert('Thank you for your message! We\'ll get back to you soon.');
    });

    // Particle interaction with mouse
    let mouse = {
        x: null,
        y: null,
        radius: 100
    }

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            let dx = mouse.x - particles[i].x;
            let dy = mouse.y - particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * 5;
                let directionY = forceDirectionY * force * 5;
                
                particles[i].x -= directionX;
                particles[i].y -= directionY;
            }
        }
    }

    // Update the animate function to include particle interaction
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        updateParticles();
        requestAnimationFrame(animate);
    }
});



