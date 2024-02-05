import { Language } from '@prisma/client';

export type LanguageTemplateProperties = {
  language: Language;
};

export const LanguageTemplate: React.FC<LanguageTemplateProperties> = ({
  language,
}) => {
  return (
    <div className="card">
      <div>
        <h1 className="text-xl">
          {language.name} ({language.cca3})
        </h1>
      </div>
    </div>
  );
};
