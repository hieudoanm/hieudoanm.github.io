import Container from '@mui/material/Container';
import Link from 'next/link';
import React from 'react';
import content from '../../../content';

export const Projects: React.FC = () => {
  return (
    <div id="projects" className="bg-gray-900 py-32">
      <Container>
        <div className="text-center text-white">
          <h1 className="mb-8 text-4xl font-bold">Projects</h1>
          <h2 className="mx-auto mb-16 max-w-3xl text-gray-500">
            lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            cupiditate! Molestiae placeat architecto nihil obcaecati illum
            minima incidunt dolores? Officia consectetur optio non totam cum eos
            soluta ipsa et quod.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.projects.map((item) => (
            <div key={`project-${item.id}`} className="col-span-1">
              <Link href={item.url} target={'_blank'}>
                <div
                  className="aspect-video overflow-hidden rounded border border-gray-900 bg-cover bg-center bg-no-repeat shadow"
                  style={{ backgroundImage: `url(${item.image.src})` }}
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Projects;
