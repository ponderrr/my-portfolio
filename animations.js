// Utility function for creating observers
const createObserver = (callback, options = {}) => {
    return new IntersectionObserver(callback, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...options
    });
};

// Scroll Animation Observer
const scrollObserver = createObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
});

// Initialize scroll animations
function initScrollAnimations() {
    document.querySelectorAll('.skill-item, .skill-category, .contact-item').forEach(el => {
        el.classList.add('scroll-animated');
        scrollObserver.observe(el);
    });

    // Add staggered delays
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Particle Background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = document.body.classList.contains('dark-mode') 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Particle Background Animation
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('particle-background');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        
        window.addEventListener('resize', this.resize);
        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = Array.from({ length: 100 }, () => new Particle(this.canvas));
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        requestAnimationFrame(this.animate);
    }
}

// 3D Hover Effect
class HoverEffect {
    constructor(elements) {
        this.elements = elements;
        this.bindEvents();
    }

    bindEvents() {
        this.elements.forEach(item => {
            item.addEventListener('mousemove', (e) => this.handleHover(e, item));
            item.addEventListener('mouseleave', () => this.handleLeave(item));
        });
    }

    handleHover(e, item) {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        item.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height / 2) / 20}deg)
            rotateY(${-(x - rect.width / 2) / 20}deg)
            translateZ(10px)
        `;
    }

    handleLeave(item) {
        item.style.transform = '';
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();

    // Initialize particle background
    const particleBackground = new ParticleBackground();
    particleBackground.animate();

    // Initialize hover effects
    const hoverEffect = new HoverEffect(document.querySelectorAll('.skill-item'));

    // Initialize locomotive scroll if available
    if (typeof LocomotiveScroll !== 'undefined') {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            lerp: 0.05
        });
    }

    // Initialize magnetic buttons if available
    if (typeof MagneticButton !== 'undefined') {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            new MagneticButton(btn);
        });
    }
});