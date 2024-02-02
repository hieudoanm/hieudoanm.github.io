import { Card, CardHeader, Heading } from '@chakra-ui/react';
import { Language } from '@prisma/client';

export type LanguageTemplateProperties = {
  language: Language;
};

export const LanguageTemplate: React.FC<LanguageTemplateProperties> = ({
  language,
}) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <Heading className="text-xl">
          {language.name} ({language.cca3})
        </Heading>
      </CardHeader>
    </Card>
  );
};
