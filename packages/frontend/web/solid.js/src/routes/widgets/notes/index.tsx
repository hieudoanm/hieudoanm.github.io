import { WidgetNotes } from '~/widgets/notes/WidgetNotes';

const NotesPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetNotes />
      </div>
    </div>
  );
};

export default NotesPage;
