import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const styles = {
  container: {
    textAlign: 'right',
    padding: '1rem',
    backgroundColor: '#50A8C6',
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    color: '#00c5ca',
    '&:hover': {
      backgroundColor: 'white',
      color: '#00c5ca',
      opacity: 0.85,
    },
  },
};

const StandingOrderTableHeader = ({
  handleClickOpen,
}: {
  handleClickOpen: (id: number) => void;
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3} sx={styles.container}>
          <Button
            variant='contained'
            sx={styles.button}
            onClick={() => handleClickOpen(0)}
          >
            Nový trvalý príkaz
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default StandingOrderTableHeader;
