document.addEventListener("DOMContentLoaded", () => {

/* =========== ASSETS =========== */
const PROFILE_IMG = 'assets/profile.png';
const ESQUE_IMG = 'assets/Esque.png';
const MLMETHOD_IMG = 'assets/mlmethod.png';
const SUNCLUB_IMG = 'assets/Sunclub.png';
const RESUME_PDF = 'assets/Ujjawal_Sharma_Resume.pdf';

const setSrc = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.src = value;
};

const setHref = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.href = value;
};

setSrc('profileImg', PROFILE_IMG);
setSrc('esqueImg', ESQUE_IMG);
setSrc('mlImg', MLMETHOD_IMG);
setSrc('sunImg', SUNCLUB_IMG);


/* =========== CUSTOM CURSOR =========== */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

/* =========== SCROLL PROGRESS =========== */
const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (progressBar) {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  }
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

/* =========== MOBILE MENU =========== */
const navLinks = document.getElementById('navLinks');

window.toggleMenu = function () {
  if (navLinks) navLinks.classList.toggle('mobile-open');
};

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('mobile-open');
  });
});

/* =========== PARTICLES =========== */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(Math.random() * 0.5 + 0.1);
      this.r = Math.random() * 1.2 + 0.3;
      this.life = 0;
      this.maxLife = Math.random() * 400 + 200;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,171,${this.alpha})`;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 60 }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  animate();
}

/* =========== TYPING ANIMATION =========== */
const typingEl = document.getElementById('typingText');
if (typingEl) {
  const phrases = [
    'Responsive Website Developer',
    'WordPress Developer',
    'MERN Stack Developer'
  ];

  let i = 0, j = 0, deleting = false;

  function type() {
    const phrase = phrases[i];

    if (!deleting) {
      typingEl.textContent = phrase.slice(0, ++j);
      if (j === phrase.length) {
        deleting = true;
        setTimeout(type, 1500);
        return;
      }
    } else {
      typingEl.textContent = phrase.slice(0, --j);
      if (j === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}


/* ===== ADVANCED DUAL ORBIT WITH TECH ICONS ===== */

const orbitWrap = document.getElementById("orbitIcons");

if(orbitWrap){

  orbitWrap.style.position = "absolute";
  orbitWrap.style.left = "50%";
  orbitWrap.style.top  = "50%";
  orbitWrap.style.transform = "translate(-50%,-50%)";

  const innerIcons = [
    '<i class="fa-brands fa-html5" style="color:#E44D26;"></i>',
    '<i class="fa-brands fa-css3-alt" style="color:#264de4;"></i>',
    '<i class="fa-brands fa-js" style="color:#F0DB4F;"></i>'
  ];

  const outerIcons = [
    '<i class="fa-brands fa-react" style="color:#61DBFB;"></i>',
    '<i class="fa-brands fa-node-js" style="color:#3C873A;"></i>',
    '<i class="fa-brands fa-wordpress" style="color:#21759B;"></i>'
  ];

  const createOrbit = (icons, radius, speed, zIndex) => {

    const items = [];

    icons.forEach((icon,i)=>{
      const el = document.createElement("div");
      el.className = "orbit-icon";
      el.innerHTML = icon;
      el.style.zIndex = zIndex;
      el.style.position = "absolute";
      orbitWrap.appendChild(el);

      items.push({
        el,
        angle:(i/icons.length)*Math.PI*2
      });
    });

    return function(){
      items.forEach(p=>{
        p.angle += speed;

        const x = radius * Math.cos(p.angle);
        const y = radius * Math.sin(p.angle);

        const scale = (Math.sin(p.angle)+1)/2 * 0.4 + 0.8;

        p.el.style.left = x+"px";
        p.el.style.top  = y+"px";
        p.el.style.transform =
        `translate(-50%,-50%) scale(${scale})`;
      });
    }
  }

  const innerMove = createOrbit(innerIcons,130,0.006,6);
  const outerMove = createOrbit(outerIcons,185,-0.003,4);

  function animate(){
    innerMove();
    outerMove();
    requestAnimationFrame(animate);
  }

  animate();
}
/* =========== SCROLL REVEAL =========== */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

if (revealEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

/* =========== PROJECT CARD TILT =========== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `translateY(-10px) perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* =========== CONTACT FORM =========== */
window.handleFormSubmit = function () {
  const name = document.getElementById('formName')?.value.trim();
  const email = document.getElementById('formEmail')?.value.trim();
  const message = document.getElementById('formMessage')?.value.trim();
  const btn = document.getElementById('formSubmit');
  const status = document.getElementById('formStatus');

  if (!name || !email || !message) {
    if (status) {
      status.textContent = '⚠ Please fill in all fields.';
      status.className = 'form-status error';
      status.style.display = 'block';
    }
    return;
  }

  if (btn) {
    btn.textContent = '⏳ Sending...';
    btn.disabled = true;
  }

  const body =
    `Hi Ujjawal,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const mailto =
    `mailto:ujjawalsharma7033@gmail.com?subject=${encodeURIComponent("Portfolio Inquiry - " + name)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  setTimeout(() => {
    if (status) {
      status.textContent = '✓ Email client opened successfully!';
      status.className = 'form-status success';
      status.style.display = 'block';
    }
    if (btn) {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }
  }, 1000);
};

/* =========== ACTIVE NAV =========== */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active',
      a.getAttribute('href') === '#' + current);
  });
});


const resumeBtn = document.getElementById('resumeBtn');

if (resumeBtn) {
  resumeBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const fileUrl = 'assets/Ujjawal_Sharma_Resume.pdf';

    // 1️⃣ Open in new tab
    window.open(fileUrl, '_blank');

    // 2️⃣ Force download
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'Ujjawal_Kumar_Sharma_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

});