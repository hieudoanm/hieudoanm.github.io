import Heading from '@/components/atoms/Heading';
import Project from '@/components/molecules/Project';
import { Container } from '@mui/material';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-white py-8 md:py-16">
      <Container>
        <Heading gradient className="text-gray-900">
          Projects
        </Heading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Lorem ipsum dolor sit amet.',
              subtitle: 'getting started',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.',
            },
            {
              title: 'Lorem ipsum dolor sit amet.',
              subtitle: 'getting started',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.',
            },
            {
              title: 'Lorem ipsum dolor sit amet.',
              subtitle: 'getting started',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.',
            },
          ].map(({ title, subtitle, description }, index: number) => {
            return (
              <div key={`project-${index}`} className="col-span-1">
                <Project
                  index={index + 1}
                  title={title}
                  subtitle={subtitle}
                  description={description}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
