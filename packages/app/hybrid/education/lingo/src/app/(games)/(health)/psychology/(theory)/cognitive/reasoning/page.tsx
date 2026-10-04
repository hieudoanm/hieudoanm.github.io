import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/health/psychology/theory/cognitive/reasoning.md';

const ReasoningPage = () => <NoteTemplate note={parseNote(source)} />;

export default ReasoningPage;
