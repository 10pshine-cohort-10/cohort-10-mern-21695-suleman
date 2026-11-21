import React from 'react';

const tickerItems = [
  'Instant capture',
  'Beautiful notes',
  'Smart search',
  'Calm workspace',
  'Synced everywhere',
  'Zero friction',
  'Your ideas, organized',
];

export const Ticker: React.FC = () => {
  return (
    <div className="w-full h-[52px] bg-white/[0.03] border-y border-white/[0.06] overflow-hidden flex items-center select-none">
      <div className="animate-ticker flex items-center gap-[60px] whitespace-nowrap py-1">
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
          (item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-[13px] font-normal text-[#F5F4F0]/40 hover:text-[#F5F4F0]/80 tracking-[0.02em] transition-colors cursor-default"
            >
              <span className="text-[#7C6FFF] text-[10px] leading-none">✦</span>
              <span>{item}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};
