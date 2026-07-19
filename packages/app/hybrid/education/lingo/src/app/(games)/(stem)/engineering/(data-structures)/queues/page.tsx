import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/stem/engineering/data-structures/queues.md';

const Page = () => <NoteTemplate note={parseNote(source)} />;

export default Page;
