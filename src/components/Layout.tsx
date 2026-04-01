import Navbar from "./Navbar";

const AnimatedBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}
  >
    <style>{`
      /* ── Dot grid slowly drifts diagonally ── */
      @keyframes dotDrift {
        0%   { background-position: 0px 0px; }
        100% { background-position: 32px 32px; }
      }

      /* ── Individual floating dots bob up and down at different phases ── */
      @keyframes floatA {
        0%, 100% { transform: translateY(0px)   scale(1);    opacity: 0.55; }
        50%       { transform: translateY(-18px) scale(1.15); opacity: 1;    }
      }
      @keyframes floatB {
        0%, 100% { transform: translateY(0px)   scale(1);    opacity: 0.4; }
        50%       { transform: translateY(-24px) scale(1.2);  opacity: 0.9; }
      }
      @keyframes floatC {
        0%, 100% { transform: translateY(0px)   scale(1);    opacity: 0.6; }
        50%       { transform: translateY(-14px) scale(1.1);  opacity: 1;   }
      }
      @keyframes floatD {
        0%, 100% { transform: translateY(0px)   scale(1);    opacity: 0.35; }
        50%       { transform: translateY(-20px) scale(1.18); opacity: 0.8;  }
      }
      @keyframes floatE {
        0%, 100% { transform: translateY(0px)   scale(1);    opacity: 0.5; }
        50%       { transform: translateY(-16px) scale(1.12); opacity: 0.95; }
      }

      .dot {
        position: absolute;
        border-radius: 50%;
        background: rgba(239, 68, 68, 0.55);
        box-shadow: 0 0 6px 1px rgba(239, 68, 68, 0.25);
      }
      .dot-a { animation: floatA ease-in-out infinite; }
      .dot-b { animation: floatB ease-in-out infinite; }
      .dot-c { animation: floatC ease-in-out infinite; }
      .dot-d { animation: floatD ease-in-out infinite; }
      .dot-e { animation: floatE ease-in-out infinite; }
    `}</style>

    {/* ── Drifting dot grid (the base layer) ── */}
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(circle, rgba(239,68,68,0.22) 1.5px, transparent 1.5px)",
      backgroundSize: "32px 32px",
      animation: "dotDrift 6s linear infinite",
    }} />

    {/* ── Floating accent dots — placed at varied positions across the full layout ── */}
    {[
      // col 1
      { top: "8%",  left: "4%",  size: 6, cls: "dot-a", dur: "4.2s", delay: "0s"    },
      { top: "24%", left: "6%",  size: 4, cls: "dot-c", dur: "5.8s", delay: "1.4s"  },
      { top: "52%", left: "3%",  size: 7, cls: "dot-b", dur: "6.1s", delay: "2.9s"  },
      { top: "78%", left: "7%",  size: 4, cls: "dot-e", dur: "4.8s", delay: "0.7s"  },
      { top: "92%", left: "4%",  size: 5, cls: "dot-d", dur: "5.2s", delay: "3.3s"  },
      // col 2
      { top: "14%", left: "18%", size: 5, cls: "dot-d", dur: "5.0s", delay: "0.5s"  },
      { top: "38%", left: "15%", size: 7, cls: "dot-a", dur: "4.5s", delay: "2.1s"  },
      { top: "62%", left: "20%", size: 4, cls: "dot-c", dur: "6.3s", delay: "1.0s"  },
      { top: "85%", left: "17%", size: 6, cls: "dot-b", dur: "5.7s", delay: "3.8s"  },
      // col 3
      { top: "6%",  left: "32%", size: 4, cls: "dot-c", dur: "4.8s", delay: "1.9s"  },
      { top: "29%", left: "35%", size: 6, cls: "dot-e", dur: "5.5s", delay: "0.3s"  },
      { top: "50%", left: "30%", size: 5, cls: "dot-a", dur: "6.0s", delay: "2.6s"  },
      { top: "73%", left: "33%", size: 7, cls: "dot-d", dur: "4.3s", delay: "1.2s"  },
      { top: "90%", left: "36%", size: 4, cls: "dot-b", dur: "5.9s", delay: "4.0s"  },
      // col 4  (center)
      { top: "12%", left: "48%", size: 5, cls: "dot-b", dur: "5.2s", delay: "0.8s"  },
      { top: "35%", left: "50%", size: 4, cls: "dot-a", dur: "4.6s", delay: "2.4s"  },
      { top: "58%", left: "46%", size: 7, cls: "dot-c", dur: "6.2s", delay: "1.6s"  },
      { top: "80%", left: "52%", size: 5, cls: "dot-e", dur: "5.0s", delay: "3.1s"  },
      // col 5
      { top: "7%",  left: "64%", size: 6, cls: "dot-e", dur: "4.9s", delay: "1.1s"  },
      { top: "26%", left: "67%", size: 4, cls: "dot-d", dur: "5.6s", delay: "3.5s"  },
      { top: "46%", left: "62%", size: 5, cls: "dot-a", dur: "4.4s", delay: "0.2s"  },
      { top: "68%", left: "65%", size: 7, cls: "dot-b", dur: "6.4s", delay: "2.2s"  },
      { top: "88%", left: "63%", size: 4, cls: "dot-c", dur: "5.1s", delay: "1.7s"  },
      // col 6
      { top: "18%", left: "79%", size: 5, cls: "dot-c", dur: "5.8s", delay: "0.6s"  },
      { top: "40%", left: "82%", size: 6, cls: "dot-e", dur: "4.7s", delay: "3.0s"  },
      { top: "60%", left: "77%", size: 4, cls: "dot-a", dur: "6.1s", delay: "1.3s"  },
      { top: "82%", left: "80%", size: 7, cls: "dot-d", dur: "5.3s", delay: "2.7s"  },
      // col 7
      { top: "5%",  left: "92%", size: 5, cls: "dot-d", dur: "4.5s", delay: "2.0s"  },
      { top: "30%", left: "94%", size: 4, cls: "dot-b", dur: "5.9s", delay: "0.9s"  },
      { top: "55%", left: "90%", size: 6, cls: "dot-c", dur: "4.2s", delay: "3.6s"  },
      { top: "76%", left: "93%", size: 5, cls: "dot-a", dur: "6.0s", delay: "1.5s"  },
      { top: "95%", left: "91%", size: 4, cls: "dot-e", dur: "5.4s", delay: "4.2s"  },
    ].map((d, i) => (
      <div
        key={i}
        className={`dot ${d.cls}`}
        style={{
          top: d.top,
          left: d.left,
          width: d.size,
          height: d.size,
          animationDuration: d.dur,
          animationDelay: d.delay,
        }}
      />
    ))}

    {/* ── Subtle radial vignette so dots fade toward edges ── */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(255,255,255,0.55) 100%)",
      pointerEvents: "none",
    }} />
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background" style={{ position: "relative" }}>
      <AnimatedBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
