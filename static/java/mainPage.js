const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
const colors = ['#00ffff', '#ff0080', '#ffeb3b', '#00ff66', '#00b3ff', '#ff4800'];

class Ball {
  constructor() {
    this.radius = 2 + Math.random() * 3;

    // Izvēlies sānu
    this.fromLeft = Math.random() < 0.5;
    this.x = this.fromLeft ? -this.radius : canvas.width + this.radius;
    this.y = Math.random() * canvas.height / 2;

    // Aprēķini minimālo horizontālo ātrumu, lai sasniegtu vidu
    const targetX = canvas.width / 2;
    const distanceX = Math.abs(targetX - this.x);
    const minVx = distanceX / 500;
    const maxVx = minVx + 5; // samazināts max ātrums

    this.vx = (this.fromLeft ? 1 : -1) * (minVx + Math.random() * (maxVx - minVx));

    this.vy = 0 + Math.random() * 0.5; // sāk krīt uzreiz
    this.gravity = 0.1 + Math.random() * 0.05; // dabiskāka krišana
    this.startTime = Date.now();
    //  this.color = `hsl(${Math.random() * 360}, 80%, 50%)`;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.history = [{ x: this.x, y: this.y }];

  }

  update() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    this.x += this.vx;
    this.vy += this.gravity / 4;
    this.y += this.vy;

    // Saglabā pozīciju vēsturē
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 30) this.history.shift(); // ierobežo pēdas garumu

    return elapsed < 10;
  }

  draw() {
    ctx.save();

    // Zīmē trail line ar mainīgu platumu
    for (let i = 0; i < this.history.length - 1; i++) {
      const p1 = this.history[i];
      const p2 = this.history[i + 1];

      const t = i / (this.history.length - 1); // no 0 līdz 1
      const width = 1 + t * 4;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = width;
      ctx.globalAlpha = 0.2 + (1 - t) * 0.1; // nedaudz caurspīdīgāks uz beigām
      ctx.stroke();
    }
    ctx.globalAlpha = 1;


    // Lodīte ar glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.shadowBlur = this.radius * 8;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

}



const balls = [];

setInterval(() => {
  balls.push(new Ball());
}, 1000);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];
    if (ball.update()) {
      ball.draw();
    } else {
      balls.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

animate();


//#region  Paralax
const grid1 = document.querySelector('.grid1');
const grid2 = document.querySelector('.grid2');

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function updateParallax() {
  // Tween kustība — plūstoša pāreja
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

grid1.style.transform = `translate(${currentX * 50}px, ${currentY * 50}px)`; // bija 20 → 30
grid2.style.transform = `translate(${currentX * 150}px, ${currentY * 150}px) scale(1.2)`; // bija 80 → 120


  requestAnimationFrame(updateParallax);
}

updateParallax();


//#endregion
