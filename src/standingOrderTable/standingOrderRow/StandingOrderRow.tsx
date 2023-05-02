import { StandingOrder } from '../standingOrderInterface';
import AccountNumber from './AccountNumber';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Interval from './Interval';
import CurrencyFormatter from '../../utils/CurrencyFormatter';
import moment from 'moment';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StandingOrderRow = ({
  transaction,
  handleClickOpen,
}: {
  transaction: StandingOrder;
  handleClickOpen: (id: number) => void;
}) => {
  const {
    name = '',
    accountNumber = '',
    interval = '',
    amount = 0,
    nextRealizationDate = '',
  }: StandingOrder = transaction;

  return (
    <StyledTableRow>
      <TableCell>{moment(nextRealizationDate).format('LLLL')}</TableCell>
      <TableCell>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {name}
              </Grid>
              <Grid item xs={4}>
                <Interval interval={interval} />
              </Grid>
              <Grid item xs={8}>
                <AccountNumber accountNumber={accountNumber} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='outlined'
              onClick={() => handleClickOpen(transaction.standingOrderId)}
            >
              Update
            </Button>
            <Button variant='outlined' color='error'>
              Delete
            </Button>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{CurrencyFormatter(amount)}</TableCell>
    </StyledTableRow>
  );
};

export default StandingOrderRow;
