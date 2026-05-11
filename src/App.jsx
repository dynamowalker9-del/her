// ============================================================
// 💌 ROMANTIC APOLOGY WEBSITE
// ============================================================
// CUSTOMIZE THESE:
//   - HER_NAME: Replace with her actual name
//   - TIMELINE_EVENTS: Add your real memories/dates
//   - CONFESSIONS: Add your real heartfelt messages
//   - HERO_SUBTEXT: Personalize the subtext
//   - Photo sections: Upload real photos where indicated
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sheIsEverythingPhoto from "./assets/she-is-everything.jpeg";
import memoryOnePhoto from "./assets/memory-1.jpeg";
import memoryTwoPhoto from "./assets/memory-2.jpeg";
import ourSong from "./assets/our-song.mp3";

// ── CONFIGURATION ────────────────────────────────────────────
const HER_NAME = "SUBHUUUUU"; // 💡 Replace with her name

const TIMELINE_EVENTS = [
  { icon: "✨", date: "The Day We Met", title: "First Hello", desc: "I still remember the first text message from you like you first texted me and i was likeee what but that was one of the best thing happen to me" },
  { icon: "🌙", date: "Our First Late Night", title: "3AM Conversations", desc: "We talked about everything and nothing. I knew then you were different." },
  { icon: "🍦", date: "Our First Ice Cream Date", title: "Just Us Two", desc: "That tiny café where time felt like it belonged only to us." },
  { icon: "🤝", date: "The First Touch of Yours", title: "When You Held My Hand", desc: "Ya just like the first message , here also you are the one who took the first step. That day I was nervous and you hold my hand , I was scared that what you will think of me....BUT... again you took the chance and comforted me ." },
  { icon: "🌸", date: "A Random Day", title: "You Made It Special", desc: "You have this gift — making ordinary moments feel like magic." },
  { icon: "💔", date: "The Fight", title: "Where I Failed You", desc: "I usually talk and share so much, while you share a little less. So when you finally tried to say something that day, I should have listened with my whole heart. Instead, I ignored it, and I understand why that hurt you so much. You deserved my attention, my patience, and my care in that moment." },
];

const CONFESSIONS = [
  { front: "I Should Have Listened", back: "You do not open up as easily as I do, so when you finally tried to share something, I should have treated it like something delicate. I should have put everything aside and listened to you with my whole heart." },
  { front: "Your Words Matter", back: "Even when you say only a little, it means a lot. I am sorry for making you feel like your words could be ignored, because your thoughts, your feelings, and your silence all matter to me." },
  { front: "I Talk Too Much Sometimes", back: "I know I can fill the space with my own stories and feelings. But love is not only speaking, it is knowing when to stop, look at you, and make room for what your heart is trying to say." },
  { front: "I Hurt You There", back: "That day, you were trying to tell me something, and I failed you in a small moment that was actually big. I understand why it hurt, because being ignored by someone you care about feels lonely." },
  { front: "You Deserved Patience", back: "You deserved softness from me. You deserved the kind of patience that makes you feel safe enough to speak again, not the kind of carelessness that makes you regret opening up." },
  { front: "I Will Do Better", back: "I do not want this apology to be only pretty words. I want to become someone who notices when you are trying, listens when you speak, and never makes your heart feel alone beside me." },
];

const FLOATING_NOTES = [
  "You deserved patience ✨", "I'm so sorry 💜", "You are my favorite person", "Please forgive me 🌸",
  "You are enough 🌙", "I hear you now", "You are so loved 💫", "I was wrong ♥",
];

