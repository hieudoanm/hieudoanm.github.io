import image from '@nothing/assets/image.jpg';

export const WidgetPhotos = () => {
  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-black text-white">
      <div className="h-full w-full p-2">
        <div
          className="h-full w-full overflow-hidden rounded-2xl bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${image.src})` }}></div>
      </div>
    </div>
  );
};
