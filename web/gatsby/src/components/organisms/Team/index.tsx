import React from 'react';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';
import { FaGlobe } from 'react-icons/fa';

export type Person = {
  id: string;
  image: string;
  title: string;
  position: string;
  homepage?: string;
};

export type TeamSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  team: Array<Person>;
};

const TeamSection: React.FC<TeamSectionProps> = ({
  id = '',
  title = '',
  subtitle = '',
  team = [],
}) => {
  return (
    <section id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(({ id, image, title, position, homepage = '' }: Person) => {
            return (
              <div key={`team-${id}`} className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center overflow-hidden border">
                  <img src={image} alt={title} width={'100%'} height={'100%'} />
                </div>
                <h2 className="text-2xl">{title}</h2>
                <p className="mb-4">{position}</p>

                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mx-auto"
                  >
                    <FaGlobe />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
