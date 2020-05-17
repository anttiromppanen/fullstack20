import React from 'react';

import Blog from './Blog'

const ShowBlogs = ({ blogs, user }) => {
  const blogsMapped = blogs
    .filter(blog => {
      return blog.user.username === user.username
    })
    .map(blog => {
      return <Blog key={blog.id} blog={blog} />
    })
  return (
    <div>
      { blogsMapped }
    </div>
  );
};

export default ShowBlogs;