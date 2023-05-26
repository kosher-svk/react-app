import Chip from '@mui/material/Chip';
const styles = {
  chip: {
    borderRadius: '0.3rem',
    paddingTop: '0.1rem',
  },
};
const Interval = (props: { interval?: string }) => {
  const { interval } = props;
  switch (interval) {
    case 'Mesačne':
      return <Chip label={interval} sx={styles.chip} color='success' />;
    case 'Týždenne':
      return <Chip label={interval} sx={styles.chip} color='warning' />;
    case 'Denne':
      return <Chip label={interval} sx={styles.chip} color='secondary' />;
    default:
      return null;
  }
};

export default Interval;
