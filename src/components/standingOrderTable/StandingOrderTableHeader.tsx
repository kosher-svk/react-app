import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { COLORS } from '../../constants/colors';
import AddIcon from '@mui/icons-material/Add';

const styles = {
  container: {
    textAlign: 'right',
    padding: '1rem',
    backgroundColor: COLORS.secondary,
  },
  button: {
    backgroundColor: COLORS.triadicBlank,
    //#00c5ca'
    color: COLORS.triadicDark,
    '&:hover': {
      backgroundColor: COLORS.triadic,
      color: COLORS.triadicDark,
      opacity: 0.95,
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
            startIcon={<AddIcon />}
          >
            Nový trvalý príkaz
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default StandingOrderTableHeader;
