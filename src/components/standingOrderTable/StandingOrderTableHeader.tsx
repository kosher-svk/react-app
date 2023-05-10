import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Styles = {
  button: {
    padding: '10px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 0,
  },
};

const StandingOrderTableHeader = ({
  handleClickOpen,
}: {
  handleClickOpen: (id: number) => void;
}) => {
  return (
    <TableHead style={{ backgroundColor: 'rgba(150, 150, 150)' }}>
      <TableRow>
        <TableCell colSpan={3}>
          <Button
            style={Styles.button}
            variant='contained'
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
