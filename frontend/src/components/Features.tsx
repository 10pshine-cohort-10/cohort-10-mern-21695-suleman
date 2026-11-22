import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '/',
    title: 'Instant capture',
    body: 'Press a shortcut and start writing. Zero friction between your thought and the note.',
  },
  {
    icon: '#',
    title: 'Smart organization',
    body: 'Notes automatically surface when you need them. Powerful search across all your content.',
  },
  {
    icon: '○',
    title: 'Calm workspace',
    body: 'A focused, distraction-free environment designed to help you think clearly.',
  },
];

export const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="relative w-full bg-[#0d0d14] py-24 md:py-28 px-6 sm:px-12 lg:px-24 flex flex-col items-center justify-center border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] w-full flex flex-col items-center gap-16">
        {/* S1 Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-[680px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
            className="text-[11px] font-semibold text-[#9B8FFF] tracking-[0.1em] uppercase"
          >
            CAPTURE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.44, 0, 0.56, 1] }}
            className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-[#F5F4F0] leading-[1.1] tracking-[-1.5px]"
          >
            Every thought deserves a place.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
            className="text-[16px] sm:text-[17px] font-normal text-[#F5F4F0]/50 leading-[1.65]"
          >
            Capture fleeting thoughts before they vanish. Noteflow gives you a
            frictionless space to get ideas out of your head and into a place
            you can always return to.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.44, 0, 0.56, 1],
              }}
              whileHover={{
                y: -6,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#7C6FFF',
              }}
              className="group relative bg-white/[0.03] rounded-[16px] p-8 border-t-2 border-t-transparent border-x border-b border-white/[0.05] transition-all duration-300 flex flex-col items-start gap-4 shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-[10px] bg-[#7C6FFF]/10 border border-[#7C6FFF]/25 flex items-center justify-center text-[#7C6FFF] group-hover:scale-110 group-hover:bg-[#7C6FFF]/20 transition-all duration-200">
                <span className="text-[20px] font-mono font-medium leading-none">
                  {feature.icon}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="text-[17px] font-semibold text-[#F5F4F0] tracking-[-0.3px] group-hover:text-white transition-colors">
                {feature.title}
              </h3>

              {/* Card Body */}
              <p className="text-[14px] font-normal text-[#F5F4F0]/50 leading-[1.65] group-hover:text-[#F5F4F0]/70 transition-colors">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
