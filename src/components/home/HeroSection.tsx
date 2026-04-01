import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Animated Camera Character ──────────────────────────────────────── */
const CameraCharacter = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const idleTRef = useRef(0);
  const busyRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [speech, setSpeech] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const speechTimer = useRef<ReturnType<typeof setTimeout>>();

  const PHOTO_EMOJIS = ['🌸','🌟','🦋','🌈','🎨','🏡','🐱','🌺','✨','🎭'];

  const say = useCallback((msg: string) => {
    setSpeech(msg);
    clearTimeout(speechTimer.current);
    speechTimer.current = setTimeout(() => setSpeech(null), 2400);
  }, []);

  const getEl = (id: string) => svgRef.current?.getElementById(id) as SVGElement | null;

  /* ── IDLE FLOAT ── */
  useEffect(() => {
    let t = 0;
    function loop() {
      t += 0.018;
      const charGroup = getEl('cc-body');
      const shadow    = getEl('cc-shadow');
      const armL      = getEl('cc-armL');
      const armR      = getEl('cc-armR');
      if (charGroup) charGroup.style.transform = `translateY(${Math.sin(t) * 9}px) rotate(${Math.sin(t * 0.7) * 2}deg)`;
      if (shadow)    { shadow.setAttribute('rx', String(60 + Math.sin(t) * 5)); shadow.setAttribute('ry', String(9 - Math.sin(t) * 2)); }
      if (!busyRef.current) {
        if (armL) { armL.style.transform = `rotate(${Math.sin(t * 0.9) * 5 - 5}deg)`; armL.style.transformOrigin = '42px 158px'; }
        if (armR) { armR.style.transform = `rotate(${Math.sin(t * 0.9 + 1) * 5 + 5}deg)`; armR.style.transformOrigin = '278px 158px'; }
      }
      idleTRef.current = t;
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── BLINK ── */
  useEffect(() => {
    let frame = 0;
    let raf: number;
    function blink() {
      frame++;
      if (frame % 150 === 0) {
        const eL = getEl('cc-eyeL'), eR = getEl('cc-eyeR');
        if (eL) { eL.style.transform = 'scaleY(0.05)'; eL.style.transformOrigin = '120px 148px'; }
        if (eR) { eR.style.transform = 'scaleY(0.05)'; eR.style.transformOrigin = '200px 148px'; }
        setTimeout(() => {
          const eL2 = getEl('cc-eyeL'), eR2 = getEl('cc-eyeR');
          if (eL2) eL2.style.transform = ''; if (eR2) eR2.style.transform = '';
        }, 110);
      }
      raf = requestAnimationFrame(blink);
    }
    raf = requestAnimationFrame(blink);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── MOUSE FOLLOW ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const sx = (e.clientX - rect.left) * (320 / rect.width);
    const sy = (e.clientY - rect.top)  * (360 / rect.height);
    const dx = Math.max(-4, Math.min(4, (sx - 160) * 0.06));
    const dy = Math.max(-3, Math.min(3, (sy - 148) * 0.04));
    const pL = getEl('cc-pupilL'), pR = getEl('cc-pupilR');
    if (pL) { pL.setAttribute('cx', String(120 + dx)); pL.setAttribute('cy', String(149 + dy)); }
    if (pR) { pR.setAttribute('cx', String(200 + dx)); pR.setAttribute('cy', String(149 + dy)); }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const pL = getEl('cc-pupilL'), pR = getEl('cc-pupilR');
    if (pL) { pL.setAttribute('cx', '120'); pL.setAttribute('cy', '149'); }
    if (pR) { pR.setAttribute('cx', '200'); pR.setAttribute('cy', '149'); }
  }, []);

  /* ── RESET POSE ── */
  const resetPose = useCallback(() => {
    const els = ['cc-armL','cc-armR','cc-eyeL','cc-eyeR','cc-legL','cc-legR'];
    els.forEach(id => { const e = getEl(id); if (e) { e.style.transition = 'transform 300ms ease'; e.style.transform = ''; } });
    const mouth = getEl('cc-mouth'); if (mouth) mouth.setAttribute('d', 'M134 238 Q160 255 186 238');
    const bL = getEl('cc-browL'); if (bL) bL.setAttribute('d', 'M108 133 Q120 128 132 133');
    const bR = getEl('cc-browR'); if (bR) bR.setAttribute('d', 'M188 133 Q200 128 212 133');
    const lens = getEl('cc-lens'); if (lens) lens.setAttribute('fill', '#1e3a5f');
  }, []);

  /* ── TAKE PHOTO ── */
  const takePhoto = useCallback(() => {
    const msgs = ['Say cheese! 🧀','Click! ✨','Perfect shot! 💫','Stunning! 🌟','Love it! ❤️'];
    say(msgs[Math.floor(Math.random() * msgs.length)]);
    setPhotos(prev => [PHOTO_EMOJIS[Math.floor(Math.random() * PHOTO_EMOJIS.length)], ...prev.slice(0, 6)]);

    const flash = getEl('cc-flash');
    if (flash) { flash.setAttribute('opacity', '1'); setTimeout(() => flash.setAttribute('opacity', '0'), 80); }
    const lens = getEl('cc-lens');
    if (lens) { lens.setAttribute('fill', '#1a4a2a'); setTimeout(() => lens.setAttribute('fill', '#1e3a5f'), 300); }

    setTimeout(() => {
      const eL = getEl('cc-eyeL'), eR = getEl('cc-eyeR');
      if (eL) { eL.style.transform = 'scaleY(0.35)'; eL.style.transformOrigin = '120px 148px'; }
      if (eR) { eR.style.transform = 'scaleY(0.35)'; eR.style.transformOrigin = '200px 148px'; }
      const mouth = getEl('cc-mouth'); if (mouth) mouth.setAttribute('d', 'M128 236 Q160 262 192 236');
      const bL = getEl('cc-browL'); if (bL) bL.setAttribute('d', 'M108 126 Q120 122 132 126');
      const bR = getEl('cc-browR'); if (bR) bR.setAttribute('d', 'M188 126 Q200 122 212 126');
    }, 100);
    setTimeout(resetPose, 900);
  }, [say, resetPose]);

  /* ── WAVE ── */
  const wave = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const msgs = ['Hey there! 👋','Hiii! 😊','Hello! 🌸','Nice to meet you!'];
    say(msgs[Math.floor(Math.random() * msgs.length)]);
    let t = 0;
    function step() {
      t++;
      const armR = getEl('cc-armR');
      if (armR) { armR.style.transform = `rotate(${Math.sin(t * 0.3) * 38 - 20}deg)`; armR.style.transformOrigin = '278px 158px'; armR.style.transition = 'none'; }
      if (t < 80) requestAnimationFrame(step);
      else { busyRef.current = false; const armR2 = getEl('cc-armR'); if (armR2) armR2.style.transform = ''; }
    }
    step();
  }, [say]);

  /* ── DANCE ── */
  const dance = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const msgs = ["Let's gooo! 🕺","Move it! 💃","Cha cha cha! 🎵","Boogie! 🎶"];
    say(msgs[Math.floor(Math.random() * msgs.length)]);
    let t = 0;
    function step() {
      t++;
      const cg = getEl('cc-body');
      const aL = getEl('cc-armL'), aR = getEl('cc-armR');
      const lL = getEl('cc-legL'), lR = getEl('cc-legR');
      const mouth = getEl('cc-mouth');
      if (cg)  { cg.style.transform = `translateY(${Math.abs(Math.sin(t * 0.18)) * -14}px) rotate(${Math.sin(t * 0.12) * 3}deg)`; cg.style.transition = 'none'; }
      if (aL)  { aL.style.transform = `rotate(${Math.sin(t * 0.18 + Math.PI) * 50}deg)`; aL.style.transformOrigin = '42px 158px'; }
      if (aR)  { aR.style.transform = `rotate(${Math.sin(t * 0.18) * 50}deg)`; aR.style.transformOrigin = '278px 158px'; }
      if (lL)  { lL.style.transform = `rotate(${Math.sin(t * 0.18) * 22}deg)`; lL.style.transformOrigin = '110px 264px'; }
      if (lR)  { lR.style.transform = `rotate(${Math.sin(t * 0.18 + Math.PI) * 22}deg)`; lR.style.transformOrigin = '210px 264px'; }
      if (mouth) mouth.setAttribute('d', `M128 236 Q160 ${258 + Math.sin(t * 0.18) * 5} 192 236`);
      if (t < 180) requestAnimationFrame(step);
      else { busyRef.current = false; const lL2 = getEl('cc-legL'), lR2 = getEl('cc-legR'); if (lL2) lL2.style.transform = ''; if (lR2) lR2.style.transform = ''; resetPose(); }
    }
    step();
  }, [say, resetPose]);

  /* ── WINK ── */
  const wink = useCallback(() => {
    const msgs = ['( ͡° ͜ʖ ͡°)','Hehehe~ 😏','You got this 😉','Our secret 🤫'];
    say(msgs[Math.floor(Math.random() * msgs.length)]);
    const eR = getEl('cc-eyeR'), bR = getEl('cc-browR'), bL = getEl('cc-browL');
    if (eR) { eR.style.transform = 'scaleY(0.06)'; eR.style.transformOrigin = '200px 148px'; }
    if (bR) bR.setAttribute('d', 'M188 125 Q200 120 212 125');
    if (bL) bL.setAttribute('d', 'M108 128 Q120 122 132 128');
    setTimeout(() => {
      if (eR) { eR.style.transform = ''; }
      if (bR) bR.setAttribute('d', 'M188 133 Q200 128 212 133');
      if (bL) bL.setAttribute('d', 'M108 133 Q120 128 132 133');
    }, 320);
  }, [say]);

  /* ── LOOK AROUND ── */
  const lookAround = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const msgs = ["What's over there?","Hmm... 🤔","Looking good! 👀","I see you! 😄"];
    say(msgs[Math.floor(Math.random() * msgs.length)]);
    const moves = [
      { px: 124, py: 148, rx: 204, ry: 148, t: 0 },
      { px: 116, py: 152, rx: 196, ry: 152, t: 500 },
      { px: 126, py: 148, rx: 206, ry: 148, t: 1100 },
      { px: 120, py: 152, rx: 200, ry: 152, t: 1700 },
      { px: 120, py: 149, rx: 200, ry: 149, t: 2200 },
    ];
    moves.forEach(m => {
      setTimeout(() => {
        const pL = getEl('cc-pupilL'), pR = getEl('cc-pupilR');
        if (pL) { pL.setAttribute('cx', String(m.px)); pL.setAttribute('cy', String(m.py)); }
        if (pR) { pR.setAttribute('cx', String(m.rx)); pR.setAttribute('cy', String(m.ry)); }
      }, m.t);
    });
    setTimeout(() => { busyRef.current = false; }, 2400);
  }, [say]);

  /* ── CELEBRATE ── */
  const celebrate = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const msgs = ['WOOHOO! 🎉','YESSS! 🙌','Party time! 🥳','Let\'s celebrate! 🎊'];
    say(msgs[Math.floor(Math.random() * msgs.length)]);

    const eL = getEl('cc-eyeL'), eR = getEl('cc-eyeR');
    const mouth = getEl('cc-mouth'), bL = getEl('cc-browL'), bR = getEl('cc-browR');
    if (eL) { eL.style.transform = 'scaleY(0.4)'; eL.style.transformOrigin = '120px 148px'; }
    if (eR) { eR.style.transform = 'scaleY(0.4)'; eR.style.transformOrigin = '200px 148px'; }
    if (mouth) mouth.setAttribute('d', 'M124 236 Q160 270 196 236');
    if (bL) bL.setAttribute('d', 'M108 124 Q120 118 132 124');
    if (bR) bR.setAttribute('d', 'M188 124 Q200 118 212 124');

    let t = 0;
    function jump() {
      t++;
      const cg = getEl('cc-body'), sh = getEl('cc-shadow');
      const aL = getEl('cc-armL'), aR = getEl('cc-armR');
      const h = Math.max(0, Math.sin(t * 0.14) * 40);
      if (cg)  { cg.style.transform = `translateY(${-h}px)`; cg.style.transition = 'none'; }
      if (sh)  { sh.setAttribute('rx', String(60 - h * 0.5)); }
      if (aL)  { aL.style.transform = `rotate(${-38 + h * 0.4}deg)`; aL.style.transformOrigin = '42px 158px'; }
      if (aR)  { aR.style.transform = `rotate(${38 - h * 0.4}deg)`; aR.style.transformOrigin = '278px 158px'; }
      if (t < 100) requestAnimationFrame(jump);
      else { busyRef.current = false; resetPose(); }
    }
    jump();
  }, [say, resetPose]);

  /* ── BODY CLICK: Surprise ── */
  const handleBodyClick = useCallback(() => {
    const msgs = ['Hey! 😮','Careful! 🫢','Oops! 😅','Whoops! 😲'];
    say(msgs[Math.floor(Math.random() * msgs.length)]);
    const eL = getEl('cc-eyeL'), eR = getEl('cc-eyeR');
    const bL = getEl('cc-browL'), bR = getEl('cc-browR');
    if (eL) { eL.style.transform = 'scale(1.25)'; eL.style.transformOrigin = '120px 148px'; }
    if (eR) { eR.style.transform = 'scale(1.25)'; eR.style.transformOrigin = '200px 148px'; }
    if (bL) bL.setAttribute('d', 'M108 122 Q120 116 132 122');
    if (bR) bR.setAttribute('d', 'M188 122 Q200 116 212 122');
    setTimeout(() => {
      const eL2 = getEl('cc-eyeL'), eR2 = getEl('cc-eyeR');
      if (eL2) eL2.style.transform = ''; if (eR2) eR2.style.transform = '';
      if (bL) bL.setAttribute('d', 'M108 133 Q120 128 132 133');
      if (bR) bR.setAttribute('d', 'M188 133 Q200 128 212 133');
    }, 500);
  }, [say]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Speech bubble */}
      {speech && (
        <div
          style={{
            position: 'absolute', top: 8, right: 0, zIndex: 20,
            background: 'white', border: '2.5px solid #ef4444', borderRadius: 14,
            padding: '6px 14px', fontSize: 13, fontWeight: 700, color: '#ef4444',
            whiteSpace: 'nowrap', boxShadow: '0 4px 18px rgba(239,68,68,0.16)',
            animation: 'fadeInUp 0.2s ease-out forwards',
          }}
        >
          {speech}
          <span style={{ position: 'absolute', bottom: -9, left: 16, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '9px solid white' }} />
          <span style={{ position: 'absolute', bottom: -13, left: 14, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '11px solid #ef4444', zIndex: -1 }} />
        </div>
      )}

      {/* SVG Character */}
      <svg
        ref={svgRef}
        width="320" height="360"
        viewBox="0 0 320 360"
        style={{ overflow: 'visible', cursor: 'pointer' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleBodyClick}
      >
        {/* Confetti (CSS animated) */}
        {[
          { x: 70,  y: 30, c: '#ef4444', d: '0s',    s: 6, r: 30 },
          { x: 190, y: 18, c: '#fbbf24', d: '0.35s',  s: 5, r: 65 },
          { x: 270, y: 55, c: '#ef4444', d: '0.7s',   s: 6, r: 120 },
          { x: 40,  y: 85, c: '#f87171', d: '1.05s',  s: 4, r: 200 },
          { x: 240, y: 22, c: '#fbbf24', d: '1.4s',   s: 5, r: 45 },
          { x: 155, y: 8,  c: '#ef4444', d: '1.75s',  s: 6, r: 90 },
        ].map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={p.s} height={p.s * 2} rx={2}
            fill={p.c} style={{ animation: `confettiFall 2.5s ease-in infinite`, animationDelay: p.d, transform: `rotate(${p.r}deg)`, transformOrigin: `${p.x + p.s / 2}px ${p.y + p.s}px` }} />
        ))}

        {/* Floating hearts */}
        {[
          { x: 60,  y: 52, d: '0s',   scale: 1 },
          { x: 264, y: 40, d: '1.2s', scale: 0.7 },
          { x: 160, y: 28, d: '2.1s', scale: 0.55 },
        ].map((h, i) => (
          <text key={i} x={h.x} y={h.y} fontSize={18 * h.scale} fill="#ef4444" textAnchor="middle"
            style={{ animation: `heartPop 3.2s ease-in-out infinite`, animationDelay: h.d }}>♥</text>
        ))}

        {/* Stars */}
        {[
          { x: 24,  y: 125, d: '0s',   s: 13 },
          { x: 295, y: 142, d: '0.9s', s: 10 },
          { x: 46,  y: 272, d: '1.6s', s: 8 },
          { x: 286, y: 268, d: '0.45s',s: 11 },
        ].map((st, i) => (
          <polygon key={i}
            points={`${st.x},${st.y - st.s} ${st.x + 3},${st.y - 3} ${st.x + st.s},${st.y - 3} ${st.x + 4},${st.y + 2} ${st.x + 7},${st.y + st.s} ${st.x},${st.y + 5} ${st.x - 7},${st.y + st.s} ${st.x - 4},${st.y + 2} ${st.x - st.s},${st.y - 3} ${st.x - 3},${st.y - 3}`}
            fill="#ef4444"
            style={{ animation: `starBurst 3.2s ease-in-out infinite`, animationDelay: st.d }}
          />
        ))}

        {/* Shadow */}
        <ellipse id="cc-shadow" cx="160" cy="348" rx="60" ry="9" fill="rgba(239,68,68,0.12)" />

        {/* Character group */}
        <g id="cc-body">

          {/* Legs */}
          <g id="cc-legs">
            <rect id="cc-legL" x="96"  y="264" width="28" height="50" rx="14" fill="#ef4444" />
            <ellipse cx="104" cy="316" rx="20" ry="10" fill="#dc2626" />
            <ellipse cx="97"  cy="314" rx="10" ry="7"  fill="#fcd34d" />
            <rect id="cc-legR" x="196" y="264" width="28" height="50" rx="14" fill="#ef4444" />
            <ellipse cx="210" cy="316" rx="20" ry="10" fill="#dc2626" />
            <ellipse cx="217" cy="314" rx="10" ry="7"  fill="#fcd34d" />
          </g>

          {/* Left arm */}
          <g id="cc-armL" style={{ transformOrigin: '42px 158px' }}>
            <rect x="8"  y="148" width="46" height="20" rx="10" fill="#ef4444" />
            <circle cx="6"  cy="158" r="13"  fill="#fcd34d" />
            <circle cx="-2" cy="149" r="6"   fill="#fcd34d" />
            <circle cx="-7" cy="155" r="5.5" fill="#fcd34d" />
            <circle cx="-6" cy="164" r="5.5" fill="#fcd34d" />
            <circle cx="1"  cy="169" r="5.5" fill="#fcd34d" />
          </g>

          {/* Right arm */}
          <g id="cc-armR" style={{ transformOrigin: '278px 158px' }}>
            <rect x="266" y="148" width="46" height="20" rx="10" fill="#ef4444" />
            <circle cx="314" cy="158" r="13"   fill="#fcd34d" />
            <circle cx="322" cy="149" r="6"    fill="#fcd34d" />
            <circle cx="327" cy="155" r="5.5"  fill="#fcd34d" />
            <circle cx="326" cy="164" r="5.5"  fill="#fcd34d" />
            <circle cx="319" cy="169" r="5.5"  fill="#fcd34d" />
          </g>

          {/* Camera body */}
          <rect x="46" y="108" width="228" height="160" rx="22" fill="#ef4444" />
          <rect x="46" y="108" width="228" height="36"  rx="22" fill="#f87171" opacity="0.45" />
          <rect x="46" y="244" width="228" height="24"  rx="8"  fill="rgba(0,0,0,0.1)" />

          {/* Grip */}
          {[0,1,2,3,4].map(i => <rect key={i} x="48" y={126 + i * 14} width="13" height="7" rx="3.5" fill="rgba(0,0,0,0.13)" />)}

          {/* Top hump, flash */}
          <rect x="106" y="94" width="88"  height="18" rx="7" fill="#dc2626" />
          <rect x="210" y="88" width="38"  height="24" rx="8" fill="#dc2626" />
          <rect x="215" y="93" width="28"  height="14" rx="4" fill="white" opacity="0.82" />
          <rect id="cc-flash" x="215" y="93" width="28" height="14" rx="4" fill="#fbbf24" opacity="0" />

          {/* Mode dial */}
          <circle cx="80" cy="104" r="13" fill="#b91c1c" />
          <circle cx="80" cy="104" r="9"  fill="#dc2626" />
          <circle cx="80" cy="104" r="3"  fill="white" opacity="0.4" />
          <line x1="80" y1="95" x2="80" y2="100" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Shutter button */}
          <circle cx="200" cy="100" r="11" fill="#b91c1c" style={{ cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); takePhoto(); }} />
          <circle cx="200" cy="98"  r="8"  fill="#f87171" />

          {/* Strap */}
          <path d="M52 116 Q30 95 40 78 Q50 60 72 68" stroke="#b91c1c" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M268 116 Q290 95 280 78 Q270 60 248 68" stroke="#b91c1c" strokeWidth="7" fill="none" strokeLinecap="round" />

          {/* Lens rings */}
          <circle cx="160" cy="188" r="66" fill="#1c1917" />
          <circle cx="160" cy="188" r="61" fill="#292524" />
          <g stroke="white" strokeWidth="1.2" opacity="0.25">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <line key={i}
                x1={160 + Math.cos(a) * 54} y1={188 + Math.sin(a) * 54}
                x2={160 + Math.cos(a) * 62} y2={188 + Math.sin(a) * 62} />;
            })}
          </g>
          <circle id="cc-lens" cx="160" cy="188" r="44" fill="#1e3a5f" />
          <circle cx="160" cy="188" r="36" fill="#172f50" />
          <circle cx="160" cy="188" r="26" fill="#0f1f35" />
          <ellipse cx="148" cy="176" rx="9" ry="6" fill="white" opacity="0.16" transform="rotate(-30 148 176)" />
          <ellipse cx="170" cy="197" rx="5" ry="3" fill="white" opacity="0.09" />
          <circle cx="160" cy="188" r="13" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />

          {/* Eyes */}
          <g id="cc-eyeL" style={{ transformOrigin: '120px 148px' }}>
            <ellipse cx="120" cy="148" rx="13" ry="14" fill="white" />
            <circle id="cc-pupilL" cx="120" cy="149" r="8" fill="#1c1917" />
            <circle cx="123" cy="146" r="2.5" fill="white" />
          </g>
          <g id="cc-eyeR" style={{ transformOrigin: '200px 148px' }}>
            <ellipse cx="200" cy="148" rx="13" ry="14" fill="white" />
            <circle id="cc-pupilR" cx="200" cy="149" r="8" fill="#1c1917" />
            <circle cx="203" cy="146" r="2.5" fill="white" />
          </g>

          {/* Eyebrows */}
          <path id="cc-browL" d="M108 133 Q120 128 132 133" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path id="cc-browR" d="M188 133 Q200 128 212 133" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Mouth */}
          <path id="cc-mouth" d="M134 238 Q160 255 186 238" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.88" />

          {/* Cheeks */}
          <ellipse cx="106" cy="228" rx="12" ry="8" fill="#fca5a5" opacity="0.4" />
          <ellipse cx="214" cy="228" rx="12" ry="8" fill="#fca5a5" opacity="0.4" />

          {/* Viewfinder */}
          <rect x="62"  y="118" width="26" height="18" rx="4" fill="#1c1917" opacity="0.7" />
          <rect x="64"  y="120" width="22" height="14" rx="3" fill="#172f50" opacity="0.8" />
          <rect x="65"  y="121" width="20" height="12" rx="2" fill="#1e3a5f" opacity="0.9" />
        </g>
      </svg>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
        {[
          { label: '📸 Shoot', fn: takePhoto },
          { label: '👋 Wave',  fn: wave },
          { label: '💃 Dance', fn: dance },
          { label: '😉 Wink',  fn: wink },
          { label: '👀 Look',  fn: lookAround },
          { label: '🎉 Party', fn: celebrate },
        ].map(btn => (
          <button key={btn.label} onClick={btn.fn}
            style={{
              padding: '7px 16px', borderRadius: 999, border: '1.5px solid #ef4444',
              background: 'white', color: '#ef4444', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ef4444'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
          >{btn.label}</button>
        ))}
      </div>

      {/* Photo gallery strip */}
      {photos.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {photos.map((emoji, i) => (
            <div key={i} style={{
              width: 38, height: 30, borderRadius: 5, border: '2px solid #ef4444',
              background: '#fff1f1', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, animation: 'popIn 0.3s cubic-bezier(.4,1.6,.6,1) forwards',
            }}>{emoji}</div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Hero Section ──────────────────────────────────────────────────── */
const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #ef4444 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }} />

      {/* Red blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)', opacity: 0.08 }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)', opacity: 0.06 }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border animate-fade-in-up delay-100"
              style={{ backgroundColor: '#fff1f1', borderColor: 'rgba(239,68,68,0.25)', color: '#ef4444' }}>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">Professional Photography Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] animate-fade-in-up delay-200"
              style={{ color: '#0a0a0a' }}>
              Every Frame<br />
              Tells a{' '}
              <span className="italic relative inline-block" style={{ color: '#ef4444' }}>
                Story
                <span className="absolute bottom-0 left-0 right-0 overflow-hidden"
                  style={{ height: 3, borderRadius: 2, background: 'rgba(239,68,68,0.12)' }}>
                  <span className="block h-full"
                    style={{ background: 'linear-gradient(90deg,transparent,#ef4444,transparent)', animation: 'shimmerLine 2.2s ease-in-out infinite' }} />
                </span>
              </span>
            </h1>

            <p className="text-lg leading-relaxed max-w-xl animate-fade-in-up delay-300" style={{ color: '#666' }}>
              At KejShots, we don't just take photos — we craft visual narratives that
              capture the emotion, beauty, and authenticity of your most cherished moments.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <Link to="/business">
                <Button size="lg" className="h-14 px-8 text-base font-semibold gap-2 group transition-all duration-300"
                  style={{ background: '#ef4444', color: 'white', boxShadow: '0 8px 24px rgba(239,68,68,0.35)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(239,68,68,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(239,68,68,0.35)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  Explore Services
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold gap-2 transition-all duration-300"
                  style={{ borderColor: 'rgba(239,68,68,0.35)', color: '#ef4444', background: 'white' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff1f1'; (e.currentTarget as HTMLElement).style.borderColor = '#ef4444'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.35)'; }}>
                  <Play className="h-5 w-5 fill-red-500 text-red-500" />
                  View Gallery
                </Button>
              </Link>
            </div>

            <div className="flex gap-10 pt-2 animate-fade-in-up delay-500">
              {[{ value: '500+', label: 'Projects Delivered' }, { value: '12+', label: 'Years Experience' }, { value: '98%', label: 'Happy Clients' }].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-display font-bold" style={{ color: '#ef4444' }}>{s.value}</div>
                  <div className="text-sm" style={{ color: '#999' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Camera Character */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in delay-300">
            <CameraCharacter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
