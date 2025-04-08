import { WidgetFiles } from '~/widgets/files/WidgetFiles';

const FilesPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetFiles />
      </div>
    </div>
  );
};

export default FilesPage;
