import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/health/psychology/theory/cognitive/learning.md';

const LearningPage = () => <NoteTemplate note={parseNote(source)} />;

export default LearningPage;
