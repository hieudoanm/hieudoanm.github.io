import React from 'react';
import BlogsTemplate from '../../templates/Blogs';

const BlogsPage: React.FC = () => {
  return (
    <BlogsTemplate
      title="Blogs"
      subtitle=""
      blogs={[]}
      hero={{ id: '', title: '', subtitle: '', backgroundImage: '' }}
    />
  );
};

export default BlogsPage;
