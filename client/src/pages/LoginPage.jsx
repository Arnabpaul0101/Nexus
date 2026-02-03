import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  const hasWelcomed = useRef(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (user && !hasWelcomed.current) {
      toast.success(`Welcome back, ${user.name || 'there'}!`);
      hasWelcomed.current = true;
      navigate('/dashboard');
    }
    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  const onSubmit = (data) => dispatch(login(data));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-500/20" />
          <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/20" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid w-full gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
                Welcome back to DevPulse.
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Log in to review the latest pulses, share updates, and keep your team aligned.
              </p>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-black/40">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">What you can do</div>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    Scan the pulse feed in minutes.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    Share breakthroughs with your org.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    Stay aligned across teams.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full"
            >
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Sign in</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use your work email to continue.</p>
                  </div>
                  <span className="hidden sm:inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                    DevPulse
                  </span>
                </div>

                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                  >
                    {message}
                  </motion.p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email Address</label>
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:focus-within:ring-indigo-500/20">
                      <Mail size={18} className="text-slate-400" />
                      <input
                        {...register('email')}
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
                        placeholder="name@company.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:focus-within:ring-indigo-500/20">
                      <Lock size={18} className="text-slate-400" />
                      <input
                        type="password"
                        {...register('password')}
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
                        placeholder="????????"
                      />
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                  >
                    {isLoading ? 'Signing in...' : 'Continue'}
                    <ArrowRight size={16} />
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
