import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/health/psychology/theory/cognitive/memory.md';

const MemoryPage = () => <NoteTemplate note={parseNote(source)} />;

export default MemoryPage;
