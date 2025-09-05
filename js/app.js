// Get posts from localStorage
function getPosts() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}

// Save posts to localStorage
function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Generate ID
function generateId() {
  return 'post-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Create new post
function createPost(title, category, tagsString, content) {
  const author = localStorage.getItem('loggedInUser');
  if (!author) return null;

  const posts = getPosts();
  const newPost = {
    id: generateId(),
    author: author,
    title: title,
    category: category,
    tags: tagsString.split(',').map(t => t.trim()).filter(Boolean),
    content: content,
    comments: []
  };

  posts.push(newPost);
  savePosts(posts);

  return newPost;
}

// Get post by ID
function getPostById(id) {
  const posts = getPosts();
  return posts.find(p => p.id === id);
}

// Update post 
function updatePost(id, updatedData) {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return false;

  posts[index] = { ...posts[index], ...updatedData };
  savePosts(posts);

  return true;
}

// Delete a post
function deletePost(id) {
  let posts = getPosts();
  posts = posts.filter(p => p.id !== id);
  savePosts(posts);
}

// Add comment 
function addComment(postId, text) {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return false;

  const user = localStorage.getItem('loggedInUser') || 'Anonymous';
  post.comments.push({ user, text, date: new Date().toISOString() });
  savePosts(posts);
  return true;
}
