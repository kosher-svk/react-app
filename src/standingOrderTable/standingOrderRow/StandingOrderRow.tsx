import { StandingOrder } from '../standingOrderInterface';
import AccountNumber from './AccountNumber';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Interval from './Interval';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StandingOrderRow = (props: StandingOrder) => {
  const {
    name = 'name',
    accountNumber = 'account number',
    interval = 'interval',
    amount = 0,
    nextRealizationDate = 'date',
  } = props;

  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 3,
    currencySign: 'accounting',
    useGrouping: false,
  });
  return (
    <StyledTableRow>
      <TableCell>{nextRealizationDate}</TableCell>
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
            <Button variant='outlined'>Update</Button>
            <Button variant='outlined' color='error'>
              Delete
            </Button>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{euro.format(amount)}</TableCell>
    </StyledTableRow>
  );
};

export default StandingOrderRow;