// ── FONTS (loaded via @import in style tag) ──────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&family=Dancing+Script:wght@400;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --pink: #f472b6;
      --rose: #fb7185;
      --purple: #a78bfa;
      --lavender: #c4b5fd;
      --blue: #60a5fa;
      --midnight: #0a0010;
      --deep: #0f0020;
      --glass: rgba(255,255,255,0.04);
      --glass-border: rgba(255,255,255,0.08);
      --glow-pink: 0 0 40px rgba(244,114,182,0.35);
      --glow-purple: 0 0 40px rgba(167,139,250,0.35);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--midnight);
      color: #f0e6ff;
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
      cursor: none;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(var(--purple), var(--pink)); border-radius: 2px; }

    .serif { font-family: 'Cormorant Garamond', serif; }
    .script { font-family: 'Dancing Script', cursive; }

    .glass {
      background: var(--glass);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--glass-border);
    }

    .glow-text-pink { text-shadow: 0 0 30px rgba(244,114,182,0.7), 0 0 60px rgba(244,114,182,0.3); }
    .glow-text-purple { text-shadow: 0 0 30px rgba(167,139,250,0.7); }

    @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(3deg)} }
    @keyframes pulse-glow { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
    @keyframes drift { 0%{transform:translateX(-10px) translateY(0)} 50%{transform:translateX(10px) translateY(-15px)} 100%{transform:translateX(-10px) translateY(0)} }
    @keyframes twinkle { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
    @keyframes petal-fall {
      0% { transform: translateY(-100px) rotate(0deg) translateX(0); opacity: 0; }
      10% { opacity: 0.7; }
      90% { opacity: 0.4; }
      100% { transform: translateY(110vh) rotate(720deg) translateX(80px); opacity: 0; }
    }
    @keyframes heart-float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.1)} }
    @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes typewriter { from{width:0} to{width:100%} }
    @keyframes blink { 0%,100%{border-color:transparent} 50%{border-color:var(--pink)} }

    .animated-gradient {
      background: linear-gradient(-45deg, #1a0030, #0f001a, #200040, #100025, #0a0018);
      background-size: 400% 400%;
      animation: gradient-shift 24s ease infinite;
    }

    .btn-primary {
      background: linear-gradient(135deg, rgba(244,114,182,0.2), rgba(167,139,250,0.2));
      border: 1px solid rgba(244,114,182,0.4);
      color: #f0e6ff;
      padding: 14px 36px;
      border-radius: 50px;
      font-family: 'Jost', sans-serif;
      font-size: 0.9rem;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.4s ease;
      backdrop-filter: blur(6px);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, rgba(244,114,182,0.4), rgba(167,139,250,0.4));
      border-color: rgba(244,114,182,0.8);
      box-shadow: var(--glow-pink), inset 0 0 20px rgba(244,114,182,0.1);
      transform: translateY(-2px);
    }

    .section-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(167,139,250,0.3), rgba(244,114,182,0.3), transparent);
      margin: 0 auto;
      width: 60%;
    }

    .flip-card { perspective: 1000px; cursor: pointer; }
    .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); transform-style: preserve-3d; }
    .flip-card-inner.flipped { transform: rotateY(180deg); }
    .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .flip-card-back { transform: rotateY(180deg); }

    .lightbox-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(6px);
    }

    .music-bar {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      z-index: 100; width: 90%; max-width: 400px;
    }

    .star { position: absolute; border-radius: 50%; pointer-events: none; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.001ms !important;
      }
    }

    @media (max-width: 768px) {
      .section-divider { width: 80%; }
    }
  `}</style>
);

// ── CUSTOM CURSOR ────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    let frameId;
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12;
      trail.current.y += (pos.current.y - trail.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", width: 12, height: 12, borderRadius: "50%",
        background: "radial-gradient(circle, #f472b6, #a78bfa)",
        left: 0, top: 0, transform: "translate3d(-100px,-100px,0)", pointerEvents: "none", zIndex: 99999,
        boxShadow: "0 0 15px rgba(244,114,182,0.8)", transition: "transform 0.1s ease",
        willChange: "transform",
      }} />
      <div ref={trailRef} style={{
        position: "fixed", width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(167,139,250,0.4)",
        left: 0, top: 0, transform: "translate3d(-100px,-100px,0)", pointerEvents: "none", zIndex: 99998,
        transition: "width 0.2s, height 0.2s",
        willChange: "transform",
      }} />
    </>
  );
};

// ── PARTICLES / STARS ────────────────────────────────────────
const StarField = ({ count = 80 }) => {
  const [stars] = useState(() =>
    Array.from({ length: Math.min(count, window.innerWidth < 768 ? 28 : 55) }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      hue: 260 + Math.random() * 60,
      secret: i === 7, // secret star
    }))
  );
  const [secretRevealed, setSecretRevealed] = useState(false);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          onClick={s.secret ? () => setSecretRevealed(true) : undefined}
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            background: s.secret ? "#f472b6" : `hsl(${s.hue}, 80%, 80%)`,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            pointerEvents: s.secret ? "all" : "none",
            cursor: s.secret ? "pointer" : "default",
            boxShadow: s.secret ? "0 0 8px #f472b6" : "none",
            zIndex: s.secret ? 5 : 1,
          }}
        />
      ))}
      <AnimatePresence>
        {secretRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)",
              pointerEvents: "all", cursor: "pointer",
            }}
            onClick={() => setSecretRevealed(false)}
          >
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 60, marginBottom: 24 }}>🌟</div>
              <p className="serif glow-text-pink" style={{ fontSize: "clamp(1.4rem,4vw,2.2rem)", color: "#f472b6", marginBottom: 16 }}>
                You found the secret star.
              </p>
              <p style={{ color: "#c4b5fd", maxWidth: 400, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>
                {/* 💡 Replace with your secret message */}
                "I think about you in quiet moments — in the seconds between breaths, in the space between songs. You are my favorite thought."
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", marginTop: 24, fontSize: "0.8rem", letterSpacing: 2 }}>tap anywhere to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── FLOATING PETALS ──────────────────────────────────────────
const FloatingPetals = () => {
  const [petals] = useState(() =>
    Array.from({ length: window.innerWidth < 768 ? 4 : 7 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 16,
      size: Math.random() * 10 + 7,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
      {petals.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, top: -60,
          width: p.size, height: p.size,
          background: `radial-gradient(circle, rgba(244,114,182,0.7), rgba(167,139,250,0.4))`,
          borderRadius: "50% 0 50% 0",
          animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
          willChange: "transform",
        }} />
      ))}
    </div>
  );
};

// ── FLOATING LOVE NOTES ──────────────────────────────────────
const FloatingNotes = () => {
  const [notes] = useState(() =>
    FLOATING_NOTES.slice(0, window.innerWidth < 768 ? 3 : 5).map((text, i) => ({
      text, id: i,
      x: 5 + Math.random() * 85,
      y: 10 + Math.random() * 80,
      delay: i * 1.2,
      duration: Math.random() * 6 + 8,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {notes.map((n) => (
        <motion.div
          key={n.id}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: n.duration, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <span style={{
            fontSize: "0.65rem", letterSpacing: 1, color: "rgba(196,181,253,0.6)",
            fontFamily: "'Dancing Script', cursive", whiteSpace: "nowrap",
          }}>{n.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

// ── SECTION WRAPPER ──────────────────────────────────────────
const Section = ({ id, children, style = {} }) => (
  <section id={id} style={{ position: "relative", padding: "100px 24px", maxWidth: 1100, margin: "0 auto", contentVisibility: "auto", containIntrinsicSize: "1px 700px", ...style }}>
    {children}
  </section>
);

// ── HERO SECTION ─────────────────────────────────────────────
const Hero = () => {
  const [typed, setTyped] = useState("");
  const full = `To ${HER_NAME}, The Most Beautiful Soul I Ever Met`;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, [full]);

  return (
    <div className="animated-gradient" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <StarField count={48} />
      <FloatingNotes />

      {/* Ambient glow orbs */}
      {[
        { w: 360, h: 360, left: "10%", top: "20%", c: "rgba(167,139,250,0.08)" },
        { w: 300, h: 300, right: "5%", bottom: "15%", c: "rgba(244,114,182,0.07)" },
      ].map((orb, i) => (
        <div key={i} style={{
          position: "absolute", width: orb.w, height: orb.h,
          borderRadius: "50%", background: orb.c,
          left: orb.left, right: orb.right, top: orb.top, bottom: orb.bottom,
          filter: "blur(38px)", animation: `drift ${14 + i * 4}s ease-in-out infinite`,
        }} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: "center", padding: "0 20px", position: "relative", zIndex: 3 }}
      >
        {/* Script intro */}
        <motion.p
          className="script"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ fontSize: "clamp(1rem,3vw,1.4rem)", color: "rgba(196,181,253,0.7)", marginBottom: 20 }}
        >
          A heartfelt apology from someone who cares deeply...
        </motion.p>

        {/* Main headline - typewriter */}
        <h1 className="serif glow-text-pink" style={{
          fontSize: "clamp(2rem,6vw,4.5rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "#f0e6ff", lineHeight: 1.2, marginBottom: 32,
          minHeight: "2.5em",
        }}>
          {typed}
          <span style={{ borderRight: "2px solid #f472b6", animation: "blink 1s infinite", marginLeft: 2 }} />
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          style={{
            maxWidth: 540, margin: "0 auto 48px",
            color: "rgba(240,230,255,0.6)", lineHeight: 1.9,
            fontSize: "clamp(0.9rem,2vw,1.05rem)", fontWeight: 300,
          }}
        >
          {/* 💡 Replace this subtext with your personal message */}
          I said things I wish I could take back. I was cold when I should have been warm, loud when I should have listened. This is me — trying to reach you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 0.8, type: "spring" }}
        >
          <a href="#apology">
            <button className="btn-primary">Please Hear Me Out ↓</button>
          </a>
        </motion.div>

        {/* Floating hearts */}
        {["♥","♡","♥"].map((h, i) => (
          <motion.span key={i} style={{
            position: "absolute", fontSize: "clamp(1rem,2vw,1.5rem)",
            color: `rgba(244,114,182,${0.2 + i * 0.1})`,
            left: `${15 + i * 30}%`, top: `${20 + i * 20}%`,
            animation: `heart-float ${3 + i}s ease-in-out infinite`,
          }}>{h}</motion.span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 3 }}
      >
        <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(167,139,250,0.6), transparent)", margin: "0 auto" }} />
      </motion.div>
    </div>
  );
};

// ── APOLOGY SECTION ──────────────────────────────────────────
const ApologySection = () => {
  const paragraphs = [
    // 💡 Replace these apology paragraphs with your own words
    `I am truly, deeply sorry. Not the kind of sorry that gets said to end an argument — but the kind that comes from sitting alone with your thoughts and realizing, with a weight in your chest, that you hurt someone you genuinely care about. That someone is you, ${HER_NAME}.`,
    `I wasn't listening. I was there in body but not in spirit — and that's a failure I own entirely. When you spoke, you deserved my full, undivided attention. You deserved someone who made you feel heard, not talked over. I failed you in that moment, and I hate that.`,
    `I was rude. My words were sharper than they ever should have been — especially with you. You have always deserved patience and kindness from me. You have always deserved gentleness. You are someone who gives so much light, and I cast a shadow instead. I am so sorry.`,
    `You mean more to me than I've let on. Your laughter, your presence, your way of caring about people — it quietly fills every room. And I was careless with that. I won't be again. I promise you that.`,
  ];

  return (
    <div id="apology" style={{ background: "linear-gradient(to bottom, var(--midnight), #0d0025)" }}>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="script" style={{ color: "#f472b6", fontSize: "1.1rem", marginBottom: 12 }}>From the bottom of my heart</p>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#f0e6ff", fontStyle: "italic" }}>
            I Am So <span style={{ color: "#f472b6" }}>Sorry</span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          {/* Decorative quote mark */}
          <div className="serif" style={{
            position: "absolute", top: -60, left: -20,
            fontSize: 200, color: "rgba(167,139,250,0.05)",
            lineHeight: 1, userSelect: "none",
          }}>"</div>

          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              viewport={{ once: true }}
              style={{
                color: "rgba(240,230,255,0.8)",
                lineHeight: 2, marginBottom: 28,
                fontSize: "clamp(0.95rem,2vw,1.08rem)",
                fontWeight: 300, borderLeft: i === 0 ? "2px solid rgba(244,114,182,0.4)" : "none",
                paddingLeft: i === 0 ? 20 : 0,
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </Section>
      <div className="section-divider" />
    </div>
  );
};

// ── HER BEAUTY SECTION ───────────────────────────────────────
const HerBeautySection = () => {
  const [photo, setPhoto] = useState(sheIsEverythingPhoto);
  const fileRef = useRef();

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const traits = [
    { icon: "✨", label: "Her Smile", desc: "It doesn't just light up her face — it lights up the entire space around her. Involuntary. Genuine. Irresistible." },
    { icon: "🌙", label: "Her Eyes", desc: "There's a whole universe in there. Curious, deep, and impossibly warm. Looking at them feels like coming home." },
    { icon: "🌸", label: "Her Kindness", desc: "She gives without keeping score. She cares without needing to say it. It's one of the rarest things I've ever known." },
    { icon: "🎵", label: "Her Laugh", desc: "The most beautiful sound. Completely unfiltered, completely her. I'd do a lot to hear it every single day." },
    { icon: "💫", label: "Her Presence", desc: "When she enters a room, everything shifts slightly. The energy softens. People smile a little easier. She doesn't know she does this." },
    { icon: "🌿", label: "Her Soul", desc: "Thoughtful, layered, wonderfully complex. She feels everything deeply and loves even deeper. She is extraordinary." },
    { icon: "🙏", label: "She Is Devi", desc: "She is everything, a beautiful cute devi for me. She is my protector, my guider, my backbone, and a support for me." },
  ];

  return (
    <div style={{ background: "linear-gradient(to bottom, #0d0025, #0a001a)" }}>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="script" style={{ color: "#a78bfa", fontSize: "1.1rem", marginBottom: 12 }}>And still, through everything</p>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#f0e6ff", fontStyle: "italic" }}>
            She Is <span style={{ color: "#a78bfa" }}>Everything</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "start" }}>
          {/* Photo upload */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ position: "relative" }}
          >
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                aspectRatio: "3/4", borderRadius: 24, overflow: "hidden",
                cursor: "pointer", position: "relative",
                background: photo ? "none" : "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(244,114,182,0.1))",
                border: "1px solid rgba(167,139,250,0.3)",
                boxShadow: "0 0 60px rgba(167,139,250,0.15), inset 0 0 30px rgba(167,139,250,0.05)",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 80px rgba(167,139,250,0.3), inset 0 0 40px rgba(167,139,250,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 60px rgba(167,139,250,0.15), inset 0 0 30px rgba(167,139,250,0.05)"}
            >
              {photo ? (
                <img src={photo} alt="Her" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 40, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>📸</div>
                  <p className="serif" style={{ color: "rgba(196,181,253,0.7)", fontSize: "1.1rem", fontStyle: "italic" }}>Place her photo here</p>
                  <p style={{ color: "rgba(196,181,253,0.4)", fontSize: "0.8rem", marginTop: 8, letterSpacing: 1 }}>click to upload</p>
                </div>
              )}
              {/* Glow border animation */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 24,
                background: "linear-gradient(45deg, transparent, rgba(167,139,250,0.08), transparent)",
                animation: "pulse-glow 3s ease-in-out infinite",
              }} />
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
          </motion.div>

          {/* Traits */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {traits.map((t, i) => (
              <motion.div
                key={i}
                className="glass"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 6, borderColor: "rgba(167,139,250,0.3)" }}
                style={{ borderRadius: 14, padding: "18px 22px", border: "1px solid rgba(167,139,250,0.12)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <p style={{ color: "#c4b5fd", fontWeight: 400, fontSize: "0.85rem", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{t.label}</p>
                    <p style={{ color: "rgba(240,230,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      <div className="section-divider" />
    </div>
  );
};

// ── MEMORIES GALLERY ─────────────────────────────────────────
const MemoriesGallery = () => {
  const [photos, setPhotos] = useState([
    { id: "memory-1", url: memoryOnePhoto, caption: "A memory I hold close" },
    { id: "memory-2", url: memoryTwoPhoto, caption: "Another moment I never want to lose" },
  ]);
  const [lightbox, setLightbox] = useState(null);
  const fileRef = useRef();

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((f, i) => ({
      id: Date.now() + i,
      url: URL.createObjectURL(f),
      caption: `A memory I hold close 💜`, // 💡 Replace captions
    }));
    setPhotos(p => [...p, ...newPhotos]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    const newPhotos = files.map((f, i) => ({
      id: Date.now() + i,
      url: URL.createObjectURL(f),
      caption: `A memory I hold close 💜`,
    }));
    setPhotos(p => [...p, ...newPhotos]);
  };

  const placeholders = [
    "Our first memory ✨", "A moment I cherish 🌙", "You, always you 🌸",
    "The day I knew 💫", "Forever in my heart 💜",
  ];

  return (
    <div style={{ background: "linear-gradient(to bottom, #0a001a, #0f001f)" }}>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="script" style={{ color: "#f472b6", fontSize: "1.1rem", marginBottom: 12 }}>Every moment with you</p>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#f0e6ff", fontStyle: "italic" }}>
            Our <span style={{ color: "#f472b6" }}>Memories</span>
          </h2>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          whileHover={{ borderColor: "rgba(244,114,182,0.5)" }}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          style={{
            border: "1px dashed rgba(244,114,182,0.25)", borderRadius: 20,
            padding: "40px 20px", textAlign: "center", cursor: "pointer",
            marginBottom: 48, transition: "all 0.3s ease",
            background: "rgba(244,114,182,0.03)",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>🖼️</div>
          <p className="serif" style={{ color: "rgba(240,230,255,0.5)", fontStyle: "italic" }}>Drop your memories here or click to upload</p>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} />
        </motion.div>

        {/* Gallery grid */}
        <div style={{ columns: "3 200px", gap: 16 }}>
          {/* Placeholder cards */}
          {photos.length === 0 && placeholders.map((caption, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                breakInside: "avoid", marginBottom: 16, borderRadius: 16, overflow: "hidden",
                aspectRatio: i % 3 === 0 ? "3/4" : i % 2 === 0 ? "1/1" : "4/3",
                background: `linear-gradient(${135 + i * 30}deg, rgba(167,139,250,0.1), rgba(244,114,182,0.1))`,
                border: "1px solid rgba(167,139,250,0.15)", display: "flex",
                alignItems: "flex-end", padding: 16, cursor: "pointer",
              }}
            >
              <p className="script" style={{ color: "rgba(196,181,253,0.5)", fontSize: "0.9rem" }}>{caption}</p>
            </motion.div>
          ))}

          {/* Uploaded photos */}
          {photos.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ breakInside: "avoid", marginBottom: 16, borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative" }}
              onClick={() => setLightbox(p)}
              whileHover={{ scale: 1.02 }}
            >
              <img src={p.url} alt="" style={{ width: "100%", display: "block", borderRadius: 16 }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 16px 16px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.6))", borderRadius: "0 0 16px 16px",
              }}>
                <p className="script" style={{ color: "rgba(240,230,255,0.8)", fontSize: "0.9rem" }}>{p.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.img
                src={lightbox.url}
                alt=""
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 16, boxShadow: "0 0 80px rgba(167,139,250,0.2)" }}
              />
              <p className="script" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", color: "rgba(240,230,255,0.6)", fontSize: "1.1rem", textAlign: "center" }}>
                {lightbox.caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
      <div className="section-divider" />
    </div>
  );
};

// ── TIMELINE ─────────────────────────────────────────────────
const Timeline = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ background: "linear-gradient(to bottom, #0f001f, #0a001a)" }}>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="script" style={{ color: "#a78bfa", fontSize: "1.1rem", marginBottom: 12 }}>Every step of the way</p>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#f0e6ff", fontStyle: "italic" }}>
            Timeline of <span style={{ color: "#a78bfa" }}>Us</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          {/* Center line */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.3), rgba(244,114,182,0.3), transparent)",
            transform: "translateX(-50%)",
          }} />

          {TIMELINE_EVENTS.map((event, i) => {
            const isLeft = i % 2 === 0;
            const isOpen = expanded === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start",
                  paddingRight: isLeft ? "calc(50% + 30px)" : 0,
                  paddingLeft: isLeft ? 0 : "calc(50% + 30px)",
                  marginBottom: 40, position: "relative",
                }}
              >
                {/* Dot */}
                <div style={{
                  position: "absolute", left: "50%", top: 20, width: 14, height: 14,
                  borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                  transform: "translateX(-50%)", boxShadow: "0 0 15px rgba(167,139,250,0.5)",
                  zIndex: 2,
                }} />

                {/* Card */}
                <motion.div
                  className="glass"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setExpanded(isOpen ? null : i)}
                  style={{
                    borderRadius: 16, padding: "20px 22px", cursor: "pointer",
                    border: `1px solid ${isOpen ? "rgba(244,114,182,0.3)" : "rgba(167,139,250,0.12)"}`,
                    transition: "border-color 0.3s ease", maxWidth: "90%",
                    boxShadow: isOpen ? "0 0 30px rgba(244,114,182,0.1)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{event.icon}</span>
                    <span style={{ color: "rgba(196,181,253,0.5)", fontSize: "0.75rem", letterSpacing: 1, textTransform: "uppercase" }}>{event.date}</span>
                  </div>
                  <p className="serif" style={{ color: "#f0e6ff", fontSize: "1.1rem", fontStyle: "italic", marginBottom: 4 }}>{event.title}</p>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ color: "rgba(240,230,255,0.65)", fontSize: "0.88rem", lineHeight: 1.7, marginTop: 10, fontWeight: 300, overflow: "hidden" }}
                      >
                        {event.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p style={{ color: "rgba(196,181,253,0.3)", fontSize: "0.7rem", marginTop: 8, letterSpacing: 1 }}>
                    {isOpen ? "▲ collapse" : "▼ expand"}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Section>
      <div className="section-divider" />
    </div>
  );
};

// ── FLIP CARDS — THINGS I NEVER SAID ────────────────────────
const ThingsNeverSaid = () => {
  const [flipped, setFlipped] = useState({});

  return (
    <div style={{ background: "linear-gradient(to bottom, #0a001a, #0d001e)" }}>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="script" style={{ color: "#f472b6", fontSize: "1.1rem", marginBottom: 12 }}>Things I should have said sooner</p>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#f0e6ff", fontStyle: "italic" }}>
            Things I Never Said <span style={{ color: "#f472b6" }}>Properly</span>
          </h2>
          <p style={{ color: "rgba(196,181,253,0.4)", marginTop: 12, letterSpacing: 1, fontSize: "0.8rem" }}>tap each card to reveal</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {CONFESSIONS.map((card, i) => (
            <motion.div
              key={i}
              className="flip-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ height: 200 }}
              onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
            >
              <div className={`flip-card-inner ${flipped[i] ? "flipped" : ""}`} style={{ height: "100%" }}>
                {/* Front */}
                <div
                  className="flip-card-front glass"
                  style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(244,114,182,0.1))",
                    border: "1px solid rgba(244,114,182,0.2)",
                    flexDirection: "column", gap: 12,
                  }}
                >
                  <span style={{ fontSize: 32 }}>💌</span>
                  <p className="serif" style={{ color: "#f0e6ff", fontSize: "1.3rem", fontStyle: "italic", textAlign: "center" }}>{card.front}</p>
                  <p style={{ color: "rgba(196,181,253,0.4)", fontSize: "0.7rem", letterSpacing: 1 }}>tap to open</p>
                </div>
                {/* Back */}
                <div
                  className="flip-card-back"
                  style={{
                    background: "linear-gradient(135deg, rgba(244,114,182,0.15), rgba(167,139,250,0.15))",
                    border: "1px solid rgba(167,139,250,0.3)",
                    padding: "24px 20px", textAlign: "center",
                  }}
                >
                  <p style={{ color: "rgba(240,230,255,0.82)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>{card.back}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <div className="section-divider" />
    </div>
  );
};

// ── MUSIC PLAYER ─────────────────────────────────────────────
const MusicPlayer = () => {
  const [tracks, setTracks] = useState([
    { name: "Play it here", url: ourSong },
  ]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const fileRef = useRef();
  const hasAutoPlayedRef = useRef(false);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newTracks = files.map(f => ({ name: f.name.replace(/\.[^.]+$/, ""), url: URL.createObjectURL(f) }));
    setTracks(t => [...t, ...newTracks]);
  };

  const toggle = () => {
    if (!audioRef.current?.src) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(p => !p);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    a.addEventListener("timeupdate", onTime);
    return () => a.removeEventListener("timeupdate", onTime);
  }, []);

  useEffect(() => {
    const playOnFirstScroll = () => {
      const a = audioRef.current;
      if (hasAutoPlayedRef.current || !a?.src || window.scrollY < 8) return;

      a.play()
        .then(() => {
          hasAutoPlayedRef.current = true;
          setPlaying(true);
          window.removeEventListener("scroll", playOnFirstScroll);
          window.removeEventListener("wheel", playOnFirstScroll);
          window.removeEventListener("touchmove", playOnFirstScroll);
        })
        .catch(() => {
          // Some browsers still require a direct tap; the play button remains as fallback.
        });
    };

    window.addEventListener("scroll", playOnFirstScroll, { passive: true });
    window.addEventListener("wheel", playOnFirstScroll, { passive: true });
    window.addEventListener("touchmove", playOnFirstScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", playOnFirstScroll);
      window.removeEventListener("wheel", playOnFirstScroll);
      window.removeEventListener("touchmove", playOnFirstScroll);
    };
  }, []);

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = pct * audioRef.current.duration;
    }
  };

  return (
    <div className="music-bar">
      <audio ref={audioRef} src={tracks[current]?.url || undefined} onEnded={() => setPlaying(false)} />
      <motion.div
        className="glass"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, type: "spring" }}
        style={{
          borderRadius: 20, padding: "16px 20px",
          border: "1px solid rgba(244,114,182,0.2)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(244,114,182,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Music icon */}
          <motion.div
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #a78bfa, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, flexShrink: 0,
            }}
          >🎵</motion.div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "#f0e6ff", fontSize: "0.8rem", fontWeight: 400, truncate: "true", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {tracks[current]?.name || "No track"}
            </p>
            {/* Progress bar */}
            <div
              onClick={seek}
              style={{
                height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2,
                marginTop: 6, cursor: "pointer", position: "relative",
              }}
            >
              <div style={{
                width: `${progress}%`, height: "100%",
                background: "linear-gradient(to right, #a78bfa, #f472b6)",
                borderRadius: 2, transition: "width 0.3s",
              }} />
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={toggle}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(244,114,182,0.3), rgba(167,139,250,0.3))",
                border: "1px solid rgba(244,114,182,0.4)", color: "#f0e6ff",
                cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >{playing ? "⏸" : "▶"}</button>
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(196,181,253,0.6)", cursor: "pointer", fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title="Add song"
            >+</button>
          </div>
          <input ref={fileRef} type="file" accept="audio/*" multiple onChange={handleUpload} style={{ display: "none" }} />
        </div>

        {/* Playlist */}
        {tracks.length > 1 && (
          <div style={{ marginTop: 12, maxHeight: 100, overflowY: "auto" }}>
            {tracks.map((t, i) => (
              <div
                key={i}
                onClick={() => { setCurrent(i); setPlaying(false); }}
                style={{
                  padding: "5px 8px", borderRadius: 8, cursor: "pointer",
                  background: current === i ? "rgba(167,139,250,0.15)" : "transparent",
                  color: current === i ? "#c4b5fd" : "rgba(240,230,255,0.4)",
                  fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  transition: "all 0.2s ease",
                }}
              >{t.name}</div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ── FINAL MESSAGE ─────────────────────────────────────────────
const FinalMessage = () => (
  <div style={{ background: "linear-gradient(to bottom, #0d001e, #0a0010)", position: "relative", overflow: "hidden" }}>
    <StarField count={45} />
    <Section style={{ textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <p className="script" style={{ color: "#f472b6", fontSize: "1.2rem", marginBottom: 20 }}>And after everything...</p>
        <h2 className="serif glow-text-pink" style={{
          fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 300,
          fontStyle: "italic", color: "#f0e6ff", lineHeight: 1.3, marginBottom: 40, maxWidth: 700, margin: "0 auto 40px",
        }}>
          {/* 💡 Replace with your message */}
          "No fight could ever make me stop caring about you."
        </h2>
        <p style={{
          maxWidth: 560, margin: "0 auto 48px",
          color: "rgba(240,230,255,0.65)", lineHeight: 2,
          fontSize: "clamp(0.95rem,2vw,1.05rem)", fontWeight: 300,
        }}>
          {/* 💡 Replace with your words */}
          You are not just someone I know. You are someone who changed what things feel like. The world is warmer, softer, more interesting — because of you. I don't want to lose that. I don't want to lose you.
        </p>

        {/* Ambient hearts */}
        {["♥", "♡", "♥", "♡", "♥"].map((h, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, delay: i * 0.8, repeat: Infinity }}
            style={{
              position: "absolute", fontSize: `${1 + i * 0.4}rem`,
              color: i % 2 === 0 ? "rgba(244,114,182,0.3)" : "rgba(167,139,250,0.3)",
              left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 15}%`,
            }}
          >{h}</motion.span>
        ))}
      </motion.div>
    </Section>
  </div>
);

