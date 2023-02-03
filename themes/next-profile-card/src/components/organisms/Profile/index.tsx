import content from '@/content';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Profile: React.FC = () => {
  return (
    <div className="dark:text-white">
      <h1 className="pt-8 text-3xl font-bold lg:pt-0">{content.seo.title}</h1>
      <div className="mx-auto w-full border-b-2 border-sky-500 pt-3 opacity-25 lg:mx-0"></div>
      <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
        <BusinessCenterIcon
          fontSize="medium"
          className="mr-4 fill-current text-sky-700"
        />
        Full-stack Developer
      </p>
      <p className="flex items-center justify-center pt-2 text-xs text-gray-600 lg:justify-start lg:text-sm">
        <LocationOnIcon
          fontSize="medium"
          className="mr-4 fill-current text-sky-700"
        />
        Ho Chi Minh City
      </p>
      <p className="pt-8 text-sm">
        Totally optional short description about yourself, what you do and so
        on.
      </p>
    </div>
  );
};

export default Profile;
