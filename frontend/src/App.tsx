import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Features } from './components/Features';
import { Organize } from './components/Organize';
import { ProductPreview } from './components/ProductPreview';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('login')) return '/login';
      if (path.includes('signup')) return '/signup';
    }
    return '/';
  });

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Sync route state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('login')) {
        setCurrentPath('/login');
      } else if (path.includes('signup')) {
        setCurrentPath('/signup');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    navigate(`/${mode}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f5f4f0] flex flex-col font-sans selection:bg-[#7c6fff] selection:text-white relative">
      {/* Toast Notification when user logs in or signs up */}
      <AnimatePresence>
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="fixed top-20 right-6 z-[80] bg-[#141424] border border-[#7C6FFF]/40 rounded-full px-4 py-2.5 shadow-[0_10px_30px_rgba(124,111,255,0.3)] flex items-center gap-2.5 text-[13px] text-white"
          >
            <span className="w-5 h-5 rounded-full bg-[#7C6FFF]/20 border border-[#7C6FFF] flex items-center justify-center text-[#7C6FFF]">
              <Check size={12} />
            </span>
            <span>
              Signed in as{' '}
              <strong className="text-[#9B8FFF]">{currentUser.name}</strong>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route Views */}
      {currentPath === '/login' ? (
        <LoginPage
          onNavigate={navigate}
          onLoginSuccess={(user) => {
            const displayName = user.email.split('@')[0];
            setCurrentUser({ name: displayName, email: user.email });
            setTimeout(() => setCurrentUser(null), 5000);
          }}
        />
      ) : currentPath === '/signup' ? (
        <SignupPage
          onNavigate={navigate}
          onSignupSuccess={(user) => {
            setCurrentUser(user);
            setTimeout(() => setCurrentUser(null), 5000);
          }}
        />
      ) : (
        <>
          <Navbar onOpenAuth={handleOpenAuth} />

          <main className="flex-1 flex flex-col pt-[72px]">
            <Hero onOpenAuth={handleOpenAuth} />
            <Ticker />
            <Features />
            <Organize />
            <ProductPreview />
            <CTA onOpenAuth={handleOpenAuth} />
          </main>

          <Footer onOpenAuth={handleOpenAuth} />
        </>
      )}
    </div>
  );
};

export default App;
