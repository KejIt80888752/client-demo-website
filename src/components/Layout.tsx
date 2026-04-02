import Navbar from "./Navbar";

/* ─────────────────────────────────────────────────────────────────
   AnimatedBackground
   • Stronger, more visible dot grid + floating bubbles
   • Works on every screen that uses <Layout>
   • For auth pages (Login/Signup) export <AnimatedBackground> separately
─────────────────────────────────────────────────────────────────── */
export const AnimatedBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
      background: "#000000",
    }}
  >
    <style>{`
      @keyframes dotDrift {
        0%   { background-position: 0px 0px; }
        100% { background-position: 32px 32px; }
      }

      /* Bubble float animations — 5 variants */
      @keyframes floatA {
        0%,100% { transform: translateY(0px)   scale(1);    opacity: 0.55; }
        50%      { transform: translateY(-20px) scale(1.08); opacity: 0.85; }
      }
      @keyframes floatB {
        0%,100% { transform: translateY(0px)   scale(1);    opacity: 0.45; }
        50%      { transform: translateY(-28px) scale(1.1);  opacity: 0.75; }
      }
      @keyframes floatC {
        0%,100% { transform: translateY(0px)   scale(1);    opacity: 0.50; }
        50%      { transform: translateY(-15px) scale(1.06); opacity: 0.80; }
      }
      @keyframes floatD {
        0%,100% { transform: translateY(0px)   scale(1);    opacity: 0.40; }
        50%      { transform: translateY(-22px) scale(1.07); opacity: 0.70; }
      }
      @keyframes floatE {
        0%,100% { transform: translateY(0px)   scale(1);    opacity: 0.48; }
        50%      { transform: translateY(-18px) scale(1.09); opacity: 0.78; }
      }

      /* Slow drifting orbs in background */
      @keyframes orbDrift {
        0%   { transform: translate(0px, 0px); }
        33%  { transform: translate(40px, -30px); }
        66%  { transform: translate(-20px, 20px); }
        100% { transform: translate(0px, 0px); }
      }

      .fdot { position: absolute; border-radius: 50%; }
      .fa { animation: floatA ease-in-out infinite; }
      .fb { animation: floatB ease-in-out infinite; }
      .fc { animation: floatC ease-in-out infinite; }
      .fd { animation: floatD ease-in-out infinite; }
      .fe { animation: floatE ease-in-out infinite; }
    `}</style>

    {/* ── Layer 1: drifting dot grid — more visible ──────────────── */}
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "radial-gradient(circle, rgba(220,30,30,0.30) 1.4px, transparent 1.4px)",
      backgroundSize: "32px 32px",
      animation: "dotDrift 8s linear infinite",
    }} />

    {/* ── Layer 2: large drifting red orbs (atmospheric glow) ─────── */}
    {[
      { top: "10%",  left: "5%",   size: 320, dur: "22s", del: "0s"   },
      { top: "55%",  left: "75%",  size: 280, dur: "28s", del: "8s"   },
      { top: "80%",  left: "20%",  size: 240, dur: "25s", del: "4s"   },
      { top: "30%",  left: "88%",  size: 200, dur: "30s", del: "12s"  },
      { top: "5%",   left: "55%",  size: 180, dur: "20s", del: "6s"   },
    ].map((orb, i) => (
      <div key={`orb-${i}`} style={{
        position: "absolute",
        top: orb.top,
        left: orb.left,
        width: orb.size,
        height: orb.size,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(220,30,30,0.08) 0%, rgba(220,30,30,0.03) 50%, transparent 70%)",
        animation: `orbDrift ${orb.dur} ease-in-out infinite`,
        animationDelay: orb.del,
        filter: "blur(40px)",
      }} />
    ))}

    {/* ── Layer 3: floating bubble dots — larger, more visible ──────── */}
    {([
      // left column
      { t:"7%",  l:"3%",  s:7,  c:"fa", d:"4.4s", dl:"0s"    },
      { t:"22%", l:"5%",  s:5,  c:"fc", d:"6.0s", dl:"1.5s"  },
      { t:"45%", l:"2%",  s:8,  c:"fb", d:"5.2s", dl:"3.0s"  },
      { t:"68%", l:"6%",  s:6,  c:"fe", d:"4.8s", dl:"0.8s"  },
      { t:"88%", l:"4%",  s:7,  c:"fd", d:"5.6s", dl:"2.2s"  },
      // col 2
      { t:"13%", l:"16%", s:5,  c:"fd", d:"5.0s", dl:"0.4s"  },
      { t:"35%", l:"14%", s:8,  c:"fa", d:"4.6s", dl:"2.0s"  },
      { t:"58%", l:"19%", s:4,  c:"fc", d:"6.2s", dl:"1.1s"  },
      { t:"80%", l:"17%", s:7,  c:"fb", d:"5.8s", dl:"3.5s"  },
      // col 3
      { t:"5%",  l:"30%", s:4,  c:"fc", d:"4.9s", dl:"1.8s"  },
      { t:"27%", l:"33%", s:7,  c:"fe", d:"5.4s", dl:"0.3s"  },
      { t:"50%", l:"28%", s:5,  c:"fa", d:"6.1s", dl:"2.7s"  },
      { t:"72%", l:"31%", s:9,  c:"fd", d:"4.3s", dl:"1.2s"  },
      { t:"91%", l:"34%", s:4,  c:"fb", d:"5.9s", dl:"4.0s"  },
      // center
      { t:"10%", l:"47%", s:6,  c:"fb", d:"5.3s", dl:"0.7s"  },
      { t:"33%", l:"50%", s:4,  c:"fa", d:"4.7s", dl:"2.3s"  },
      { t:"56%", l:"45%", s:8,  c:"fc", d:"6.3s", dl:"1.6s"  },
      { t:"78%", l:"52%", s:5,  c:"fe", d:"5.1s", dl:"3.2s"  },
      // col 5
      { t:"6%",  l:"63%", s:7,  c:"fe", d:"5.0s", dl:"1.0s"  },
      { t:"25%", l:"66%", s:4,  c:"fd", d:"5.7s", dl:"3.4s"  },
      { t:"48%", l:"61%", s:6,  c:"fa", d:"4.5s", dl:"0.2s"  },
      { t:"70%", l:"64%", s:9,  c:"fb", d:"6.4s", dl:"2.1s"  },
      { t:"90%", l:"62%", s:4,  c:"fc", d:"5.2s", dl:"1.7s"  },
      // col 6
      { t:"17%", l:"78%", s:5,  c:"fc", d:"5.9s", dl:"0.6s"  },
      { t:"40%", l:"81%", s:7,  c:"fe", d:"4.8s", dl:"3.0s"  },
      { t:"62%", l:"76%", s:4,  c:"fa", d:"6.0s", dl:"1.3s"  },
      { t:"83%", l:"79%", s:8,  c:"fd", d:"5.5s", dl:"2.6s"  },
      // right column
      { t:"4%",  l:"91%", s:5,  c:"fd", d:"4.6s", dl:"2.0s"  },
      { t:"28%", l:"93%", s:4,  c:"fb", d:"6.0s", dl:"0.9s"  },
      { t:"54%", l:"89%", s:7,  c:"fc", d:"4.2s", dl:"3.6s"  },
      { t:"75%", l:"92%", s:5,  c:"fa", d:"6.1s", dl:"1.5s"  },
      { t:"94%", l:"90%", s:4,  c:"fe", d:"5.4s", dl:"4.1s"  },
      // Extra mid-density dots so centre feels alive too
      { t:"19%", l:"42%", s:5,  c:"fa", d:"5.1s", dl:"0.5s"  },
      { t:"44%", l:"58%", s:6,  c:"fb", d:"4.7s", dl:"1.9s"  },
      { t:"63%", l:"38%", s:4,  c:"fc", d:"6.2s", dl:"3.3s"  },
      { t:"82%", l:"55%", s:7,  c:"fd", d:"5.0s", dl:"0.1s"  },
    ] as { t:string; l:string; s:number; c:string; d:string; dl:string }[])
      .map((p, i) => (
        <div
          key={i}
          className={`fdot ${p.c}`}
          style={{
            top: p.t,
            left: p.l,
            width: p.s,
            height: p.s,
            background: "rgba(220,30,30,0.65)",
            boxShadow: `0 0 ${p.s * 2}px ${p.s / 2}px rgba(220,30,30,0.25)`,
            animationDuration: p.d,
            animationDelay: p.dl,
          }}
        />
      ))
    }

    {/* ── Layer 4: soft vignette ─────────────────────────────────── */}
    <div style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 100%)",
    }} />
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Layout
─────────────────────────────────────────────────────────────────── */
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ minHeight: "100vh", background: "#000", position: "relative" }}>
    <AnimatedBackground />
    <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />
      <main>{children}</main>
    </div>
  </div>
);

export default Layout;
