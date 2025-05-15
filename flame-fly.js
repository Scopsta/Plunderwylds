const canvas = document.getElementById('cart-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
window.emitting = false;
let reversing = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle(centerX, centerY, spread, color = "rgba(0, 255, 255", alphaMod = 1) {
  const x = centerX + (Math.random() - 0.5) * spread * 0.6;
  const y = centerY + (Math.random() - 0.5) * spread * 0.6;

  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 0.7 + 0.5;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  return {
    x,
    y,
    vx,
    vy,
    size: Math.random() * 3 + 1.5,
    alpha: 0.01,
    color
  };
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    p.alpha = Math.min(1, p.alpha + 0.05);
    p.alpha -= 0.008;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      ctx.beginPath();
      ctx.fillStyle = `${p.color}, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (window.emitting && Math.random() < 0.4) {
const button = document.getElementById('cart-btn');
const rect = button.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
const spread = Math.min(rect.width, rect.height) * 0.5; // reasonable range
particles.push(createParticle(centerX, centerY, spread, "rgba(0, 255, 255", 1));
  }
  updateParticles();
}
animate();

function startGlowPulse(colorClass) {
  const cart = document.getElementById('cart-indicator');
  cart.classList.remove('cart-pulse', 'cart-pulse-red');
  void cart.offsetWidth;
  cart.classList.add(colorClass);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Called when cart count drops to 0
function reverseCartAnimation() {
  window.emitting = false;
  
  const cart = document.getElementById('cart-indicator');
  reversing = true;

  // Fade out existing particles
  particles = particles.map(p => ({
    ...p,
    alpha: p.alpha * 0.5,
    color: "rgba(255, 0, 0"
  }));

  startGlowPulse('cart-pulse-red');

  setTimeout(() => {
    const canvasRect = canvas.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    const dx = -(cartRect.left + cartRect.width / 2 - (canvasRect.left + canvasRect.width / 2));
    const dy = -(cartRect.top + cartRect.height / 2 - (canvasRect.top + canvasRect.height / 2));

    canvas.style.transition = 'transform 1.5s ease-in-out, opacity 0.6s ease-out 1.5s';
    canvas.style.transform = `translate(${dx}px, ${dy}px) scale(1.5)`;
    canvas.style.opacity = '0.5';

    setTimeout(() => {
      canvas.style.transition = '';
      canvas.style.transform = '';
      canvas.style.opacity = '1';
      particles = [];
      cart.classList.remove('cart-pulse-red');
      reversing = false;
    }, 1500);
  }, 500);
}

window.triggerCartEmptyVisual = reverseCartAnimation;
window.delay = delay;
window.startGlowPulse = startGlowPulse;
window.clearFlameParticles = function () {
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};