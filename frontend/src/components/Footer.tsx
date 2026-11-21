import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Globe,
  Sparkles,
  Shield,
  Activity,
} from 'lucide-react';

interface FooterProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().includes('@')) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative w-full bg-[#0a0a0f] border-t border-white/[0.08] overflow-hidden">
      {/* Bottom Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[360px] pointer-events-none z-0 bg-[radial-gradient(50%_50%_at_50%_100%,rgba(124,111,255,0.14)_0%,rgba(10,10,15,0)_75%)]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 pt-20 pb-12 flex flex-col gap-16">
        {/* Top Newsletter / Dispatch Bar */}
        <div className="relative overflow-hidden bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border border-white/[0.08] rounded-[20px] p-8 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-[500px] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#9B8FFF] uppercase tracking-[0.08em] justify-center lg:justify-start">
              <Sparkles size={14} />
              <span>THE NOTEFLOW DISPATCH</span>
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-[#F5F4F0] tracking-[-0.5px]">
              Stay ahead with thoughtful reflections.
            </h3>
            <p className="text-[14px] text-[#F5F4F0]/50 leading-[1.6]">
              A quiet, weekly note on personal knowledge management, creative
              focus, and new feature releases.
            </p>
          </div>

          {/* Subscribe Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative w-full sm:w-[300px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address…"
                required
                className="w-full h-[46px] bg-black/40 border border-white/[0.1] rounded-[10px] px-4 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/35 focus:outline-none focus:border-[#7C6FFF]/60 focus:ring-1 focus:ring-[#7C6FFF]/40 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto h-[46px] px-6 bg-[#7C6FFF] hover:bg-[#8e82ff] text-white text-[14px] font-medium rounded-[10px] shadow-[0_0_20px_rgba(124,111,255,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {subscribed ? (
                <>
                  <Check size={16} />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-4">
          {/* Brand & Identity Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gradient-to-br from-[#7C6FFF] to-[#5142E6] shadow-[0_0_14px_rgba(124,111,255,0.4)] group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <span className="text-[20px] font-bold text-white tracking-[-0.4px]">
                Noteflow
              </span>
            </a>

            <p className="text-[14px] text-[#F5F4F0]/50 font-normal leading-[1.65] max-w-[360px]">
              A calm, frictionless digital notebook crafted for thinkers,
              builders, and researchers. Designed to get ideas out of your head
              and into clarity.
            </p>

            {/* Live Status Beacon */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[12px] text-[#F5F4F0]/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
              <Activity size={12} className="text-emerald-400/80 ml-1" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'X / Twitter', icon: '𝕏', href: '#' },
                { name: 'GitHub', icon: 'git', href: '#' },
                { name: 'Discord', icon: '👾', href: '#' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="w-9 h-9 rounded-[8px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.15] text-[#F5F4F0]/70 hover:text-white flex items-center justify-center text-[12px] font-mono transition-all duration-200"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1: Product (2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-[13px]">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">
              Product
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href="#features"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Instant Capture
              </a>
              <a
                href="#how-it-works"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Smart Organization
              </a>
              <button
                onClick={() => onOpenAuth?.('signup')}
                className="text-[#F5F4F0]/60 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span>App Workspace</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#7C6FFF]/20 text-[#9B8FFF] border border-[#7C6FFF]/40">
                  NEW
                </span>
              </button>
              <a
                href="#features"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Calm Editor
              </a>
              <a
                href="#how-it-works"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Real-time Sync
              </a>
            </div>
          </div>

          {/* Links Column 2: Resources (2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-[13px]">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">
              Resources
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Documentation is built directly into Noteflow.');
                }}
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Shortcuts: ⌘+K (Search), ⌘+N (New Note)');
                }}
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Keyboard Shortcuts
              </a>
              <a
                href="#"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                PKM Workflow Guide
              </a>
              <a
                href="#"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Community Discord
              </a>
              <a
                href="#"
                className="text-[#F5F4F0]/60 hover:text-white transition-colors"
              >
                Changelog & Releases
              </a>
            </div>
          </div>

          {/* Links Column 3: Trust & Legal (2.5 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-[13px]">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">
              Privacy & Trust
            </span>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
                <Shield size={14} />
                <span>Zero Ads, Zero Data Selling</span>
              </div>
              <p className="text-[12px] text-[#F5F4F0]/40 leading-[1.6]">
                Your thoughts belong solely to you. Everything is encrypted
                in-transit and at rest.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="#"
                  className="text-[#F5F4F0]/50 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-[#F5F4F0]/50 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-[#F5F4F0]/50 hover:text-white transition-colors"
                >
                  Security Architecture
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Locale */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#F5F4F0]/35">
          <div className="flex items-center gap-3">
            <span>© 2026 Noteflow Inc. All rights reserved.</span>
            <span>•</span>
            <span>Built with care for focused minds.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#F5F4F0]/45 hover:text-[#F5F4F0]/80 transition-colors cursor-pointer">
              <Globe size={13} />
              <span>English (US)</span>
            </div>
            <span>•</span>
            <span className="text-[#9B8FFF] font-mono text-[11px]">
              v2.4.0 (Latest)
            </span>
          </div>
        </div>
      </div>

      {/* Giant Stylized Centered Brand Display */}
      <div className="relative w-full flex items-center justify-center overflow-hidden pointer-events-none select-none pt-10 pb-8 px-4">
        <span className="text-[13vw] font-black tracking-[0.08em] sm:tracking-[0.12em] leading-none text-center uppercase whitespace-nowrap bg-gradient-to-b from-white/[0.22] via-[#7C6FFF]/[0.15] to-transparent bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(124,111,255,0.18)]">
          NotesFlow
        </span>
      </div>
    </footer>
  );
};
