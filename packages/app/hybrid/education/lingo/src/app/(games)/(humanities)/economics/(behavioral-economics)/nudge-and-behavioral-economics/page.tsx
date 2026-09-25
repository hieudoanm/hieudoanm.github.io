import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/humanities/economics/behavioral-economics/nudge-and-behavioral-economics.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
