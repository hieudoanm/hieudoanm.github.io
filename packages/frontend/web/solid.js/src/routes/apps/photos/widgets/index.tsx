import { WidgetPhotos } from '~/widgets/photos/WidgetPhotos';

const PhotosPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetPhotos />
      </div>
    </div>
  );
};

export default PhotosPage;
