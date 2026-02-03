import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const HomePage = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-500/20" />
          <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                DevPulse Platform
              </motion.span>
              <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                The structured pulse feed that keeps teams aligned.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                DevPulse is a centralized internal communication hub where team members can pulse updates, technical breakthroughs, and company news. Replace scattered Slack threads with a structured, searchable feed of high-value updates.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/feed"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700"
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/feed"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400"
                >
                  View Pulse Feed
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Focused updates', text: 'Curated pulses keep everyone aligned without noisy chatter.' },
                  { title: 'Searchable memory', text: 'Find decisions, experiments, and learnings in seconds.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/40"
            >
              <div className="space-y-5">
                <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pulse of the day</div>
                  <div className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">New auth service shipped with 40% faster token refresh.</div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    Platform team ? 2 hours ago
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">Design review recap</div>
                      <div className="text-xs text-slate-500">3 action items, 1 decision logged</div>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-1.5 w-2/3 rounded-full bg-indigo-500" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pulse health</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">92%</div>
                      <div className="text-xs text-slate-500">Teams aligned this week</div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
                      <ShieldCheck size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">A structured pulse feed for the entire company.</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                DevPulse keeps engineering, product, and leadership aligned with a single source of truth. Teams can post updates tagged by category, search by keyword, and surface the most impactful work without endless message scrolls.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { title: 'Intentional categories', text: 'Keep posts organized by engineering, design, HR, and general updates.' },
                  { title: 'Powerful search', text: 'Find past updates, decisions, and launch notes instantly.' },
                  { title: 'Trusted summaries', text: 'Dashboards highlight the most important pulses each week.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Search-first feed', text: 'Filter by keyword, author, or category in seconds.', icon: <Search size={20} /> },
                { title: 'Momentum tracking', text: 'Highlight wins and blockers without daily standups.', icon: <Sparkles size={20} /> },
                { title: 'Team trust', text: 'Create a transparent stream of engineering context.', icon: <ShieldCheck size={20} /> },
                { title: 'Shared outcomes', text: 'Keep leadership aligned with delivery milestones.', icon: <ArrowRight size={20} /> },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-slate-950 py-14 text-slate-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Turn every update into shared momentum.</h2>
              <p className="mt-2 text-slate-300">Connect your teams with a pulse feed built for focus.</p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200">
              Book a demo
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
