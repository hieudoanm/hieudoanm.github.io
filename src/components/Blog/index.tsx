import Link from 'next/link';
import React from 'react';

export type BlogProperties = {
  url: string;
  title: string;
  description: string;
  date: string;
};

const Blog: React.FC<BlogProperties> = ({ url, title, description, date }) => {
  return (
    <Link href={url}>
      <div className="overflow-hidden rounded border shadow">
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
