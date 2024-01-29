import { Spinner, Text } from '@chakra-ui/react';
import { APP_NAME } from '@chess/common/constants/app.constants';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed top-0 z-50 h-screen w-screen bg-white/90">
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <Text color="teal.500">{APP_NAME}</Text>
            <Spinner color="teal.500" size="xl" />
            <Text color="teal.500">Loading</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';
