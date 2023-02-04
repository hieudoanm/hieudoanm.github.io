import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const GradientButton = styled(Button)<
  ButtonProps & { scrolled: boolean }
>(({ scrolled }) => ({
  background: scrolled
    ? 'linear-gradient(90deg, #d53369 0%, #daae51 100%)'
    : '#ffffff',
  color: scrolled ? '#ffffff' : '#000000',
  '&:hover': {
    background: scrolled
      ? 'linear-gradient(90deg, #d53369 0%, #daae51 100%)'
      : '#ffffff',
    color: scrolled ? '#ffffff' : '#000000',
  },
}));

export default GradientButton;
