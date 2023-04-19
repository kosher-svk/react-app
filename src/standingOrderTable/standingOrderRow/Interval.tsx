import Chip from '@mui/material/Chip';

const Interval = (props: { interval: string }) => {
  const { interval } = props;
  switch (interval) {
    case 'Mesačne':
      return <Chip label={interval} color='info' />;
    case 'Týždenne':
      return <Chip label={interval} color='success' />;
    case 'Denne':
      return <Chip label={interval} color='warning' />;
    default:
      return null;
  }
};

export default Interval;
