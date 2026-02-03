import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const { content, category } = req.body;
  const post = await Post.create({
    author: req.user._id,
    content,
    category,
  });
  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const { keyword, category } = req.query;

  const query = {};
  if (keyword) query.content = { $regex: keyword, $options: 'i' };
  if (category) query.category = category;

  const posts = await Post.find(query)
    .populate('author', 'name')
    .sort({ createdAt: -1 });

  res.json(posts);
};

export const updatePost = async (req, res) => {
  const { content, category } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  post.content = content ?? post.content;
  post.category = category ?? post.category;

  const updatedPost = await post.save();
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};
