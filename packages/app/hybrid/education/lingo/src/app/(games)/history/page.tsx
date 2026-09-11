import { HistoryGames } from '@/games/history/Hub';
import { NextPage } from 'next';

const HistoryPage: NextPage = () => (
  <div className="p-6">
    <HistoryGames />
  </div>
);

export default HistoryPage;
