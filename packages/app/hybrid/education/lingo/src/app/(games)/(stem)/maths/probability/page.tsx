import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/stem/maths/probability.md';

const ProbabilityPage = () => <NoteTemplate note={parseNote(source)} />;

export default ProbabilityPage;
