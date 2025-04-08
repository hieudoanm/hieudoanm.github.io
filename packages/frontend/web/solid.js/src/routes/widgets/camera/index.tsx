import { WidgetCamera } from '~/widgets/camera/WidgetCamera';

const CameraPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetCamera />
      </div>
    </div>
  );
};

export default CameraPage;
