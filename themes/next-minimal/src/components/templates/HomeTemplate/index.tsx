import { useTheme } from '../../../context/ThemeProvider';
import Hero from '../../organisms/Hero';
import Navbar from '../../organisms/Navbar';
import Portfolio from '../../organisms/Portfolio';
import Services from '../../organisms/Services';

const HomeTemplate: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="bg-white dark:bg-gray-900">
        <Navbar />
        <Hero />
        <Services />
        <Portfolio />
      </main>
    </div>
  );
};

export default HomeTemplate;
