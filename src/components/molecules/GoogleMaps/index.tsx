import React from 'react';

export type GoogleMapsProperties = {
  source: string;
  title: string;
};

const GoogleMaps: React.FC<GoogleMapsProperties> = ({
  source = '',
  title = '',
}) => {
  return (
    <div className="w-full relative" style={{ paddingBottom: '100%' }}>
      <div className="absolute w-full h-full">
        <iframe
          src={source}
          title={title}
          className="border-none w-full h-full"
          allowFullScreen={true}
          loading="lazy"
        />
      </div>
    </div>
  );
};

GoogleMaps.displayName = 'GoogleMaps';

export default GoogleMaps;
