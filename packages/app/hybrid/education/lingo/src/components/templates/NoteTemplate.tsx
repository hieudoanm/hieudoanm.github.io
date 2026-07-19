import type { FC } from 'react';

import { NoteBody } from '@/components/templates/NoteBody';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';
import type { Note } from '@/lib/notes';

export const NoteTemplate: FC<{ note: Note }> = ({ note }) => (
  <TheoryTemplate
    title={note.title}
    subtitle={note.subtitle}
    parentLink={note.parentLink}
    links={note.links ?? []}
    references={note.references ?? []}
    sections={note.sections.map((section) => ({
      title: section.title,
      body: <NoteBody markdown={section.body} />,
    }))}
  />
);
