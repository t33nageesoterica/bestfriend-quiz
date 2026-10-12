(function () {
  /* บังคับใช้โทนสว่างพาสเทลเสมอ (ไม่ตามโหมดมืดของเครื่อง) */
  document.documentElement.setAttribute("data-theme", "light");

  const EMOJIS = ["💖", "💕", "🌸", "✨", "🧸", "🎀", "🍓", "⭐", "🦄", "🍭"];
  const CONFETTI = ["💖", "🎉", "✨", "🌸", "💕", "🎀", "⭐", "🧸", "🦄", "🍭"];

  /* ===== ฟอนต์ ===== */
  const font = document.createElement("link");
  font.rel = "stylesheet";
  font.href = "https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap";
  document.head.appendChild(font);

  /* ===== CSS ===== */
  const st = document.createElement("style");
  st.textContent = `
  :root{--ink:#5b3a72;--mute:#9a7fb0;--line:#ffd6e8}
  html,body{font-family:'Mali','Kanit',system-ui,sans-serif}
  body{
    color:var(--ink);min-height:100vh;
    background:linear-gradient(135deg,#ffd3ea,#e3d4ff,#cfeaff,#d6fff0,#fff1c9,#ffd3ea);
    background-size:400% 400%;
    animation:cuteBg 16s ease infinite;
  }
  @keyframes cuteBg{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

  /* ลูกบอลสีฟุ้งๆ ลอยอยู่ด้านหลัง */
  .cute-blob{position:fixed;border-radius:50%;filter:blur(55px);opacity:.55;z-index:0;pointer-events:none;
    animation:cuteDrift 14s ease-in-out infinite alternate}
  @keyframes cuteDrift{to{transform:translate(60px,-50px) scale(1.25)}}

  /* ดาวระยิบ */
  .cute-star{position:fixed;z-index:0;pointer-events:none;animation:cuteTwinkle 2.4s ease-in-out infinite}
  @keyframes cuteTwinkle{0%,100%{opacity:.15;transform:scale(.6) rotate(0)}50%{opacity:1;transform:scale(1.2) rotate(30deg)}}

  main{position:relative;z-index:2}

  /* การ์ด: ขอบรุ้งไหลวน + เงาฟุ้ง + โบว์มุมการ์ด */
  .card{
    position:relative;
    border:4px solid transparent !important;
    border-radius:32px !important;
    background:
      linear-gradient(#fffafd,#fffafd) padding-box,
      linear-gradient(90deg,#ff8ec7,#c49bff,#7fd0ff,#8ff0c8,#ffd37f,#ff8ec7) border-box !important;
    background-size:100% 100%,300% 100% !important;
    animation:cutePop .5s cubic-bezier(.3,1.6,.5,1),cuteBorder 6s linear infinite;
    box-shadow:0 10px 40px rgba(255,120,190,.35),0 0 0 6px rgba(255,255,255,.5) !important;
  }
  @keyframes cuteBorder{to{background-position:0 0,300% 0}}
  @keyframes cutePop{from{transform:scale(.85) translateY(20px);opacity:0}to{transform:none;opacity:1}}
  .card::before{content:"🎀";position:absolute;top:-18px;left:-8px;font-size:34px;transform:rotate(-22deg);
    filter:drop-shadow(0 3px 4px rgba(255,100,160,.4))}
  .card::after{content:"✨";position:absolute;bottom:-14px;right:-6px;font-size:28px;
    animation:cuteTwinkle 2s ease-in-out infinite}

  /* หัวข้อ + คะแนน แบบโฮโลแกรมรุ้ง */
  h1,.score{
    background:linear-gradient(90deg,#ff5fa8,#b57bff,#4fb8ff,#3fe0b0,#ffb84f,#ff5fa8) !important;
    background-size:300% 100% !important;
    -webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;
    animation:cuteText 5s linear infinite;
    filter:drop-shadow(0 3px 6px rgba(255,120,190,.35));
  }
  @keyframes cuteText{to{background-position:300% 0}}
  .score{font-size:5rem !important;animation:cuteText 5s linear infinite,cuteGlow 1.8s ease-in-out infinite}
  @keyframes cuteGlow{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  h2{color:#d94c93}

  /* ปุ่มลูกกวาดวุ้นเงา */
  .btn{
    position:relative;overflow:hidden;border:0 !important;border-radius:999px !important;
    color:#fff !important;font-weight:700;letter-spacing:.3px;
    background:linear-gradient(180deg,#ff9ad0 0%,#ff5fa8 55%,#e8408f 100%) !important;
    box-shadow:0 7px 0 #c72f78,0 14px 22px rgba(255,80,160,.4),inset 0 3px 0 rgba(255,255,255,.55) !important;
    text-shadow:0 2px 0 rgba(180,30,100,.5);
    transition:transform .12s,box-shadow .12s;
  }
  .btn::after{content:"";position:absolute;top:0;left:-80%;width:50%;height:100%;
    background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);
    transform:skewX(-20deg);animation:cuteShine 2.8s ease-in-out infinite}
  @keyframes cuteShine{0%{left:-80%}60%,100%{left:140%}}
  .btn:hover{transform:translateY(-3px)}
  .btn:active{transform:translateY(5px);box-shadow:0 2px 0 #c72f78,0 4px 10px rgba(255,80,160,.4),inset 0 3px 0 rgba(255,255,255,.55) !important}

  /* ตัวเลือก: เม็ดยาสีพาสเทลคนละสี */
  .opt{
    position:relative;border-radius:999px !important;border:3px solid #ffc2de !important;
    background:#fff !important;color:var(--ink) !important;font-weight:600;
    box-shadow:0 5px 0 #ffc2de,inset 0 2px 0 rgba(255,255,255,.9);
    transition:transform .15s,box-shadow .15s,background .15s;
  }
  .opt:nth-child(4n+2){border-color:#d4bdff !important;box-shadow:0 5px 0 #d4bdff}
  .opt:nth-child(4n+3){border-color:#b5e0ff !important;box-shadow:0 5px 0 #b5e0ff}
  .opt:nth-child(4n+4){border-color:#b9f2d8 !important;box-shadow:0 5px 0 #b9f2d8}
  .opt:hover{transform:translateY(-3px) scale(1.02) rotate(-.8deg);background:linear-gradient(90deg,#fff0f8,#f3ecff) !important}
  .opt:active{transform:translateY(4px);box-shadow:0 1px 0 #ffc2de}

  /* หลอดความคืบหน้าแบบลูกอมลายทาง */
  .bar{height:14px !important;background:#ffe8f3 !important;border:2px solid #ffc2de;box-shadow:inset 0 2px 4px rgba(255,120,190,.25)}
  .bar i{
    background:repeating-linear-gradient(45deg,#ff8ec7 0 12px,#ffb6da 12px 24px) !important;
    background-size:34px 34px;animation:cuteStripe 1s linear infinite;border-radius:99px;
  }
  @keyframes cuteStripe{to{background-position:34px 0}}

  /* ช่องกรอกชื่อ */
  input{border:3px solid #ffc2de !important;border-radius:999px !important;background:#fff !important;
    color:var(--ink) !important;text-align:center;font-weight:600;outline:none}
  input:focus{border-color:#ff5fa8 !important;box-shadow:0 0 0 5px rgba(255,95,168,.25),0 0 20px rgba(255,95,168,.35)}
  input::placeholder{color:#cfa9c4}

  /* ป้าย + ตัวโหลด */
  .badge{background:linear-gradient(90deg,#ff7ab8,#b57bff) !important;box-shadow:0 4px 0 #9a5be0,0 8px 14px rgba(181,123,255,.4);
    border-radius:999px;font-weight:700}
  .spin{border-color:#ffd6e8 !important;border-top-color:#ff5fa8 !important;border-right-color:#b57bff !important}

  .cute-bounce{display:inline-block;animation:cuteBounce 1.2s ease-in-out infinite;
    filter:drop-shadow(0 6px 8px rgba(255,80,160,.4))}
  @keyframes cuteBounce{0%,100%{transform:translateY(0) rotate(-6deg) scale(1)}50%{transform:translateY(-14px) rotate(6deg) scale(1.1)}}
  .cute-wiggle{animation:cuteWiggle 1.4s ease-in-out infinite}
  @keyframes cuteWiggle{0%,100%{transform:rotate(-4deg) scale(1)}50%{transform:rotate(4deg) scale(1.08)}}

  /* อีโมจิลอย / คอนเฟตติ / ประกาย */
  .cute-float{position:fixed;bottom:-40px;opacity:.6;pointer-events:none;z-index:1;animation:cuteFloat linear forwards}
  @keyframes cuteFloat{to{transform:translateY(-115vh) rotate(40deg);opacity:0}}
  .cute-confetti{position:fixed;top:-30px;pointer-events:none;z-index:9;animation:cuteFall linear forwards}
  @keyframes cuteFall{to{transform:translateY(112vh) rotate(540deg);opacity:.8}}
  .cute-spark{position:fixed;pointer-events:none;z-index:9;font-size:18px;animation:cuteSpark .8s ease-out forwards}
  @keyframes cuteSpark{to{transform:translate(var(--dx),var(--dy)) scale(.3);opacity:0}}
  `;
  document.head.appendChild(st);

  /* ===== ลูกบอลสีฟุ้ง ===== */
  [["#ff8ec7", "5vw", "8vh", 320],
   ["#b5a0ff", "70vw", "15vh", 380],
   ["#7fd0ff", "10vw", "65vh", 340],
   ["#8ff0c8", "75vw", "70vh", 300]].forEach(([c, x, y, s], i) => {
    const b = document.createElement("div");
    b.className = "cute-blob";
    b.style.cssText = `background:${c};left:${x};top:${y};width:${s}px;height:${s}px;animation-delay:${i * -3}s`;
    document.body.appendChild(b);
  });

  /* ===== ดาวระยิบ ===== */
  const starColors = ["#ff8ec7", "#c49bff", "#7fd0ff", "#ffd37f", "#ffffff"];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement("span");
    s.className = "cute-star";
    s.textContent = i % 3 ? "✦" : "✧";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.fontSize = 10 + Math.random() * 18 + "px";
    s.style.color = starColors[i % starColors.length];
    s.style.animationDelay = Math.random() * 2.4 + "s";
    document.body.appendChild(s);
  }

  /* ===== หัวใจใหญ่หน้าแรกเด้งดึ๋ง ===== */
  const heart = document.querySelector("#intro > div");
  if (heart) heart.classList.add("cute-bounce");

  /* ===== อีโมจิลอย ===== */
  function floatOne() {
    const e = document.createElement("span");
    e.className = "cute-float";
    e.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = 14 + Math.random() * 24 + "px";
    e.style.animationDuration = 7 + Math.random() * 6 + "s";
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 13000);
  }
  setInterval(floatOne, 700);

  /* ===== คลิก/แตะแล้วมีประกายพุ่ง ===== */
  function sparkle(x, y) {
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("span");
      s.className = "cute-spark";
      s.textContent = ["✨", "💖", "⭐", "🌸"][i % 4];
      s.style.left = x + "px";
      s.style.top = y + "px";
      const ang = Math.random() * Math.PI * 2;
      const dist = 35 + Math.random() * 50;
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  }
  document.addEventListener("pointerdown", (e) => sparkle(e.clientX, e.clientY));

  /* ===== ตอนขึ้นผล: คอนเฟตติ + นับถึง 100% ===== */
  function confetti() {
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const c = document.createElement("span");
        c.className = "cute-confetti";
        c.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
        c.style.left = Math.random() * 100 + "vw";
        c.style.fontSize = 16 + Math.random() * 22 + "px";
        c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5500);
      }, i * 50);
    }
  }

  function countUp() {
    const el = document.getElementById("score");
    if (!el) return;
    let n = 0;
    const t = setInterval(() => {
      n += 4;
      if (n >= 100) { n = 100; clearInterval(t); }
      el.textContent = n + "%";
    }, 30);
  }

  const result = document.getElementById("result");
  if (result) {
    new MutationObserver(() => {
      if (!result.classList.contains("hide")) {
        confetti();
        countUp();
        const badge = result.querySelector(".badge");
        if (badge) badge.classList.add("cute-wiggle");
      }
    }).observe(result, { attributes: true, attributeFilter: ["class"] });
  }
})();
