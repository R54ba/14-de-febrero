// Seleccionamos el SVG donde dibujaremos el girasol
const svg = document.getElementById("girasol");

// Función para crear un tallo curvado más realista
// Función para crear un tallo con venas
// Función para crear un tallo con grosor variable y venas realistas
function crearTallo() {
    const grupoTallo = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // 🔥 Definir el degradado SOLO para el tallo
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradiente = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradiente.setAttribute("id", "gradienteTallo");
    gradiente.setAttribute("x1", "0%");
    gradiente.setAttribute("y1", "0%");
    gradiente.setAttribute("x2", "0%");
    gradiente.setAttribute("y2", "100%");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#4caf50"); // Verde claro en la parte superior

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#2e7d32"); // Verde oscuro en la base

    gradiente.appendChild(stop1);
    gradiente.appendChild(stop2);
    defs.appendChild(gradiente);

    // 🌿 Tallo principal con el degradado aplicado
    const tallo = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tallo.setAttribute("d", `
        M 100 180  
        C 110 250, 90 380, 100 500  
    `);
    tallo.setAttribute("fill", "none");
    tallo.setAttribute("stroke", "url(#gradienteTallo)"); // 🌟 Solo el tallo tiene degradado
    tallo.setAttribute("stroke-width", "18");
    tallo.setAttribute("stroke-linecap", "round");

    // 🌱 Venas del tallo (sin degradado)
    const venas = document.createElementNS("http://www.w3.org/2000/svg", "path");
    venas.setAttribute("d", `
        M 102 200 Q 110 260, 98 320  // Vena superior
        M 98 280 Q 90 360, 102 440  // Vena inferior
    `);
    venas.setAttribute("fill", "none");
    venas.setAttribute("stroke", "#2e7d32"); // Color fijo para las venas
    venas.setAttribute("stroke-width", "3");

    // 🔥 Agrupar todo
    grupoTallo.appendChild(defs);
    grupoTallo.appendChild(tallo);
    grupoTallo.appendChild(venas);

    return grupoTallo;
}

// 🟢 Agregar el tallo al SVG
svg.appendChild(crearTallo());


// Función para crear una hoja
function crearHoja(cx, cy, rot) {
    const hoja = document.createElementNS("http://www.w3.org/2000/svg", "path");

    hoja.setAttribute("d", `M ${cx} ${cy}  
        C ${cx + 55} ${cy - 20}, ${cx + 20} ${cy - 70}, ${cx} ${cy - 90}  
        C ${cx - 20} ${cy - 70}, ${cx - 40} ${cy - 20}, ${cx} ${cy}`);
    
    hoja.setAttribute("fill", "#4caf50");  
    hoja.setAttribute("stroke", "#2e7d32");  
    hoja.setAttribute("stroke-width", "1");
    hoja.setAttribute("transform", `rotate(${rot}, ${cx}, ${cy})`);

    const venas = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let venasPath = `M ${cx} ${cy} L ${cx} ${cy - 80}`;
    venasPath += ` M ${cx} ${cy - 20} Q ${cx + 10} ${cy - 30}, ${cx + 5} ${cy - 40}`;
    venasPath += ` M ${cx} ${cy - 30} Q ${cx - 10} ${cy - 45}, ${cx - 5} ${cy - 55}`;
    venasPath += ` M ${cx} ${cy - 50} Q ${cx + 8} ${cy - 60}, ${cx + 4} ${cy - 70}`;
    venasPath += ` M ${cx} ${cy - 50} Q ${cx - 8} ${cy - 60}, ${cx - 4} ${cy - 70}`;

    venas.setAttribute("d", venasPath);
    venas.setAttribute("stroke", "#2e7d32"); 
    venas.setAttribute("stroke-width", "1.5");
    venas.setAttribute("fill", "none");
    venas.setAttribute("transform", `rotate(${rot}, ${cx}, ${cy})`);

    const grupoHoja = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grupoHoja.appendChild(hoja);
    grupoHoja.appendChild(venas);
    return grupoHoja;
}

// Agregar las hojas ANTES de los pétalos
svg.appendChild(crearHoja(95, 215, -68, 0.7));  // Hoja izquierda
svg.appendChild(crearHoja(110, 220, 48));  // Hoja derecha

