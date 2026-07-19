import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/stem/neuroscience/theory/linear-ballistic-accumulator.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
