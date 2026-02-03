const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900 dark:text-white">DevPulse</div>
          <p className="mt-2 max-w-md text-sm">
            Centralized, structured updates that keep engineering teams aligned.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="text-slate-600 hover:text-indigo-600 dark:text-slate-300">Product</button>
          <button className="text-slate-600 hover:text-indigo-600 dark:text-slate-300">Security</button>
          <button className="text-slate-600 hover:text-indigo-600 dark:text-slate-300">Careers</button>
          <button className="text-slate-600 hover:text-indigo-600 dark:text-slate-300">Contact</button>
        </div>
        <div className="text-xs">? 2026 DevPulse. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
