import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Filter, Trash2, UserCircle, Pencil, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../services/api';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('Engineering');
  const [isSavingPost, setIsSavingPost] = useState(false);

  const categories = useMemo(() => ['All', 'Engineering', 'Design', 'General', 'HR'], []);
  const postCategories = useMemo(() => ['Engineering', 'Design', 'General', 'HR'], []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileResponse, postsResponse] = await Promise.all([
          API.get('/users/me'),
          API.get('/posts')
        ]);
        setProfile(profileResponse.data);
        setNameDraft(profileResponse.data?.name || user?.name || '');
        const userPosts = postsResponse.data.filter((post) => post.author?._id === user?._id);
        setPosts(userPosts);
      } catch (error) {
        const message = error.response?.data?.message || 'Unable to load your dashboard.';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredPosts = posts.filter((post) => {
    const matchesKeyword = keyword.trim()
      ? post.content?.toLowerCase().includes(keyword.trim().toLowerCase())
      : true;
    const matchesCategory = category === 'All' ? true : post.category === category;
    return matchesKeyword && matchesCategory;
  });

  const handleDelete = async (postId) => {
    try {
      await API.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
      toast.success('Pulse deleted.');
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to delete pulse.';
      toast.error(message);
    }
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setEditContent(post.content || '');
    setEditCategory(post.category || 'Engineering');
    setIsEditOpen(true);
  };

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    if (!editingPost) return;

    if (!editContent.trim()) {
      toast.error('Please add your update before saving.');
      return;
    }

    setIsSavingPost(true);
    try {
      const response = await API.put(`/posts/${editingPost._id}`, {
        content: editContent,
        category: editCategory,
      });
      setPosts((prev) => prev.map((post) => (post._id === editingPost._id ? response.data : post)));
      toast.success('Pulse updated.');
      setIsEditOpen(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to update pulse.';
      toast.error(message);
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (!nameDraft.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    setIsSavingProfile(true);
    try {
      const response = await API.put('/users/me', { name: nameDraft.trim() });
      setProfile(response.data);
      toast.success('Profile updated.');
      setIsProfileOpen(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to update profile.';
      toast.error(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Your Dashboard</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Profile details and a focused view of your latest pulses.
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200">
                <UserCircle size={32} />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {profile?.name || user?.name || 'Your Name'}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {profile?.email || user?.email || 'your@email.com'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Pencil size={16} />
              Update name
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            {profile?.bio || 'Add a short bio to personalize your pulse updates.'}
          </p>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Your Pulses</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Search and filter the updates you have shared.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 md:flex-row md:items-center">
            <div className="flex-1">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search your pulses"
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

          <div className="mt-8 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {isLoading && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
                Loading your pulses...
              </div>
            )}

            {!isLoading && filteredPosts.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
                No pulses found yet. Share your first update from the feed.
              </div>
            )}

            {!isLoading && filteredPosts.map((post) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(post)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {post.content}
                </p>
                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Just now'}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Update name</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Keep your profile info current.</p>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Full Name</label>
                  <input
                    value={nameDraft}
                    onChange={(event) => setNameDraft(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-500/20"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                  >
                    <Save size={16} />
                    {isSavingProfile ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur"
            onClick={() => setIsEditOpen(false)}
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
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit pulse</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Update your pulse content or category.</p>
                </div>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdatePost} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Category</label>
                  <select
                    value={editCategory}
                    onChange={(event) => setEditCategory(event.target.value)}
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
                    value={editContent}
                    onChange={(event) => setEditContent(event.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-500/20"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingPost}
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                  >
                    <Save size={16} />
                    {isSavingPost ? 'Saving...' : 'Save changes'}
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

export default DashboardPage;
