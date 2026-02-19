const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

function updateCursor() {
    posX += (mouseX - posX) * 0.3; 
    posY += (mouseY - posY) * 0.3;
    
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    cursorFollower.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

updateCursor();

localStorage.removeItem('hasScrolled');
const initialScroll = document.querySelector('.initial-scroll');
let hasScrolled = false;

function hideScrollIndicator() {
    if (!hasScrolled) {
        initialScroll.classList.add('hidden');
        hasScrolled = true;
        localStorage.setItem('hasScrolled', 'true');
    }
}

let previousScrollPosition = window.pageYOffset;
function onScroll() {
    const currentScrollPosition = window.pageYOffset;
    if (currentScrollPosition > previousScrollPosition) {
        hideScrollIndicator();
        window.removeEventListener('scroll', onScroll);
    }
    previousScrollPosition = currentScrollPosition;
}
window.addEventListener('scroll', onScroll);

document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', () => {
        const link = project.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });

    project.addEventListener('mouseenter', () => {
        cursor.classList.add('project-hover');
        cursorFollower.classList.add('project-hover');
    });

    project.addEventListener('mouseleave', () => {
        cursor.classList.remove('project-hover');
        cursorFollower.classList.remove('project-hover');
    });
});

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

VanillaTilt.init(document.querySelectorAll(".project"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-text').forEach((el) => observer.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level') || 0;
            entry.target.style.setProperty('--level', level + '%');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-bar').forEach(bar => {
    skillObserver.observe(bar);
});

const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        nav.classList.add('scrolling-down');
    } else {
        nav.classList.remove('scrolling-down');
    }
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Back to top button visibility
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    const toggleBackToTop = () => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
}

// Use default cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch');
}

console.log("Hey, stay out of my console!");