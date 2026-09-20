import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/humanities/economics/game-theory/nash-equilibrium.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
