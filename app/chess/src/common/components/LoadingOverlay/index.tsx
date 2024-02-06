import { Spinner } from '@chakra-ui/react';
import { APP_NAME } from '@chess/common/constants/app.constants';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-screen bg-white/90">
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <p className="text-teal-500">{APP_NAME}</p>
            <Spinner color="teal.500" size="xl" />
            <p className="text-teal-500">Loading</p>
          </div>
        </div>
      </div>
    </div>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';
