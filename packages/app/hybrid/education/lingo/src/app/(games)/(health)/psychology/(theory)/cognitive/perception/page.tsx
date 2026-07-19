import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/health/psychology/theory/cognitive/perception.md';

const PerceptionPage = () => <NoteTemplate note={parseNote(source)} />;

export default PerceptionPage;
