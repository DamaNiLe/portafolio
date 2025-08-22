const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


const hoverSign = document.querySelector('.hover-sign');

const videoList =[video1, video2, video3];

videoList.forEach (function(video){
    video.addEventListener("mouseover", function(){
        video.play()
        hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function(){
    video.pause();
    hoverSign.classList.remove("active")
})
})

// Sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
})
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createParticles() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 2 + 1;
  const dx = (Math.random() - 0.5) * 2;
  const dy = (Math.random() - 0.5) * 2;
  const colors = ["#ff66cc", "#a066ff", "#66ccff"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  particles.push({ x, y, radius, dx, dy, color });
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) { // distancia para conectar
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,200,255,${1 - distance / 120})`; // transparencia según distancia
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo degradado suave
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(226, 94, 182, 0.1)");
  gradient.addColorStop(0.5, "rgba(145, 92, 230, 0.1)");
  gradient.addColorStop(1, "rgba(93, 187, 234, 0.1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar partículas
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      particles.splice(i, 1);
    }
  });

  connectParticles(); // dibujar líneas entre partículas cercanas

  if (particles.length < 200) createParticles();

  requestAnimationFrame(animate);
}

animate();
