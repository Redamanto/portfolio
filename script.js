// --- 1. CONFIGURAZIONE EFFETTO CASCATA ---
const canvas = document.getElementById('code-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const fontSize = 16;
let spacing;
let columns;
let drops = [];

const codeChars = "01<>/{}[];:+=&*%$#!".split("");

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // DINAMICO: Se lo schermo è piccolo (mobile), riduciamo lo spazio tra le colonne
    // Se width < 600px (mobile), spacing = 50. Altrimenti 100.
    spacing = (width < 600) ? 50 : 100;

    columns = Math.floor(width / spacing);

    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}

function drawMatrix() {
    // Aumentiamo da 0.1 a 0.3 per "pulire" più velocemente le scie vecchie
    ctx.fillStyle = "rgba(18, 18, 18, 0.3)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#028a76";
    ctx.font = fontSize + "px 'Fira Code', monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];

        ctx.fillText(text, i * spacing, drops[i] * fontSize);

        // Se vuoi che le "frecce" siano più corte, puoi anche aumentare la probabilità di reset
        if (drops[i] * fontSize > height && Math.random() > 0.95) { // Abbassato da 0.98 a 0.95
            drops[i] = 0;
        }

        drops[i] += 0.2;
    }
}

window.addEventListener('resize', () => {
    initCanvas();
});

initCanvas();
// Usiamo un intervallo fluido
setInterval(drawMatrix, 33);

// --- 2. GESTIONE ANIMAZIONI SCROLL (REVEAL) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));