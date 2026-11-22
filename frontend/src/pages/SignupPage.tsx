import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (path: string) => void;
  onSignupSuccess?: (user: { name: string; email: string }) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onNavigate,
  onSignupSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !agreedToTerms) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0];
      onSignupSuccess?.({ name: fullName, email });
      onNavigate('/');
    }, 900);
  };

  const featureList = [
    {
      title: 'Instant capture',
      desc: 'Get ideas out of your head in seconds',
    },
    {
      title: 'Smart organization',
      desc: 'Find any note instantly with powerful search',
    },
    {
      title: 'Calm workspace',
      desc: 'A distraction-free space built for focus',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-[#F5F4F0] flex flex-col lg:flex-row select-none relative overflow-x-hidden">
      {/* ================= LEFT PANEL ================= */}
      <div className="relative w-full lg:w-[560px] min-h-[480px] lg:min-h-screen bg-[#0d0d18] p-8 sm:p-14 flex flex-col justify-between overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
        {/* Dark Silk Waves Background Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/hero-bg.png"
            alt="Noteflow Silk Waves"
            className="w-full h-full object-cover object-center opacity-45 filter contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-[#0d0d18]/70" />
        </div>

        {/* Top: Brand Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#7C6FFF] to-[#5142E6] flex items-center justify-center text-white shadow-[0_0_14px_rgba(124,111,255,0.4)] group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-white"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <span className="text-[22px] font-bold text-[#F5F4F0] tracking-[-0.4px]">
              Noteflow
            </span>
          </button>
        </div>

        {/* Center: Heading & Feature List */}
        <div className="relative z-10 my-10 lg:my-auto flex flex-col gap-7 max-w-[380px]">
          <h2 className="text-[28px] sm:text-[30px] font-bold text-[#F5F4F0] leading-[1.25] tracking-[-0.6px]">
            Start organizing your mind today
          </h2>

          <div className="flex flex-col gap-6">
            {featureList.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                className="flex items-start gap-3.5"
              >
                {/* Glowing Double Dot */}
                <div className="w-5 h-5 rounded-full bg-[#7C6FFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-[7px] h-[7px] rounded-full bg-[#9B8FFF] shadow-[0_0_8px_#7C6FFF]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold text-[#F5F4F0] leading-none">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-[#F5F4F0]/45 leading-snug">
                    {item.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom: Tagline */}
        <div className="relative z-10 pt-4 border-t border-white/[0.08]">
          <p className="text-[13px] text-[#F5F4F0]/40 font-normal">
            Join thousands of thinkers who chose Noteflow.
          </p>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="relative flex-1 min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        {/* Back to Home Link */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="self-start lg:absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-[14px] text-[#F5F4F0]/50 hover:text-white transition-colors cursor-pointer mb-8 lg:mb-0 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to home</span>
        </button>

        {/* Signup Form Container (Exact 420px width from Framer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
          className="w-full max-w-[420px] flex flex-col gap-5 relative z-10"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-[#F5F4F0] tracking-[-0.8px] leading-tight">
              Create your account
            </h1>
            <p className="text-[15px] text-[#F5F4F0]/50 font-normal">
              Free forever. No credit card needed.
            </p>
            <div className="w-full h-[1px] bg-white/[0.08] mt-2" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Row (First name & Last name side by side) */}
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="signup-first-name"
                  className="text-[13px] font-medium text-[#F5F4F0]/70"
                >
                  First name
                </label>
                <input
                  id="signup-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Suleman"
                  className="w-full h-[48px] bg-white/[0.05] border border-white/10 rounded-[10px] px-4 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/25 focus:outline-none focus:border-[#7C6FFF] focus:ring-1 focus:ring-[#7C6FFF] transition-all"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="signup-last-name"
                  className="text-[13px] font-medium text-[#F5F4F0]/70"
                >
                  Last name
                </label>
                <input
                  id="signup-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Asghar"
                  className="w-full h-[48px] bg-white/[0.05] border border-white/10 rounded-[10px] px-4 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/25 focus:outline-none focus:border-[#7C6FFF] focus:ring-1 focus:ring-[#7C6FFF] transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-email"
                className="text-[13px] font-medium text-[#F5F4F0]/70"
              >
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-[48px] bg-white/[0.05] border border-white/10 rounded-[10px] px-4 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/25 focus:outline-none focus:border-[#7C6FFF] focus:ring-1 focus:ring-[#7C6FFF] transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-password"
                className="text-[13px] font-medium text-[#F5F4F0]/70"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="w-full h-[48px] bg-white/[0.05] border border-white/10 rounded-[10px] pl-4 pr-11 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/25 focus:outline-none focus:border-[#7C6FFF] focus:ring-1 focus:ring-[#7C6FFF] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 text-[#F5F4F0]/40 hover:text-white transition-colors cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[12px] text-[#F5F4F0]/35 font-normal leading-normal mt-0.5">
                Use 8 or more characters with a mix of letters and numbers.
              </p>
            </div>

            {/* Terms Row Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <button
                type="button"
                id="terms-checkbox"
                role="checkbox"
                aria-checked={agreedToTerms}
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`w-[18px] h-[18px] rounded-[4px] border shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${
                  agreedToTerms
                    ? 'bg-[#7C6FFF] border-[#7C6FFF] text-white shadow-[0_0_8px_rgba(124,111,255,0.5)]'
                    : 'bg-white/[0.05] border-white/20 hover:border-white/40'
                }`}
              >
                {agreedToTerms && <Check size={12} strokeWidth={3} />}
              </button>
              <label
                htmlFor="terms-checkbox"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className="text-[13px] text-[#F5F4F0]/45 font-normal leading-snug cursor-pointer select-none"
              >
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            {/* Submit Button (Exact 50px height from Framer) */}
            <motion.button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              whileHover={{ scale: agreedToTerms ? 1.02 : 1 }}
              whileTap={{ scale: agreedToTerms ? 0.98 : 1 }}
              className="mt-1 w-full h-[50px] bg-[#7C6FFF] hover:bg-[#8E82FF] text-white text-[15px] font-semibold rounded-[10px] shadow-[0_4px_20px_rgba(124,111,255,0.3)] transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Create free account</span>
              )}
            </motion.button>
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full border-t border-white/[0.08]" />
            <span className="absolute px-3 bg-[#0a0a0f] text-[12px] font-normal text-[#F5F4F0]/35">
              or sign up with
            </span>
          </div>

          {/* Social Buttons (Exact 46px height from Framer) */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setFirstName('Alex');
                setLastName('Thinker');
                setEmail('alex.thinker@gmail.com');
                setPassword('CalmFlow2026!');
                setAgreedToTerms(true);
              }}
              className="flex-1 h-[46px] bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-[10px] flex items-center justify-center gap-2 text-[14px] text-[#F5F4F0]/70 hover:text-white transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.2C.7 9.6 0 12.2 0 15s.7 5.4 1.9 7.8l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.3 7.5 23 12 23z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFirstName('Builder');
                setLastName('Dev');
                setEmail('builder@github.com');
                setPassword('CalmFlow2026!');
                setAgreedToTerms(true);
              }}
              className="flex-1 h-[46px] bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-[10px] flex items-center justify-center gap-2 text-[14px] text-[#F5F4F0]/70 hover:text-white transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Switch to Login */}
          <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#F5F4F0]/45 pt-1">
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="text-[#9B8FFF] font-medium hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </motion.div>

        {/* Signup Decor Note (Exact Framer Component on bottom right) */}
        <div className="hidden xl:flex absolute bottom-10 right-10 w-[220px] bg-[#7c6fff0d] border border-[#7c6fff1a] shadow-[inset_0_0_0_1px_rgba(124,111,255,0.12)] rounded-[12px] p-[18px] flex-col gap-2 z-0 opacity-70 pointer-events-none">
          <span className="text-[11px] font-semibold text-[#F5F4F0]/40 uppercase tracking-[0.05em] leading-tight">
            Free account includes
          </span>
          <div className="flex flex-col gap-1 text-[12px] text-[#F5F4F0]/30 font-normal leading-[1.5]">
            <span>- Unlimited notes</span>
            <span>- Powerful search</span>
            <span>- Sync across devices</span>
          </div>
        </div>
      </div>
    </div>
  );
};
