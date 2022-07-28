import React from 'react';

export type GoogleMapsProps = {
  src: string;
  title: string;
};

const GoogleMaps: React.FC<GoogleMapsProps> = ({ src = '', title = '' }) => {
  return (
    <div className="w-full relative" style={{ paddingBottom: '100%' }}>
      <div className="absolute w-full h-full">
        <iframe
          src={src}
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
