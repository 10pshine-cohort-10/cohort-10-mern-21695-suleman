import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Search,
  Command,
} from 'lucide-react';

const navItems = [
  { name: 'Features', href: '#features', badge: null },
  { name: 'How it works', href: '#how-it-works', badge: null },
  { name: 'Workspace', href: '#about', badge: 'v2.0' },
];

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalSearch, setModalSearch] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Top ambient highlight line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C6FFF]/50 to-transparent z-[60] pointer-events-none" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 bg-[#0a0a0f]/40 backdrop-blur-md border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo with Glow */}
          <a
            href="#"
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#7C6FFF] to-[#5142E6] shadow-[0_0_16px_rgba(124,111,255,0.45)] group-hover:shadow-[0_0_24px_rgba(124,111,255,0.7)] group-hover:scale-105 transition-all duration-300">
              {/* Inner stylized notebook/pen mark */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#9B8FFF] border-2 border-[#0a0a0f] animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[20px] font-bold text-white tracking-[-0.5px]">
                Noteflow
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-[#9B8FFF] bg-[#7C6FFF]/15 border border-[#7C6FFF]/30">
                v2.4
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Animated Pill Indicator */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            {navItems.map((item) => {
              const isHovered = hoveredNav === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  className="relative px-4 py-1.5 text-[14px] font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-white/70 hover:text-white"
                >
                  {isHovered && (
                    <motion.div
                      layoutId="navbar-hover"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 25,
                      }}
                      className="absolute inset-0 bg-white/[0.08] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                  {item.badge && (
                    <span className="relative z-10 text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#7C6FFF]/25 text-[#9B8FFF] border border-[#7C6FFF]/40">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Quick Search + Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Find Shortcut Pill */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] rounded-full text-[12px] text-white/50 hover:text-white/80 transition-all cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            >
              <Search size={13} className="text-[#9B8FFF]" />
              <span>Search</span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/60 font-mono">
                <Command size={10} />K
              </kbd>
            </button>

            {/* Login button */}
            <button
              onClick={() => onOpenAuth?.('login')}
              className="px-4 py-2 text-[14px] font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Login
            </button>

            {/* Modern Gradient CTA Button with Shimmer */}
            <motion.button
              onClick={() => onOpenAuth?.('signup')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#7C6FFF] to-[#8E82FF] text-white text-[14px] font-medium shadow-[0_0_24px_rgba(124,111,255,0.45)] hover:shadow-[0_0_32px_rgba(124,111,255,0.65)] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Get Started</span>
                <Sparkles size={14} className="text-[#EDE8FF] animate-pulse" />
              </span>
              {/* Subtle hover sweep light */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-white/70 hover:text-white bg-white/[0.04] rounded-lg border border-white/[0.06]"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white bg-white/[0.04] rounded-lg border border-white/[0.06]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Glassmorphic Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#0c0c14]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-6 flex flex-col gap-5 text-[15px] shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-white/80 hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#7C6FFF]/20 text-[#9B8FFF] border border-[#7C6FFF]/30">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.('login');
                  }}
                  className="w-full py-2.5 text-center text-white/80 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-[10px] font-medium cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.('signup');
                  }}
                  className="w-full py-2.5 text-center bg-gradient-to-r from-[#7C6FFF] to-[#8E82FF] text-white font-medium rounded-[10px] shadow-[0_0_20px_rgba(124,111,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modern Quick Search Modal (Command+K) */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearchModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[560px] bg-[#12121d] border border-white/[0.12] rounded-[16px] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
                <Search size={18} className="text-[#9B8FFF]" />
                <input
                  type="text"
                  autoFocus
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  placeholder="Search notes, features, or jump to section..."
                  className="flex-1 bg-transparent text-[15px] text-[#F5F4F0] placeholder-[#F5F4F0]/30 outline-none"
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="text-white/40 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Suggestions List */}
              <div className="p-3 max-h-[300px] overflow-y-auto flex flex-col gap-1 text-[13px]">
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-3 py-1">
                  Jump to
                </span>
                {[
                  {
                    title: 'Machine Learning Revision',
                    cat: 'Note #machine-learning',
                    href: '#about',
                  },
                  {
                    title: 'Smart Organization Features',
                    cat: 'Feature',
                    href: '#features',
                  },
                  {
                    title: 'Interactive Connected Notes',
                    cat: 'How it works',
                    href: '#how-it-works',
                  },
                  {
                    title: 'Start writing for free',
                    cat: 'Action',
                    href: '#about',
                  },
                ]
                  .filter((item) =>
                    item.title.toLowerCase().includes(modalSearch.toLowerCase())
                  )
                  .map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setShowSearchModal(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="text-[11px] font-mono text-[#9B8FFF]">
                        {item.cat}
                      </span>
                    </a>
                  ))}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
                <span>Press ESC to close</span>
                <span className="text-[#9B8FFF]">Noteflow Instant Search</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
