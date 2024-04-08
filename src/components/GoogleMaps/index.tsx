import type React from 'react';

export type GoogleMapsProperties = {
  source: string;
  title: string;
};

const GoogleMaps: React.FC<GoogleMapsProperties> = ({
  source = '',
  title = '',
}) => {
  return (
    <div className="relative w-full" style={{ paddingBottom: '100%' }}>
      <div className="absolute h-full w-full">
        <iframe
          src={source}
          title={title}
          className="h-full w-full border-none"
          allowFullScreen={true}
          loading="lazy"
        />
      </div>
    </div>
  );
};

GoogleMaps.displayName = 'GoogleMaps';

export default GoogleMaps;
