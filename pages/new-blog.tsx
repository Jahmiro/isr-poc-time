// pages/new-blog.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

const NewBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/add-blog-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push('/blogs');
    } else {
      console.error('Failed to add blog post');
    }
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Blog Post</button>
      </form>
    </div>
  );
};

export default NewBlogPage;