// Función para crear un pétalo
function crearPetalo(cx, cy, angulo) {
    const petalo = document.createElementNS("http://www.w3.org/2000/svg", "path");

    petalo.setAttribute("d", `M ${cx} ${cy} 
                              C ${cx + 15} ${cy - 40}, ${cx + 45} ${cy - 50}, ${cx + 20} ${cy - 80}  
                              Q ${cx} ${cy - 100}, ${cx - 20} ${cy - 80}  
                              C ${cx - 45} ${cy - 50}, ${cx - 15} ${cy - 40}, ${cx} ${cy}`);
    
    petalo.setAttribute("fill", "#ffcc00"); // Amarillo vibrante
    petalo.setAttribute("stroke", "#d4a017"); // Contorno
    petalo.setAttribute("stroke-width", "2");
    petalo.setAttribute("transform", `rotate(${angulo}, 100, 100)`);
    return petalo;
}

// Crear pétalos DESPUÉS del tallo y las hojas
const cantidadPetalos = 7;
for (let i = 0; i < cantidadPetalos; i++) {
    let angulo = (360 / cantidadPetalos) * i;
    svg.appendChild(crearPetalo(100, 91, angulo));
}

// Centro del girasol (marrón oscuro) debe ser lo último
const centro = document.createElementNS("http://www.w3.org/2000/svg", "circle");
centro.setAttribute("cx", "100");
centro.setAttribute("cy", "100");
centro.setAttribute("r", "50");
centro.setAttribute("fill", "#D35400");
svg.appendChild(centro);

// 👀 Función para crear un ojo
function crearOjo(cx, cy) {
    const grupoOjo = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // 👁️ Ojo (blanco)
    const ojo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ojo.setAttribute("cx", cx);
    ojo.setAttribute("cy", cy);
    ojo.setAttribute("r", "10");
    ojo.setAttribute("fill", "white");

    // 👁️ Pupila (negro)
    const pupila = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pupila.setAttribute("cx", cx);
    pupila.setAttribute("cy", cy);
    pupila.setAttribute("r", "4");
    pupila.setAttribute("fill", "black");

    // 👀 Párpado (para el parpadeo)
    const parpado = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    parpado.setAttribute("x", cx - 10);
    parpado.setAttribute("y", cy - 10);
    parpado.setAttribute("width", "20");
    parpado.setAttribute("height", "10");
    parpado.setAttribute("fill", "black");

    grupoOjo.appendChild(ojo);
    grupoOjo.appendChild(pupila);
    grupoOjo.appendChild(parpado);

    return { grupoOjo, parpado };
    
}

// 😃 Función para crear la boca sonriente
function crearBoca(cx, cy) {
    const boca = document.createElementNS("http://www.w3.org/2000/svg", "path");
    boca.setAttribute("d", `M ${cx - 15} ${cy} Q ${cx} ${cy + 10}, ${cx + 15} ${cy}`);
    boca.setAttribute("stroke", "black");
    boca.setAttribute("stroke-width", "2");
    boca.setAttribute("fill", "none");
    return boca;
}

// 🏗️ Agregamos los ojos y la boca al centro del girasol
const centroX = 100;
const centroY = 100;
const separacionOjos = 18; // Distancia entre los ojos

const ojoIzquierdo = crearOjo(centroX - separacionOjos, centroY - 10);
const ojoDerecho = crearOjo(centroX + separacionOjos, centroY - 10);
const boca = crearBoca(centroX, centroY + 15);

svg.appendChild(ojoIzquierdo.grupoOjo);
svg.appendChild(ojoDerecho.grupoOjo);
svg.appendChild(boca);

// 👀 Animación de parpadeo
function parpadear() {
    ojoIzquierdo.parpado.setAttribute("height", "0");
    ojoDerecho.parpado.setAttribute("height", "0");

    setTimeout(() => {
        ojoIzquierdo.parpado.setAttribute("height", "10");
        ojoDerecho.parpado.setAttribute("height", "10");
    }, 200); // Cierra los ojos por 200ms

    setTimeout(parpadear, Math.random() * 3000 + 2000); // Parpadeo aleatorio entre 2 y 5 segundos
}

parpadear();

let etapaBoca = 0; // Controla los diferentes estados de la boca
let dientes = document.createElementNS("http://www.w3.org/2000/svg", "rect");



function crearNotaMusical() {
    const nota = document.createElementNS("http://www.w3.org/2000/svg", "text");
    nota.setAttribute("x", centroX);
    nota.setAttribute("y", centroY + 10);
    nota.setAttribute("font-size", "20");
    nota.setAttribute("fill", "black");
    nota.textContent = "🎶"; // Nota musical

    svg.appendChild(nota);

    let posY = centroY + 10;
    let posX = centroX;
    let direccion = Math.random() > 0.5 ? 1 : -1; // Decide si empieza moviéndose a la izquierda o derecha

    const animacion = setInterval(() => {
        posY -= 2; // La nota sube
        posX += direccion * 1.5; // Movimiento en zigzag

        // Cambia la dirección de la nota de forma aleatoria
        if (Math.random() > 0.8) {
            direccion *= -1;
        }

        nota.setAttribute("x", posX);
        nota.setAttribute("y", posY);

        if (posY < centroY - 50) { // Cuando suba lo suficiente, se borra
            clearInterval(animacion);
            svg.removeChild(nota);
        }
    }, 100);
}

