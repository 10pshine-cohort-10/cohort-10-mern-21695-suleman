import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface HeroProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth mouse parallax physics
  const springConfig = { damping: 30, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 24);
    mouseY.set(y * 18);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Subtle animated glowing aurora/sheen along the silk wave contours
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      t += 0.005;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Subtle traveling light ray across the wave ridges
      const x1 = w * 0.35 + Math.sin(t * 0.8) * 120;
      const y1 = h * 0.55 + Math.cos(t * 0.6) * 80;
      const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, w * 0.4);
      g1.addColorStop(0, 'rgba(124, 111, 255, 0.14)');
      g1.addColorStop(0.5, 'rgba(74, 45, 180, 0.05)');
      g1.addColorStop(1, 'rgba(10, 10, 15, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Secondary glowing violet pulse on right scene
      const x2 = w * 0.75 + Math.cos(t * 0.7) * 90;
      const y2 = h * 0.3 + Math.sin(t * 0.9) * 60;
      const g2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, w * 0.35);
      g2.addColorStop(0, 'rgba(155, 143, 255, 0.12)');
      g2.addColorStop(0.6, 'rgba(124, 111, 255, 0.03)');
      g2.addColorStop(1, 'rgba(10, 10, 15, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[680px] lg:h-[720px] bg-[#0a0a0f] flex items-center justify-center overflow-hidden px-6 sm:px-12 lg:px-24 pt-8 pb-16"
    >
      {/* === BACKGROUND: Dark Flowing Iridescent Silk Waves === */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute -inset-8 pointer-events-none z-0 overflow-hidden"
      >
        {/* The Exact High-Res Dark Silk Waves Texture */}
        <motion.img
          src="/hero-bg.png"
          alt="Noteflow Silk Waves Background"
          animate={{
            scale: [1, 1.035, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 16,
            ease: 'easeInOut',
          }}
          className="w-full h-full object-cover object-center select-none opacity-90 filter contrast-[1.08] brightness-[0.98]"
        />

        {/* Dynamic Light Sheen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block mix-blend-screen pointer-events-none opacity-90"
        />

        {/* Ambient Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.45)_100%)] pointer-events-none" />
      </motion.div>

      {/* Hero Bottom Fade into next section */}
      <div className="absolute bottom-0 left-0 w-full h-[180px] pointer-events-none z-10 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />

      {/* Hero Top Nav Fade */}
      <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-10 bg-gradient-to-b from-[#0a0a0f]/70 to-transparent" />

      {/* Notes Scene Glow (Right Side) */}
      <div className="absolute top-0 right-[-100px] lg:right-0 w-[800px] h-full pointer-events-none z-10 bg-[radial-gradient(50%_50%_at_70%_40%,rgba(124,111,255,0.22)_0%,rgba(10,10,15,0)_70%)]" />

      {/* Main Content Layout */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Hero Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 max-w-[540px]">
          {/* Eyebrow Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C6FFF]/15 border border-[#7C6FFF]/30 backdrop-blur-md shadow-[0_0_16px_rgba(124,111,255,0.2)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B8FFF] shadow-[0_0_6px_#9B8FFF]" />
            <span className="text-[11px] font-semibold tracking-[0.08em] text-[#9B8FFF] uppercase">
              YOUR PERSONAL DIGITAL NOTEBOOK
            </span>
          </motion.div>

          {/* Hero Headline with Tokenized Reveal Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 20,
              delay: 0.1,
            }}
            className="text-[44px] sm:text-[54px] lg:text-[60px] font-bold text-[#F5F4F0] leading-[1.08] tracking-[-1.8px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          >
            Your thoughts.
            <br />
            <span className="text-white">Beautifully organized.</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.2,
              ease: [0.44, 0, 0.56, 1],
            }}
            className="text-[17px] sm:text-[18px] text-[#F5F4F0]/70 font-normal leading-[1.65] max-w-[460px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            A calm, intelligent space for everything on your mind. Capture ideas,
            organize your thoughts, and return to what matters.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.3,
              ease: [0.44, 0, 0.56, 1],
            }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.button
              onClick={() => onOpenAuth?.('signup')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="px-8 py-3.5 bg-[#7C6FFF] hover:bg-[#8e82ff] text-white text-[16px] font-medium rounded-[10px] shadow-[0_0_28px_rgba(124,111,255,0.55),0_8px_20px_rgba(124,111,255,0.3)] transition-all cursor-pointer inline-flex items-center justify-center"
            >
              Start writing
            </motion.button>

            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.44, 0, 0.56, 1] }}
              className="px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md text-[#F5F4F0]/80 hover:text-[#F5F4F0] text-[16px] font-normal rounded-[10px] border border-white/15 transition-all cursor-pointer inline-flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              Explore the experience
            </motion.a>
          </motion.div>
        </div>

        {/* Hero Right Column — Layered Floating Notes Scene */}
        <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[500px] flex items-center justify-center">
          <div className="relative w-full max-w-[580px] h-[480px]">
            {/* Note 2 (Project Ideas) - Purple Card (Behind) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: -30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -7, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                opacity: { duration: 0.7, ease: [0.44, 0, 0.56, 1] },
                scale: { type: 'spring', stiffness: 90, damping: 16 },
                y: {
                  repeat: Infinity,
                  duration: 3.8,
                  ease: [0.44, 0, 0.56, 1],
                },
                rotate: {
                  repeat: Infinity,
                  duration: 3.8,
                  ease: [0.44, 0, 0.56, 1],
                },
              }}
              whileHover={{ scale: 1.03, zIndex: 35 }}
              className="absolute top-[20px] sm:top-[30px] right-[20px] sm:right-[30px] w-[240px] sm:w-[270px] min-h-[170px] bg-[#EDE8FF] rounded-[14px] p-5 shadow-[0_24px_48px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.25)] z-20 cursor-pointer select-none transition-shadow"
            >
              <div className="text-[14px] font-semibold text-[#2D1B69] mb-2.5">
                Project Ideas
              </div>
              <div className="text-[12px] text-[#2D1B69]/65 font-normal leading-[1.65] flex flex-col gap-1">
                <div>→ Campus navigation app</div>
                <div>→ ML stress detection</div>
                <div>→ UrbanPulse dashboard</div>
                <div>→ Portfolio redesign</div>
              </div>
            </motion.div>

            {/* Note 1 (Main Note - Machine Learning Revision) - Cream Card (Front Center) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.6, ease: [0.44, 0, 0.56, 1] },
                scale: { type: 'spring', stiffness: 100, damping: 18 },
                y: {
                  repeat: Infinity,
                  duration: 4.0,
                  ease: [0.44, 0, 0.56, 1],
                },
              }}
              whileHover={{ scale: 1.02, zIndex: 36 }}
              className="absolute top-[60px] sm:top-[70px] left-[10px] sm:left-[30px] w-[290px] sm:w-[340px] min-h-[230px] bg-[#F5F3EE] rounded-[16px] p-6 shadow-[0_0_0_1px_rgba(124,111,255,0.2),0_0_80px_rgba(124,111,255,0.18),0_40px_80px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.4)] z-30 cursor-pointer select-none"
            >
              <div className="flex items-center justify-between mb-3 border-b border-[#1A1A2E]/[0.08] pb-2">
                <span className="text-[15px] font-semibold text-[#1A1A2E] tracking-[-0.3px]">
                  Machine Learning Revision
                </span>
                <span className="text-[11px] font-normal text-[#1A1A2E]/40">
                  Nov 20
                </span>
              </div>
              <div className="text-[13px] text-[#1A1A2E]/70 font-normal leading-[1.75] flex flex-col gap-1">
                <div>• Gradient Descent optimization</div>
                <div>• Backpropagation fundamentals</div>
                <div>• Neural network architectures</div>
                <div>• Regularization techniques</div>
              </div>
            </motion.div>

            {/* Note 4 (Things to Remember) - Light Blue (Right Middle) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -5, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.1, ease: [0.44, 0, 0.56, 1] },
                scale: { type: 'spring', stiffness: 85, damping: 17 },
                y: {
                  repeat: Infinity,
                  duration: 5.0,
                  ease: [0.44, 0, 0.56, 1],
                },
                rotate: {
                  repeat: Infinity,
                  duration: 5.0,
                  ease: [0.44, 0, 0.56, 1],
                },
              }}
              whileHover={{ scale: 1.03, zIndex: 35 }}
              className="absolute top-[250px] sm:top-[260px] right-[10px] sm:right-[40px] w-[210px] sm:w-[240px] min-h-[120px] bg-[#E8F4FF] rounded-[12px] p-4 shadow-[0_16px_32px_rgba(0,0,0,0.35),0_4px_8px_rgba(0,0,0,0.15)] z-10 cursor-pointer select-none"
            >
              <div className="text-[13px] font-semibold text-[#0A2A4A] mb-1.5">
                Things to Remember
              </div>
              <div className="text-[11px] text-[#0A2A4A]/60 font-normal leading-[1.6] flex flex-col gap-0.5">
                <div>Call advisor about thesis</div>
                <div>Submit lab reports by Friday</div>
                <div>Book haircut appointment</div>
              </div>
            </motion.div>

            {/* Note 3 (Weekend Plans) - Amber Card (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -9, 0],
                rotate: [0, -0.8, 0],
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.15, ease: [0.44, 0, 0.56, 1] },
                scale: { type: 'spring', stiffness: 80, damping: 15 },
                y: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: [0.44, 0, 0.56, 1],
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: [0.44, 0, 0.56, 1],
                },
              }}
              whileHover={{ scale: 1.03, zIndex: 35 }}
              className="absolute top-[310px] sm:top-[320px] left-[0px] sm:left-[20px] w-[220px] sm:w-[240px] min-h-[155px] bg-[#FFF8ED] rounded-[14px] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_4px_10px_rgba(0,0,0,0.2)] z-20 cursor-pointer select-none"
            >
              <div className="text-[14px] font-semibold text-[#2A1800] mb-1.5">
                Weekend Plans
              </div>
              <div className="text-[11.5px] text-[#2A1800]/60 font-normal leading-[1.65] flex flex-col gap-0.5">
                <div>— Morning run at the park</div>
                <div>— Finish ML textbook ch.4</div>
                <div>— Guitar practice — 30 min</div>
                <div>— Flight check-in reminder</div>
              </div>
            </motion.div>

            {/* Floating Cursor (with typing caret) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: [0, 6, 0],
                y: [0, -4, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.4 },
                x: { repeat: Infinity, duration: 4.2, ease: [0.44, 0, 0.56, 1] },
                y: { repeat: Infinity, duration: 3.5, ease: [0.44, 0, 0.56, 1] },
              }}
              className="absolute top-[280px] left-[90px] sm:left-[110px] w-7 h-7 rounded-[6px] bg-[#7C6FFF]/25 border border-[#7C6FFF]/45 flex items-center justify-center z-40 pointer-events-none shadow-[0_0_16px_rgba(124,111,255,0.45)] backdrop-blur-sm"
            >
              <span className="text-[18px] font-light text-white/90 animate-pulse">
                |
              </span>
            </motion.div>

            {/* Floating Tag (48 notes synced) - Glowing Purple Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 },
                scale: { type: 'spring', stiffness: 120, damping: 15 },
                y: {
                  repeat: Infinity,
                  duration: 3.2,
                  ease: [0.44, 0, 0.56, 1],
                },
              }}
              whileHover={{ scale: 1.08 }}
              className="absolute top-[395px] sm:top-[410px] left-[210px] sm:left-[240px] inline-flex items-center gap-2 px-4 py-2 bg-[#7C6FFF] rounded-full shadow-[0_0_24px_rgba(124,111,255,0.6),0_8px_20px_rgba(124,111,255,0.3)] z-40 cursor-pointer select-none"
            >
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
              <span className="text-[12px] font-medium text-white tracking-wide">
                48 notes synced
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
