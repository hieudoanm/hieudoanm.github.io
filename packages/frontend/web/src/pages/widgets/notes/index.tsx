import { WidgetNotes } from '@web/widgets/notes/WidgetNotes';
import { NextPage } from 'next';

const NotesPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetNotes />
      </div>
    </div>
  );
};

export default NotesPage;
