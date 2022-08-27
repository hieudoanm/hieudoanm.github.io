import { Link } from 'gatsby';
import React from 'react';

export type BlogProps = {
  url: string;
  title: string;
  description: string;
  date: string;
};

const Blog: React.FC<BlogProps> = ({ url, title, description, date }) => {
  return (
    <Link to={url}>
      <div className="rounded border shadow overflow-hidden shadow">
        <div className="p-4">
          <h2 className="mb-2">
            <b>{title}</b>
          </h2>
          <p className="mb-2 text-justify">{description}</p>
          <p className="text-gray-500">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
