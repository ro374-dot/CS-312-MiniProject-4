const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

let users = [];
let posts = [
  { id: 1, title: 'First Blog Post', content: 'Hello World from Node & React!', author: 'testuser' }
];

app.get('/blogs', (req, res) => {
  res.json(posts);
});

app.post('/blogs', (req, res) => {
  const { title, content, author } = req.body;
  const newPost = { id: Date.now(), title, content, author: author || 'anonymous' };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

app.delete('/blogs/:id', (req, res) => {
  const postId = Number(req.params.id);
  posts = posts.filter(p => p.id !== postId);
  res.json({ message: 'Post deleted successfully' });
});

app.post('/signup', (req, res) => {
  const { user_id, password, name } = req.body;
  if (users.find(u => u.user_id === user_id)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const newUser = { user_id, password, name };
  users.push(newUser);
  res.json({ message: 'Signup successful', user: { user_id, name } });
});

app.post('/signin', (req, res) => {
  const { user_id, password } = req.body;
  const user = users.find(u => u.user_id === user_id && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Signin successful', user: { user_id: user.user_id, name: user.name } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});