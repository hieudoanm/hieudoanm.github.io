import { WidgetCamera } from '@nothing/widgets/camera/WidgetCamera';
import { NextPage } from 'next';

const CameraPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetCamera />
      </div>
    </div>
  );
};

export default CameraPage;
