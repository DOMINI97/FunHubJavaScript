const fireworks = [];
const particles = [];

// ==================================== Particles =================================
class Particle {
  constructor(x, y) {
    const colors = ["red", "green", "blue", "orange", "yellow", "pink"];
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 3 + 2;
    this.angle = Math.random() * 2 * Math.PI;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = -Math.sin(this.angle) * this.speed;

    this.el = document.createElement("div");
    this.el.className = "particle";
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    this.el.style.backgroundColor =
      colors[parseInt(Math.random() * colors.length)];
    document.body.appendChild(this.el);

    setTimeout(() => {
      this.el.remove();
      particles.splice(particles.indexOf(this), 1);
    }, 300);
  }

  setPositions(x, y) {
    this.x = x;
    this.y = y;
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }
}

// ==================================== FireWorks =================================
class Firework {
  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight;
    this.numberOfParticlesToSpawn = 100;
    this.speed = 10;
    this.angle = (Math.random() * Math.PI) / 2 + Math.PI / 4;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = -Math.sin(this.angle) * this.speed;

    this.el = document.createElement("div");
    this.el.className = "firework";
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    document.body.appendChild(this.el);

    setTimeout(() => {
      this.explode();
      this.el.remove();
      fireworks.splice(fireworks.indexOf(this), 1);
    }, 600);
  }
  explode() {
    for (let i = 0; i < this.numberOfParticlesToSpawn; i++) {
      const particle = new Particle(this.x, this.y);
      particles.push(particle);
    }
  }

  update() {
    // debugger;
    this.x += this.vx;
    this.y += this.vy;
    // this.vy += 0.2;
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    this.vy += 0.15;
  }
}

setInterval(() => {
  fireworks.forEach((firework) => {
    firework.update();
  });
  particles.forEach((particle) => {
    particle.update();
  });
}, 10);

setInterval(() => {
  const firework = new Firework();
  fireworks.push(firework);
}, 150);