// ── ENDING SCREEN ─────────────────────────────────────────────
const EndingScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [floatingHearts] = useState(() =>
    Array.from({ length: window.innerWidth < 768 ? 6 : 9 }, (_, i) => ({
      id: i,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 10,
      left: Math.random() * 100,
      fontSize: 0.8 + Math.random() * 1.5,
      color: Math.random() > 0.5 ? "244,114,182" : "167,139,250",
      symbol: Math.random() > 0.5 ? "♥" : "✦",
    }))
  );

  return (
    <div className="animated-gradient" style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <StarField count={50} />

      {/* Floating hearts animation */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 0.6, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            fontSize: `${heart.fontSize}rem`,
            color: `rgba(${heart.color},0.5)`,
          }}
        >
          {heart.symbol}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
        viewport={{ once: true }}
        style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 3 }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "clamp(3rem,8vw,6rem)", marginBottom: 32 }}
        >
          💜
        </motion.div>

        <p className="script" style={{ color: "rgba(196,181,253,0.6)", fontSize: "1.1rem", marginBottom: 16 }}>with all the love I have</p>

        <h2 className="serif glow-text-purple" style={{
          fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 300,
          color: "#f0e6ff", fontStyle: "italic", marginBottom: 20,
        }}>
          You deserve every apology I can give
        </h2>

        <p style={{
          maxWidth: 480, margin: "0 auto 48px",
          color: "rgba(240,230,255,0.5)", lineHeight: 1.9,
          fontWeight: 300, fontSize: "clamp(0.9rem,2vw,1rem)",
        }}>
          {/* 💡 Replace with your closing words */}
          I won't ask you to forget. I just ask that you let me be better — for you, for us. You are worth every effort I have.
        </p>

        <AnimatePresence>
          {!clicked ? (
            <motion.div exit={{ opacity: 0, scale: 0 }}>
              <button className="btn-primary" onClick={() => setClicked(true)}>
                Can We Start Again? 💜
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: 60, marginBottom: 16, animation: "float 2s ease-in-out infinite" }}>🌸</div>
              <p className="serif glow-text-pink" style={{ fontSize: "clamp(1.2rem,3vw,2rem)", color: "#f472b6", fontStyle: "italic" }}>
                Thank you for reading this.
              </p>
              <p style={{ color: "rgba(240,230,255,0.5)", marginTop: 12, fontWeight: 300 }}>
                Always yours. Always sorry. Always caring. 💜
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ── LOADING SCREEN ────────────────────────────────────────────
const LoadingScreen = ({ onDone }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 700);
    const t2 = setTimeout(onDone, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <motion.div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#0a0010", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        transition: "opacity 0.6s ease", opacity,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: 2 }}
        style={{ fontSize: 48, marginBottom: 24 }}
      >💜</motion.div>
      <p className="script" style={{ color: "rgba(196,181,253,0.6)", fontSize: "1.2rem" }}>Loading something from the heart...</p>
      <div style={{ width: 200, height: 1, background: "rgba(255,255,255,0.05)", borderRadius: 1, marginTop: 24, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ height: "100%", background: "linear-gradient(to right, #a78bfa, #f472b6)" }}
        />
      </div>
    </motion.div>
  );
};

// ── APP ROOT ──────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <GlobalStyles />
      <CustomCursor />
      <FloatingPetals />
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <AnimatePresence>
        {loaded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Hero />
            <ApologySection />
            <HerBeautySection />
            <MemoriesGallery />
            <Timeline />
            <ThingsNeverSaid />
            <FinalMessage />
            <EndingScreen />
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
