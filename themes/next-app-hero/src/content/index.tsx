import appStore from '../assets/app-store.svg';
import playStore from '../assets/play-store.svg';

const content = {
  seo: { title: 'App', description: '' },
  message: {
    title: 'Main Hero Message to sell your app',
    subtitle:
      'Sub-hero message, not too long and not too short. Make it just right!',
  },
  apps: [
    { id: 'app-store', title: 'App Store', url: '#', image: appStore },
    { id: 'play-store', title: 'Play Store', url: '#', image: playStore },
  ],
};

export default content;
