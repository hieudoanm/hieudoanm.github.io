import React from 'react';
import Accordion from '../../atoms/Accordion';
import Badge from '../../atoms/Badge';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type Experience = {
  company: string;
  period: string;
  city: string;
  title: string;
};

export type ExperiencesSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  experiences: Experience[];
};

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  id,
  title,
  subtitle,
  experiences,
}) => {
  return (
    <div id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
        <Accordion>
          <>
            {experiences.map(
              (
                {
                  company = '',
                  period = '',
                  city = '',
                  title = '',
                }: Experience,
                index: number,
                array: Experience[]
              ) => {
                const border: string =
                  index === array.length - 1 ? '' : 'border-b';
                return (
                  <div key={`experience-${index}`} className={border}>
                    <Accordion.Toggle accordionItemId={index.toString()}>
                      {company}{' '}
                      <Badge bgColor={'bg-gray-900'} className={'mr-2'}>
                        {period}
                      </Badge>
                      <Badge bgColor={'bg-gray-900'} className={''}>
                        {city}
                      </Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse accordionItemId={index.toString()}>
                      {title}
                    </Accordion.Collapse>
                  </div>
                );
              }
            )}
          </>
        </Accordion>
      </Container>
    </div>
  );
};

ExperiencesSection.displayName = 'ExperiencesSection';

export default ExperiencesSection;
