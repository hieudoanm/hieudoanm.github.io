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

export type TeamSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  team: Array<Person>;
};

const TeamSection: React.FC<TeamSectionProperties> = (
  { id: sectionId = '', title: sectionTitle = '', subtitle = '', team = [] }
) => {
  return (
    <section id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map(({ id, image, title, position, homepage = '' }: Person) => {
            return (
              <div key={`team-${id}`} className="text-center">
                <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border">
                  <img src={image} alt={title} width={'100%'} height={'100%'} />
                </div>
                <h2 className="text-2xl">{title}</h2>
                <p className="mb-4">{position}</p>

                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="mx-auto inline-block"
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
