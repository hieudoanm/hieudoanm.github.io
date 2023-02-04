import GradientButton from '@/components/atoms/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Project: React.FC<{
  index: number;
  title: string;
  subtitle: string;
  description: string;
}> = ({ index = 0, title = '', subtitle = '', description = '' }) => {
  return (
    <Card sx={{ minWidth: 275 }} className="border shadow">
      <CardContent className="px-8 pt-8 pb-4">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Project #{index}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions className="px-8 pb-8 pt-4">
        <GradientButton scrolled>Learn More</GradientButton>
      </CardActions>
    </Card>
  );
};

export default Project;
