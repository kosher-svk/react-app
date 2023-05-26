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
import { COLORS } from '../../../constants/colors';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: COLORS.analogous,
  },
  '&:nth-of-type(even)': {
    backgroundColor: COLORS.analogousBlank,
  },
  '&:hover': {
    backgroundColor: COLORS.secondaryBlank,
  },
  '&:hover button': {
    display: 'inline-block',
  },
  maxHeight: '5rem',
}));

const styles = {
  date: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },

  buttonContainer: {
    width: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  accountNumberContainer: {
    width: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  updateButton: {
    marginRight: '0.5rem',
    display: 'none',
    backgroundColor: COLORS.primary,
    color: 'white',
    '&:hover': {
      backgroundColor: COLORS.primaryBlank,
      color: 'white',
    },
  },

  deleteButton: {
    marginRight: '0.5rem',
    display: 'none',
    backgroundColor: 'white',
    borderColor: COLORS.alertColor,
    color: '#ed020e',
    '&:hover': {
      backgroundColor: COLORS.alertColorBlank,
      color: COLORS.alertColorDark,
    },
  },
};

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
      <TableCell sx={styles.date}>
        {moment(normalizedForm.nextRealizationDate).format('DD. MMM')}
      </TableCell>
      <TableCell>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={styles.name}>
                {normalizedForm.name}
              </Grid>
              <Grid item xs={4}>
                <Interval interval={normalizedForm.interval} />
              </Grid>
              <Grid item xs={8} style={styles.accountNumberContainer}>
                <AccountNumber accountNumber={normalizedForm.accountNumber} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={styles.buttonContainer}>
            <Button
              variant='contained'
              sx={styles.updateButton}
              onClick={() => handleClickOpen(normalizedForm.standingOrderId)}
              // startIcon={<EditOutlinedIcon />}
            >
              Upraviť
            </Button>
            <Button
              variant='contained'
              color='error'
              sx={styles.deleteButton}
              onClick={() => handleClickDelete(normalizedForm.standingOrderId)}
              // startIcon={<EditOutlinedIcon />}
            >
              Zmazať
            </Button>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{CurrencyFormatter(normalizedForm.amount)}</TableCell>
    </StyledTableRow>
  );
};

export default StandingOrderRow;
