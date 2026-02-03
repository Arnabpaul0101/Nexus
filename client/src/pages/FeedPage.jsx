import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, PlusCircle, X, Send } from 'lucide-react';
import API from '../services/api';
import toast from 'react-hot-toast';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [postCategory, setPostCategory] = useState('Engineering');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = useMemo(() => ['All', 'Engineering', 'Design', 'General', 'HR'], []);
  const postCategories = useMemo(() => ['Engineering', 'Design', 'General', 'HR'], []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (keyword.trim()) params.keyword = keyword.trim();
      if (category !== 'All') params.category = category;
      const response = await API.get('/posts', { params });
      setPosts(response.data);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to load the feed.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [keyword, category]);

  const resetForm = () => {
    setContent('');
    setPostCategory('Engineering');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      toast.error('Please write your pulse update.');
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post('/posts', { content, category: postCategory });
      toast.success('Pulse posted successfully.');
      resetForm();
      setIsOpen(false);
      fetchPosts();
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to post. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Pulse Feed</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Browse structured updates from across your organization.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700"
          >
            <PlusCircle size={18} />
            Create Pulse
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 md:flex-row md:items-center">
          <div className="flex-1">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search pulses by keyword"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-500/20"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {isLoading && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
              Loading pulses...
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
              No pulses found. Try a different keyword or category.
            </div>
          )}

          {!isLoading && posts.map((post) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {post.author?.name || 'Anonymous'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Just now'}
                  </div>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                  {post.category}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {post.content}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">New pulse</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Share a concise update with your team.</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Category</label>
                  <select
                    value={postCategory}
                    onChange={(event) => setPostCategory(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-500/20"
                  >
                    {postCategories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Pulse update</label>
                  <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-500/20"
                    placeholder="Share what shipped, what you learned, or a key decision..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                  >
                    {isSubmitting ? 'Posting...' : 'Post pulse'}
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedPage;
