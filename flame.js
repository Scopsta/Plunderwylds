const canvas = document.querySelector('.flame-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let hover = false;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createParticle() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 40 + 20;
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;

  const vx = (Math.random() - 0.5) * (hover ? 1.6 : 1.0);
  const vy = -(Math.random() * (hover ? 2.2 : 1.2)) - 0.3;

  particles.push({
    x,
    y,
    vx,
    vy,
    size: hover ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
    alpha: Math.random() * 0.4 + 0.3
  });
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.01;

    if (p.alpha <= 0) particles.splice(i, 1);
    else {
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (Math.random() < (hover ? 0.4 : 0.1)) createParticle();
  updateParticles();
}

resizeCanvas();
animate();
window.addEventListener('resize', resizeCanvas);

const button = document.getElementById('flame-btn');
button.addEventListener('mouseenter', () => hover = true);
button.addEventListener('mouseleave', () => hover = false);

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
</script>

<script>
  const fadeText = document.querySelector('.fade-text');

  function revealTextOnScroll() {
    const winHeight = window.innerHeight;
    const textTop = fadeText.getBoundingClientRect().top;

    if (textTop < winHeight - 100) {
      fadeText.classList.add('visible');
      window.removeEventListener('scroll', revealTextOnScroll);
    }
  }

  window.addEventListener('scroll', revealTextOnScroll);
</script>

