import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Shield,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess?: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync initialMode when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen, initialMode]);

  // Escape key handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Calculate password strength for sign up
  const calculateStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0 to 4
  };

  const strength = calculateStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#FF6B6B', '#F5A623', '#7C6FFF', '#3DD68C'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (mode === 'signup' && !name) return;

    setLoading(true);

    // Simulate smooth auth network trip
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSuccess) {
        onSuccess({
          name: name || email.split('@')[0],
          email,
        });
      }
      setTimeout(() => {
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-[460px] bg-[#12121d] border border-white/[0.1] rounded-[24px] shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden z-10"
          >
            {/* Ambient Background Glow inside modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[180px] pointer-events-none bg-[radial-gradient(50%_50%,rgba(124,111,255,0.25)_0%,transparent_70%)]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.06] text-white/50 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Success State */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#7C6FFF]/20 border border-[#7C6FFF]/40 flex items-center justify-center text-[#7C6FFF] shadow-[0_0_30px_rgba(124,111,255,0.5)]">
                  <Check size={32} />
                </div>
                <h3 className="text-[22px] font-bold text-white tracking-[-0.3px]">
                  {mode === 'signup'
                    ? 'Account created successfully!'
                    : 'Welcome back!'}
                </h3>
                <p className="text-[14px] text-[#F5F4F0]/60 max-w-[280px]">
                  Syncing your calm workspace and 48 sample revision notes...
                </p>
                <div className="w-8 h-1 bg-[#7C6FFF] rounded-full animate-pulse mt-2" />
              </motion.div>
            ) : (
              <div>
                {/* Brand Header */}
                <div className="flex flex-col items-center text-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#7C6FFF] to-[#5142E6] shadow-[0_0_20px_rgba(124,111,255,0.5)] flex items-center justify-center text-white mb-1">
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
                    </svg>
                  </div>

                  <h2 className="text-[22px] font-bold text-[#F5F4F0] tracking-[-0.4px]">
                    {mode === 'login'
                      ? 'Welcome back to Noteflow'
                      : 'Create your Noteflow workspace'}
                  </h2>
                  <p className="text-[13px] text-[#F5F4F0]/50">
                    {mode === 'login'
                      ? 'Sign in to access your thoughts and synced notes.'
                      : 'A quiet, intelligent space for everything on your mind.'}
                  </p>
                </div>

                {/* Animated Mode Switcher Tabs */}
                <div className="relative flex p-1 bg-white/[0.04] border border-white/[0.06] rounded-[12px] mb-6">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`relative flex-1 py-2 text-[13px] font-medium transition-colors cursor-pointer text-center z-10 ${
                      mode === 'login' ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {mode === 'login' && (
                      <motion.div
                        layoutId="auth-tab-pill"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="absolute inset-0 bg-[#7C6FFF] rounded-[9px] shadow-[0_0_16px_rgba(124,111,255,0.5)]"
                      />
                    )}
                    <span className="relative z-10">Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`relative flex-1 py-2 text-[13px] font-medium transition-colors cursor-pointer text-center z-10 ${
                      mode === 'signup' ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {mode === 'signup' && (
                      <motion.div
                        layoutId="auth-tab-pill"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="absolute inset-0 bg-[#7C6FFF] rounded-[9px] shadow-[0_0_16px_rgba(124,111,255,0.5)]"
                      />
                    )}
                    <span className="relative z-10">Sign Up</span>
                  </button>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('alex.thinker@gmail.com');
                      setName('Alex Rivera');
                      setPassword('CalmFlow2026!');
                    }}
                    className="flex items-center justify-center gap-2 h-[42px] bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.15] rounded-[10px] text-[13px] text-[#F5F4F0]/80 hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    {/* Google SVG */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                      setName('Open Thinker');
                      setPassword('CalmFlow2026!');
                    }}
                    className="flex items-center justify-center gap-2 h-[42px] bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.15] rounded-[10px] text-[13px] text-[#F5F4F0]/80 hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    {/* GitHub SVG */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.08]" />
                  </div>
                  <span className="relative z-10 px-3 bg-[#12121d] text-[11px] font-medium text-white/40 uppercase tracking-wider">
                    Or with email
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {/* Full Name field (animated reveal for Sign Up) */}
                  <AnimatePresence>
                    {mode === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-1 overflow-hidden"
                      >
                        <label className="text-[12px] font-medium text-white/70">
                          Full Name
                        </label>
                        <div className="relative flex items-center">
                          <User
                            size={15}
                            className="absolute left-3 text-white/35 pointer-events-none"
                          />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Alex Rivera"
                            required={mode === 'signup'}
                            className="w-full h-[42px] bg-white/[0.03] border border-white/[0.08] focus:border-[#7C6FFF] rounded-[10px] pl-9 pr-3 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/30 outline-none transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-medium text-white/70">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Mail
                        size={15}
                        className="absolute left-3 text-white/35 pointer-events-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full h-[42px] bg-white/[0.03] border border-white/[0.08] focus:border-[#7C6FFF] rounded-[10px] pl-9 pr-3 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/30 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-medium text-white/70">
                        Password
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() =>
                            alert('Password reset link sent to your email!')
                          }
                          className="text-[11px] text-[#9B8FFF] hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <Lock
                        size={15}
                        className="absolute left-3 text-white/35 pointer-events-none"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full h-[42px] bg-white/[0.03] border border-white/[0.08] focus:border-[#7C6FFF] rounded-[10px] pl-9 pr-10 text-[14px] text-[#F5F4F0] placeholder-[#F5F4F0]/30 outline-none transition-colors font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-white/40 hover:text-white/80 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Password Strength Meter (Only for Sign Up) */}
                    {mode === 'signup' && password.length > 0 && (
                      <div className="flex flex-col gap-1 pt-1.5">
                        <div className="flex gap-1 h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className="flex-1 transition-all duration-300"
                              style={{
                                backgroundColor:
                                  strength >= step
                                    ? strengthColors[strength - 1]
                                    : 'transparent',
                              }}
                            />
                          ))}
                        </div>
                        <span
                          className="text-[10px] font-mono text-right"
                          style={{
                            color: strength > 0 ? strengthColors[strength - 1] : '#888',
                          }}
                        >
                          {strength > 0 ? strengthLabels[strength - 1] : 'Too short'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-white/60">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded bg-white/[0.06] border-white/[0.2] text-[#7C6FFF] focus:ring-0 cursor-pointer"
                      />
                      <span>Keep me signed in</span>
                    </label>

                    <div className="flex items-center gap-1 text-[11px] text-emerald-400/80">
                      <Shield size={12} />
                      <span>End-to-End Encrypted</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative mt-2 w-full h-[46px] bg-gradient-to-r from-[#7C6FFF] to-[#8E82FF] text-white text-[14px] font-medium rounded-[10px] shadow-[0_0_24px_rgba(124,111,255,0.45)] hover:shadow-[0_0_32px_rgba(124,111,255,0.65)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all overflow-hidden"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>
                          {mode === 'login' ? 'Sign In' : 'Create Free Account'}
                        </span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Footer Disclaimer */}
                <p className="text-center text-[11px] text-[#F5F4F0]/35 mt-5 leading-[1.5]">
                  By continuing, you agree to Noteflow's{' '}
                  <a href="#" className="text-[#9B8FFF] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#9B8FFF] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
