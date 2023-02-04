import DashboardIcon from '@mui/icons-material/Dashboard';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Container from '@mui/material/Container';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex w-full items-center justify-between">
          <Link className="flex items-center gap-4 text-indigo-400" href="#">
            <DashboardIcon
              fontSize="large"
              className="fill-current text-indigo-600"
            />
            <span className="text-4xl font-bold">APP</span>
          </Link>
          <div className="flex w-1/2 items-center justify-end gap-4">
            <Link
              className="text-blue-300 hover:text-indigo-800"
              data-tippy-content="@twitter_handle"
              href="https://twitter.com/intent/tweet?url=#"
            >
              <TwitterIcon fontSize="large" className="fill-current" />
            </Link>
            <Link
              className="text-blue-300 hover:text-indigo-800"
              data-tippy-content="#facebook_id"
              href="https://www.facebook.com/sharer/sharer.php?u=#"
            >
              <FacebookIcon fontSize="large" className="fill-current" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
