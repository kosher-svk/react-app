import AccountNumber from './AccountNumber';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Interval from './Interval';
import moment from 'moment';
import { StandingOrder } from '../../../interfaces/standingOrder.interface';
import formDataNormalizer from '../../../utils/FormDataNormalizer';
import CurrencyFormatter from '../../../utils/CurrencyFormatter';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StandingOrderRow = ({
  formData,
  handleClickOpen,
  handleClickDelete,
}: {
  formData: StandingOrder;
  handleClickOpen: (id?: number) => void;
  handleClickDelete: (id?: number) => void;
}) => {
  const normalizedForm = formDataNormalizer(formData);

  return (
    <StyledTableRow>
      <TableCell>
        {moment(normalizedForm.nextRealizationDate).format('DD MMM')}
      </TableCell>
      <TableCell>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {normalizedForm.name}
              </Grid>
              <Grid item xs={4}>
                <Interval interval={normalizedForm.interval} />
              </Grid>
              <Grid item xs={8}>
                <AccountNumber accountNumber={normalizedForm.accountNumber} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='outlined'
              onClick={() => handleClickOpen(normalizedForm.standingOrderId)}
            >
              Update
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={() => handleClickDelete(normalizedForm.standingOrderId)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{CurrencyFormatter(normalizedForm.amount)}</TableCell>
    </StyledTableRow>
  );
};

export default StandingOrderRow;
