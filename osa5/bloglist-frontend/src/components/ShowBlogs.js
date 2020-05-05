import React from 'react';

import Blog from './Blog'

const ShowBlogs = ({ blogs, user }) => {
  const blogsMapped = blogs
    .filter(blog => blog.user.username === user.username)
    .map(blog => <Blog key={blog.id} blog={blog} />)
  return (
    <div>
      <h2>blogs</h2>
      <p>{ user.name } logged in</p>
      { blogsMapped }
    </div>
  );
};

export default ShowBlogs;