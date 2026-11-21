import React from 'react';
import { motion } from 'framer-motion';

interface CTAProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenAuth }) => {
  return (
    <section className="relative w-full bg-[#0a0a0f] py-28 md:py-36 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/[0.06]">
      {/* CTA Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none z-0 bg-[radial-gradient(50%_50%,rgba(124,111,255,0.22)_0%,rgba(10,10,15,0)_70%)]" />

      <div className="relative z-10 max-w-[800px] flex flex-col items-center gap-7">
        {/* CTA Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#7C6FFF]/15 border border-[#7C6FFF]/30 text-[13px] font-normal text-[#9B8FFF] shadow-[0_0_16px_rgba(124,111,255,0.2)]"
        >
          Free to start. No credit card required.
        </motion.div>

        {/* CTA Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.44, 0, 0.56, 1] }}
          className="text-[38px] sm:text-[56px] lg:text-[72px] font-bold text-[#F5F4F0] leading-[1.07] tracking-[-2.5px]"
        >
          Make space for your next idea.
        </motion.h2>

        {/* CTA Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
          className="text-[16px] sm:text-[18px] font-normal text-[#F5F4F0]/50 leading-[1.5] max-w-[500px]"
        >
          Join thousands of thinkers who’ve found a calmer way to work.
        </motion.p>

        {/* Final CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.44, 0, 0.56, 1] }}
          className="pt-3"
        >
          <motion.button
            onClick={() => onOpenAuth?.('signup')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="px-10 sm:px-12 py-4 sm:py-4.5 bg-[#7C6FFF] hover:bg-[#8e82ff] text-white text-[17px] font-medium rounded-[12px] shadow-[0_8px_32px_rgba(124,111,255,0.4)] transition-all cursor-pointer inline-flex items-center justify-center"
          >
            Start writing — it’s free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
