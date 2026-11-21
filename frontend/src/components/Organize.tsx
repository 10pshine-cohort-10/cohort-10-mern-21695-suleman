import React from 'react';
import { motion } from 'framer-motion';

const miniNotes = [
  // Row 1
  [
    {
      label: 'ML Revision',
      bg: '#F5F3EE',
      text: '#1A1A2E',
      dot: '#7C6FFF',
      w1: '80%',
      w2: '60%',
    },
    {
      label: 'Project Ideas',
      bg: '#EDE8FF',
      text: '#2D1B69',
      dot: '#9B8FFF',
      w1: '85%',
      w2: '50%',
    },
  ],
  // Row 2
  [
    {
      label: 'Weekend Plans',
      bg: '#FFF8ED',
      text: '#2A1800',
      dot: '#F5A623',
      w1: '75%',
      w2: '55%',
    },
    {
      label: 'Research Notes',
      bg: '#E8F4FF',
      text: '#0A2A4A',
      dot: '#3B9EFF',
      w1: '80%',
      w2: '65%',
    },
  ],
  // Row 3
  [
    {
      label: 'Book Summary',
      bg: '#F0FFF4',
      text: '#0A2A14',
      dot: '#3DD68C',
      w1: '70%',
      w2: '45%',
    },
    {
      label: 'Daily Journal',
      bg: '#FFF0F5',
      text: '#2A0A1A',
      dot: '#FF6B9D',
      w1: '85%',
      w2: '60%',
    },
  ],
];

export const Organize: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#0a0a0f] py-24 md:py-32 px-6 sm:px-12 lg:px-24 flex items-center justify-center border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center">
        {/* Left: Organize Visual (Mini Notes Grid) */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div className="flex flex-col gap-3 w-full max-w-[420px]">
            {miniNotes.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-3 w-full">
                {row.map((note, cIdx) => (
                  <motion.div
                    key={note.label}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: (rIdx * 2 + cIdx) * 0.08,
                      ease: [0.44, 0, 0.56, 1],
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    style={{ backgroundColor: note.bg }}
                    className="flex-1 min-h-[92px] rounded-[12px] p-4 flex flex-col justify-between shadow-[0_8px_20px_rgba(0,0,0,0.3)] cursor-pointer select-none transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: note.dot }}
                      />
                      <span
                        className="text-[12px] font-semibold tracking-[-0.2px] truncate"
                        style={{ color: note.text }}
                      >
                        {note.label}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-2">
                      <div
                        className="h-[5px] rounded-[3px] opacity-20"
                        style={{
                          backgroundColor: note.text,
                          width: note.w1,
                        }}
                      />
                      <div
                        className="h-[5px] rounded-[3px] opacity-15"
                        style={{
                          backgroundColor: note.text,
                          width: note.w2,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Organize Text */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 max-w-[500px] order-1 lg:order-2">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
            className="text-[11px] font-semibold text-[#9B8FFF] tracking-[0.1em] uppercase"
          >
            ORGANIZE
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.44, 0, 0.56, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold text-[#F5F4F0] leading-[1.15] tracking-[-1.2px]"
          >
            From scattered ideas to clear thinking.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
            className="text-[15px] sm:text-[16px] font-normal text-[#F5F4F0]/50 leading-[1.65]"
          >
            Noteflow intelligently organizes your notes so you can find exactly
            what you’re looking for — even when you don’t remember where you put
            it.
          </motion.p>

          {/* Stat Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.44, 0, 0.56, 1] }}
            className="grid grid-cols-3 gap-6 sm:gap-8 pt-4 w-full border-t border-white/[0.08]"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[28px] sm:text-[32px] font-bold text-[#F5F4F0]">
                10×
              </span>
              <span className="text-[12px] sm:text-[13px] font-normal text-[#F5F4F0]/45">
                Faster recall
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[28px] sm:text-[32px] font-bold text-[#F5F4F0]">
                ∞
              </span>
              <span className="text-[12px] sm:text-[13px] font-normal text-[#F5F4F0]/45">
                Notes, no limits
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[28px] sm:text-[32px] font-bold text-[#F5F4F0]">
                1 tap
              </span>
              <span className="text-[12px] sm:text-[13px] font-normal text-[#F5F4F0]/45">
                To capture
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
