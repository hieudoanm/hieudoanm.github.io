import { NoteTemplate } from '@/components/templates/NoteTemplate';
import { parseNote } from '@/lib/notes';
import source from '@/notes/stem/chemistry/periodic-table.md';

const PeriodicTablePage = () => <NoteTemplate note={parseNote(source)} />;

export default PeriodicTablePage;
