import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
} from '@chakra-ui/react';
import Container from '@hieudoanm/components/Container';
import Header from '@hieudoanm/components/Header';
import type React from 'react';

export type Experience = {
  company: string;
  period: string;
  city: string;
  title: string;
};

export type ExperiencesSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  experiences: Experience[];
};

const ExperiencesSection: React.FC<ExperiencesSectionProperties> = ({
  id,
  title: sectionTitle,
  subtitle,
  experiences,
}) => {
  return (
    <div id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <Accordion allowToggle>
          <>
            {experiences.map(
              ({
                company = '',
                period = '',
                city = '',
                title = '',
              }: Experience) => {
                return (
                  <AccordionItem key={`experience-${company}`}>
                    <AccordionButton>
                      <Box flex={1}>
                        <div className="flex items-center gap-x-2">
                          <span>{company}</span>
                          <Badge colorScheme="teal">{period}</Badge>
                          <Badge colorScheme="teal">{city}</Badge>
                        </div>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>{title}</AccordionPanel>
                  </AccordionItem>
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
