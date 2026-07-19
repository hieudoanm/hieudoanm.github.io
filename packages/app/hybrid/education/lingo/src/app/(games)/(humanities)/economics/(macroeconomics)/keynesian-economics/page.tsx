import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/humanities/economics/macroeconomics/keynesian-economics.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
