export const WidgetHealthBodyTemperature = () => {
  const temperature = 37;

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-black text-white">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-sm">Body Temperature</p>
          <p className="text-6xl text-red-500">{temperature}°C</p>
          <p className="text-lg font-bold">Healthy</p>
        </div>
      </div>
    </div>
  );
};
