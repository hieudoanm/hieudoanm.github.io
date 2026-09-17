import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/health/psychology/theory/cognitive/attention.md';

const AttentionPage = () => <NoteTemplate note={parseNote(source)} />;

export default AttentionPage;
