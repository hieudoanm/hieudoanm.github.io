import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';

const Social: React.FC = () => {
  return (
    <div className="mx-auto mt-6 flex w-4/5 flex-wrap items-center justify-between pb-16 lg:w-full lg:pb-0">
      <Link className="link" href="#" data-tippy-content="@facebook_handle">
        <FacebookIcon
          titleAccess="facebook"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
      <Link className="link" href="#" data-tippy-content="@twitter_handle">
        <TwitterIcon
          titleAccess="twitter"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
      <Link className="link" href="#" data-tippy-content="@github_handle">
        <GitHubIcon
          titleAccess="github"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
      <Link className="link" href="#" data-tippy-content="@unsplash_handle">
        <LinkedInIcon
          titleAccess="linkedin"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
      <Link className="link" href="#" data-tippy-content="@dribble_handle">
        <RedditIcon
          titleAccess="reddit"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
      <Link className="link" href="#" data-tippy-content="@instagram_handle">
        <InstagramIcon
          titleAccess="instagram"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
      <Link className="link" href="#" data-tippy-content="@youtube_handle">
        <YouTubeIcon
          titleAccess="youtube"
          fontSize="large"
          className="fill-current text-gray-600 hover:text-sky-700"
        />
      </Link>
    </div>
  );
};

export default Social;
