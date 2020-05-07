import React from 'react';

import Blog from './Blog'

const ShowBlogs = ({ blogs, user }) => {
  const blogsMapped = blogs
    .filter(blog => {
      console.log(blog.user)
      return blog.user.username === user.username
    })
    .map(blog => <Blog key={blog.id} blog={blog} />)
  return (
    <div>
      { blogsMapped }
    </div>
  );
};

export default ShowBlogs;