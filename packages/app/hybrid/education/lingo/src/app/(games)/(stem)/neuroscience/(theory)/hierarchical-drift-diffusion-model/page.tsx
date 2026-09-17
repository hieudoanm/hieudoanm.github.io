import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/stem/neuroscience/theory/hierarchical-drift-diffusion-model.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
