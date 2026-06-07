import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StartPage } from '@/components/start/StartPage';

const queryClient = new QueryClient();

export default function HomeScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <StartPage />
    </QueryClientProvider>
  );
}
