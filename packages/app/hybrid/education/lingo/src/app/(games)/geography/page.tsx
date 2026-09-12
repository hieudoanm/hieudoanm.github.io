import { GeographyGames } from '@/games/geography/Hub';
import { NextPage } from 'next';

const GeographyPage: NextPage = () => (
  <div className="p-6">
    <GeographyGames />
  </div>
);

export default GeographyPage;