// Generar notas cada 600ms
setInterval(crearNotaMusical, 600);



function crearHoja(cx, cy, rot) {
    const grupoHoja = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Hoja principal
    const hoja = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hoja.setAttribute("d", `M ${cx} ${cy}  
        C ${cx + 55} ${cy - 20}, ${cx + 20} ${cy - 70}, ${cx} ${cy - 90}  
        C ${cx - 20} ${cy - 70}, ${cx - 40} ${cy - 20}, ${cx} ${cy}`);
    hoja.setAttribute("fill", "#4caf50");  
    hoja.setAttribute("stroke", "#2e7d32");  
    hoja.setAttribute("stroke-width", "2");

    // Vena principal (eje central)
    const venaPrincipal = document.createElementNS("http://www.w3.org/2000/svg", "path");
    venaPrincipal.setAttribute("d", `M ${cx} ${cy} Q ${cx} ${cy - 45}, ${cx} ${cy - 90}`);
    venaPrincipal.setAttribute("stroke", "#2e7d32");
    venaPrincipal.setAttribute("stroke-width", "3");
    venaPrincipal.setAttribute("fill", "none");

    // Venas laterales (ramificación)
    const venas = [
        { x1: cx, y1: cy - 75, x2: cx - 20, y2: cy - 60, cx1: cx - 10, cy1: cy - 70 },
        { x1: cx, y1: cy - 75, x2: cx + 20, y2: cy - 60, cx1: cx + 10, cy1: cy - 70 },
        { x1: cx, y1: cy - 55, x2: cx - 25, y2: cy - 40, cx1: cx - 15, cy1: cy - 50 },
        { x1: cx, y1: cy - 55, x2: cx + 25, y2: cy - 40, cx1: cx + 15, cy1: cy - 50 },
        { x1: cx, y1: cy - 35, x2: cx - 20, y2: cy - 20, cx1: cx - 10, cy1: cy - 28 },
        { x1: cx, y1: cy - 35, x2: cx + 20, y2: cy - 20, cx1: cx + 10, cy1: cy - 28 }
    ];

    venas.forEach(vena => {
        const curva = document.createElementNS("http://www.w3.org/2000/svg", "path");
        curva.setAttribute("d", `M ${vena.x1} ${vena.y1} Q ${vena.cx1} ${vena.cy1}, ${vena.x2} ${vena.y2}`);
        curva.setAttribute("stroke", "#2e7d32");
        curva.setAttribute("stroke-width", "1.5");
        curva.setAttribute("fill", "none");
        grupoHoja.appendChild(curva);
    });

    // Animación de oscilación
    const animacion = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    animacion.setAttribute("attributeType", "XML");
    animacion.setAttribute("attributeName", "transform");
    animacion.setAttribute("type", "rotate");
    animacion.setAttribute("from", `${rot - 5} ${cx} ${cy}`);
    animacion.setAttribute("to", `${rot + 5} ${cx} ${cy}`);
    animacion.setAttribute("dur", "2s");
    animacion.setAttribute("repeatCount", "indefinite");
    animacion.setAttribute("values", `${rot - 5} ${cx} ${cy}; ${rot + 5} ${cx} ${cy}; ${rot - 5} ${cx} ${cy}`);
    animacion.setAttribute("keyTimes", "0; 0.5; 1");

    // Agregar elementos al grupo
    grupoHoja.appendChild(hoja);
    grupoHoja.appendChild(venaPrincipal);
    grupoHoja.appendChild(animacion);

    return grupoHoja;
}

// Agregar hojas con animación
svg.appendChild(crearHoja(95, 215, -68)); // Hoja izquierda
svg.appendChild(crearHoja(110, 220, 48)); // Hoja derecha

document.addEventListener("DOMContentLoaded", function () {
    var player = document.getElementById("youtube-player");
    player.src = "https://youtu.be/u7XjPmN-tHw?si=fcgp_89yv0DCi1OH";
});

// Función para reproducir la música al hacer clic en cualquier parte de la pantalla
  document.body.addEventListener('click', function() {
    var audio = document.getElementById('audio-player');
    if (audio.paused) { // Solo reproduce si no está ya sonando
        audio.play();
    }
});
