import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, LogOut, Home, Moon, Sun, Rss } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const resolvedTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(resolvedTheme);
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 6);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const navLinks = useMemo(
    () => [
      { name: 'Home', path: '/', icon: <Home size={18} /> },
      { name: 'Feed', path: '/feed', icon: <Rss size={18} /> },
      { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    ],
    []
  );

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full border-b transition-all ${
        isScrolled
          ? 'bg-white/80 shadow-lg shadow-slate-200/60 backdrop-blur border-slate-200 dark:bg-slate-950/80 dark:border-slate-800 dark:shadow-slate-900/40'
          : 'bg-white/95 border-transparent dark:bg-slate-950/95'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-indigo-600 tracking-tight">
            DevPulse
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 bg-indigo-100/70 dark:bg-indigo-500/20'
                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {link.icon}
                {link.name}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full ring-1 ring-indigo-200/70 dark:ring-indigo-400/30"
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {!user && (
              <Link
                to="/signup"
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700"
              >
                Log in
              </Link>
            )}

            {user && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-full hover:bg-red-50 transition-colors dark:hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {!user && (
              <Link
                to="/signup"
                className="rounded-full bg-indigo-600 px-3 py-2 text-xs font-semibold text-white"
              >
                Log in
              </Link>
            )}

            <motion.button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="p-2 text-slate-600 dark:text-slate-300"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                      isActive(link.path)
                        ? 'text-indigo-600 bg-indigo-100/70 dark:bg-indigo-500/20'
                        : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </motion.div>
              ))}

              {!user && (
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Log in
                </Link>
              )}

              {user && (
                <motion.button
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-600 rounded-xl hover:bg-red-50 transition-colors dark:hover:bg-red-500/10"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
