// --- 1. CONFIGURAZIONE EFFETTO CASCATA (MATRIX STYLE) ---
const canvas = document.getElementById('code-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const fontSize = 16;
const spacing = 100; // Distanza tra le colonne: più è alto, meno codice vedi
let columns;
let drops = [];

// Caratteri randomici (puoi aggiungerne altri se vuoi)
const codeChars = "01<>/{}[];:+=&*%$#!".split("");

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // Calcoliamo quante colonne creare basandoci sullo spacing
    columns = Math.floor(width / spacing);

    drops = [];
    for (let i = 0; i < columns; i++) {
        // Partenza randomica sopra lo schermo per non farli scendere tutti insieme
        drops[i] = Math.random() * -100;
    }
}

function drawMatrix() {
    // Colore dello sfondo con trasparenza per creare la scia
    ctx.fillStyle = "rgba(18, 18, 18, 0.1)";
    ctx.fillRect(0, 0, width, height);

    // Colore del testo (Verde Pino)
    ctx.fillStyle = "#028a76";
    ctx.font = fontSize + "px 'Fira Code', monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];

        // Disegniamo il carattere: X = indice colonna * spacing, Y = posizione drop * font
        ctx.fillText(text, i * spacing, drops[i] * fontSize);

        // Reset della colonna quando tocca il fondo
        if (drops[i] * fontSize > height && Math.random() > 0.98) {
            drops[i] = 0;
        }

        // Velocità di caduta (0.2 è molto lento e calmo)
        drops[i] += 0.2;
    }
}

// Inizializzazione e loop
window.addEventListener('resize', initCanvas);
initCanvas();
setInterval(drawMatrix, 33); // Circa 30 fotogrammi al secondo


// --- 2. GESTIONE ANIMAZIONI SCROLL (REVEAL CONTINUO) ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
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