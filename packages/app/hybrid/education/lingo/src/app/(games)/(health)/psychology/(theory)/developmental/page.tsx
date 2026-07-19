import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/health/psychology/theory/developmental.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
