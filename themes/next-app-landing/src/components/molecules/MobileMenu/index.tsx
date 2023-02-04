import GradientButton from '@/components/atoms/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const MobileMenu: React.FC<{ textColor: string }> = ({ textColor = '' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className={textColor}>
        <MenuIcon />
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
        <div className="flex h-full flex-col gap-4 p-8">
          <ScrollLink
            className="flex cursor-pointer items-center gap-2 text-xl font-medium capitalize tracking-wider"
            to="hero"
            spy={true}
            offset={-100}
            smooth={true}
            duration={500}
          >
            <FlightTakeoffIcon fontSize="large" className="fill-current" />
            Landing
          </ScrollLink>
          <ScrollLink
            className="block cursor-pointer font-medium capitalize tracking-wider"
            to="services"
            spy={true}
            offset={-100}
            smooth={true}
            duration={500}
          >
            Services
          </ScrollLink>
          <ScrollLink
            className="block cursor-pointer font-medium capitalize tracking-wider"
            to="projects"
            spy={true}
            offset={-100}
            smooth={true}
            duration={500}
          >
            projects
          </ScrollLink>
          <ScrollLink
            className="block cursor-pointer font-medium capitalize tracking-wider"
            to="pricing"
            spy={true}
            offset={-100}
            smooth={true}
            duration={500}
          >
            pricing
          </ScrollLink>
          <GradientButton scrolled fullWidth variant="contained">
            Download
          </GradientButton>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenu;
