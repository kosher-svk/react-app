import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StandingOrderTableHeader = ({
  handleClickOpen,
}: {
  handleClickOpen: (id: number) => void;
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3}>
          <Button variant='contained' onClick={() => handleClickOpen(0)}>
            Nový trvalý príkaz
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default StandingOrderTableHeader;
