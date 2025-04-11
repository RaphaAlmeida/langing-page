// assets/js/main.js

// Exemplo: Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    let target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Parallax para o header
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const offset = window.pageYOffset;
  hero.style.backgroundPositionY = offset * 0.7 + 'px';
});

// Animação de fade in para seções usando IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('animate');
      // Se preferir animação única, desativa a observação após animar
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(section => {
  // As seções já estão no HTML com o estilo inicial em opacidade 0
  observer.observe(section);
});

// Seleciona o canvas e obtém o contexto 2D
const canvas = document.getElementById('stockCanvas');
const ctx = canvas.getContext('2d');

// Função para ajustar o tamanho do canvas conforme a área do .hero
function resizeCanvas() {
  const hero = document.querySelector('.hero');
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Variáveis para a animação
let xPos = 0;
let lastY = canvas.height / 2;
const points = [];

// Função de animação
function animateChart() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define a velocidade da animação
  xPos += 2;

  // Gera uma nova posição Y com leve variação (simulando flutuações do mercado)
  let newY = lastY + (Math.random() * 20 - 10);
  // Limita o valor para ficar dentro do canvas
  newY = Math.min(Math.max(newY, 20), canvas.height - 20);
  points.push({ x: xPos, y: newY });
  lastY = newY;

  // Remove pontos que não são mais visíveis (deixaram o canvas)
  if (points.length > 0 && points[0].x < xPos - canvas.width) {
    points.shift();
  }

  // Desenha a linha do gráfico
  ctx.beginPath();
  ctx.strokeStyle = "#00ff88";  // Cor que remete ao universo dos traders, por exemplo, verde neon
  ctx.lineWidth = 2;
  for (let i = 0; i < points.length; i++) {
    // Corrige a posição X para manter a animação correndo da direita para a esquerda
    const point = points[i];
    if (i === 0) {
      ctx.moveTo(point.x - (xPos - canvas.width), point.y);
    } else {
      ctx.lineTo(point.x - (xPos - canvas.width), point.y);
    }
  }
  ctx.stroke();

  requestAnimationFrame(animateChart);
}
animateChart();
