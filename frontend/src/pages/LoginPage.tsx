import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { authApi } from '../lib/authApi';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  onLoginSuccess?: (user: { email: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setError('');
    setIsLoading(true);
    try {
      const res = await authApi.login({ email, password });
      onLoginSuccess?.({ email: res.user?.email ?? email });
      onNavigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-[#F5F4F0] flex flex-col lg:flex-row select-none">
      {/* ================= LEFT PANEL ================= */}
      <div className="relative w-full lg:w-[560px] min-h-[460px] lg:min-h-screen bg-[#0d0d18] p-8 sm:p-14 flex flex-col justify-between overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
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

        {/* Center: Quote & Floating Decor Note */}
        <div className="relative z-10 my-10 lg:my-auto flex flex-col gap-6 max-w-[420px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-[24px] sm:text-[26px] font-medium text-[#F5F4F0]/90 leading-[1.35] tracking-[-0.3px]">
              “The best way to organize your thoughts is to give them a home.”
            </h2>
            <p className="text-[13px] font-normal text-[#F5F4F0]/40">
              — Noteflow, your digital notebook
            </p>
          </div>

          {/* Floating Decor Note (Exact Framer Component) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-[280px] bg-white/[0.07] border border-white/[0.08] backdrop-blur-md rounded-[12px] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C6FFF] shadow-[0_0_6px_#7C6FFF]" />
              <span className="text-[11px] font-semibold text-[#F5F4F0]/50 uppercase tracking-wider">
                Quick note
              </span>
            </div>
            <p className="text-[12px] text-[#F5F4F0]/70 font-normal leading-[1.5]">
              Ideas worth keeping deserve a great home.
            </p>
          </motion.div>
        </div>

        {/* Bottom: Stats Row */}
        <div className="relative z-10 flex items-center gap-8 sm:gap-10 pt-4 border-t border-white/[0.08]">
          <div className="flex flex-col gap-1">
            <span className="text-[24px] font-bold text-[#F5F4F0] tracking-tight">
              10k+
            </span>
            <span className="text-[12px] text-[#F5F4F0]/40 font-normal">
              Notes created
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[24px] font-bold text-[#F5F4F0] tracking-tight">
              2 min
            </span>
            <span className="text-[12px] text-[#F5F4F0]/40 font-normal">
              Setup time
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[24px] font-bold text-[#F5F4F0] tracking-tight">
              Free
            </span>
            <span className="text-[12px] text-[#F5F4F0]/40 font-normal">
              To get started
            </span>
          </div>
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

        {/* Login Form Container (Exact 400px width from Framer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
          className="w-full max-w-[400px] flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-[#F5F4F0] tracking-[-0.8px] leading-tight">
              Welcome back
            </h1>
            <p className="text-[15px] text-[#F5F4F0]/50 font-normal">
              Sign in to your Noteflow account
            </p>
            <div className="w-full h-[1px] bg-white/[0.08] mt-3" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-[13px] font-medium text-[#F5F4F0]/70"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-[48px] bg-white/[0.05] border border-white/10 rounded-[10px] px-4 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/25 focus:outline-none focus:border-[#7C6FFF] focus:ring-1 focus:ring-[#7C6FFF] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-[13px] font-medium text-[#F5F4F0]/70"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email!')}
                  className="text-[12px] font-normal text-[#9B8FFF] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
            </div>

            {/* Error Banner */}
            {error && (
              <div
                role="alert"
                className="rounded-[10px] px-4 py-3 text-[13px] text-red-300 bg-red-900/20 border border-red-500/30"
              >
                {error}
              </div>
            )}

            {/* Submit Button (Exact 50px height from Framer) */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-1 w-full h-[50px] bg-[#7C6FFF] hover:bg-[#8E82FF] text-white text-[15px] font-semibold rounded-[10px] shadow-[0_4px_20px_rgba(124,111,255,0.3)] transition-all cursor-pointer flex items-center justify-center disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Sign in</span>
              )}
            </motion.button>
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-white/[0.08]" />
            <span className="absolute px-3 bg-[#0a0a0f] text-[12px] font-normal text-[#F5F4F0]/35">
              or continue with
            </span>
          </div>

          {/* Social Buttons (Exact 46px height from Framer) */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setEmail('alex.thinker@gmail.com');
                setPassword('CalmFlow2026!');
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
                setEmail('builder@github.com');
                setPassword('CalmFlow2026!');
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

          {/* Switch to Signup */}
          <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#F5F4F0]/45 pt-1">
            <span>Don’t have an account?</span>
            <button
              type="button"
              onClick={() => onNavigate('/signup')}
              className="text-[#9B8FFF] font-medium hover:underline cursor-pointer"
            >
              Create one
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
