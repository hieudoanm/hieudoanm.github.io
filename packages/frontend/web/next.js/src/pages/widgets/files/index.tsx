import { WidgetFiles } from '@web/widgets/files/WidgetFiles';
import { NextPage } from 'next';

const FilesPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetFiles />
      </div>
    </div>
  );
};

export default FilesPage;
