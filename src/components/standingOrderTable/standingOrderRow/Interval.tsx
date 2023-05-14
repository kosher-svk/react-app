import Chip from '@mui/material/Chip';
const styles = {
  chip: {
    backgroundColor: '#c2c2c2',
    color: 'white',
    borderRadius: '0.3rem',
    paddingTop: '0.1rem',
  },
};
const Interval = (props: { interval?: string }) => {
  const { interval } = props;
  switch (interval) {
    case 'Mesačne':
      return <Chip label={interval} style={styles.chip} />;
    case 'Týždenne':
      return <Chip label={interval} style={styles.chip} />;
    case 'Denne':
      return <Chip label={interval} style={styles.chip} />;
    default:
      return null;
  }
};

export default Interval;
