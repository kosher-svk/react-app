import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers';
import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import validationSchema from './validationSchema';
import moment from 'moment';
import { useContext } from 'react';
import { StandingOrder } from '../../../interfaces/standingOrder.interface';
import { CodeTableContext } from '../../../App';
import IntervalDropdown from './IntervalDropdown';
import SymbolDialog from './SymbolDialog';
import { COLORS } from '../../../constants/colors';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import DoneIcon from '@mui/icons-material/Done';

const styles = {
  title: {
    padding: '1.7rem',
    backgroundColor: COLORS.secondary,
    color: COLORS.text,
  },
  actions: {
    backgroundColor: COLORS.secondary,
    paddingRight: '5rem',
  },
  constantSymbolBox: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  },
  acceptButton: {
    margin: '1rem',
    '&:hover': {
      opacity: 0.95,
    },
  },
  cancelButton: {
    backgroundColor: 'white',
    margin: '1rem',
    '&:hover': {
      backgroundColor: 'white',
      opacity: 0.85,
    },
  },
};

export default function FormDialog({
  openDialog,
  openSymbolsDialog,
  formData,
  handleClose,
  handleFormSubmit,
  handleOpenSymbolDialog,
  handleCloseSymbolDialog,
}: {
  openDialog: boolean;
  openSymbolsDialog: boolean;
  formData: StandingOrder;
  handleClose: Function;
  handleFormSubmit: (formData: StandingOrder) => void;
  handleOpenSymbolDialog: () => void;
  handleCloseSymbolDialog: () => void;
}) {
  const constSymbols = useContext(CodeTableContext).constSymbols;
  const defaultFormData = {
    ...formData,
    validFrom: formData.validFrom || moment().add(1, 'days'),
    constantSymbol: formData.constantSymbol,
    intervalSpecification: formData.intervalSpecification || 0,
  };
  return (
    <Dialog open={openDialog} onClose={() => handleClose()} fullScreen={true}>
      <DialogTitle style={styles.title}>Trvalý príkaz</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={defaultFormData}
          onSubmit={(values, actions) => {
            handleFormSubmit({ ...values, amount: values.amount || 0 });
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <Form id='my-form-id'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      margin='dense'
                      name='name'
                      label='Príjemca*'
                      type='text'
                      value={props.values.name}
                      onChange={props.handleChange}
                      error={props.touched.name && Boolean(props.errors.name)}
                      helperText={props.touched.name && props.errors.name}
                      variant='standard'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='accountNumber'
                      label='IBAN*'
                      type='text'
                      value={props.values.accountNumber}
                      onChange={props.handleChange}
                      error={
                        props.touched.accountNumber &&
                        Boolean(props.errors.accountNumber)
                      }
                      helperText={
                        props.touched.accountNumber &&
                        props.errors.accountNumber
                      }
                      variant='standard'
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='amount'
                      margin='dense'
                      label='Čiastka*'
                      type='number'
                      value={props.values.amount}
                      onChange={props.handleChange}
                      error={
                        props.touched.amount && Boolean(props.errors.amount)
                      }
                      helperText={props.touched.amount && props.errors.amount}
                      variant='standard'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='variableSymbol'
                      margin='dense'
                      label='Variabilný symbol'
                      type='text'
                      onChange={props.handleChange}
                      value={props.values.variableSymbol}
                      error={
                        props.touched.variableSymbol &&
                        Boolean(props.errors.variableSymbol)
                      }
                      helperText={
                        props.touched.variableSymbol &&
                        props.errors.variableSymbol
                      }
                      variant='standard'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      name='constantSymbol'
                      margin='dense'
                      label='Konštantný symbol'
                      type='text'
                      onChange={props.handleChange}
                      value={props.values.constantSymbol}
                      error={
                        props.touched.constantSymbol &&
                        Boolean(props.errors.constantSymbol)
                      }
                      helperText={
                        props.touched.constantSymbol &&
                        props.errors.constantSymbol
                      }
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant='outlined'
                      color='info'
                      onClick={handleOpenSymbolDialog}
                    >
                      Zoznam symbolov
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='specificSymbol'
                      margin='dense'
                      label='Špecifický symbol'
                      type='text'
                      onChange={props.handleChange}
                      value={props.values.specificSymbol}
                      error={Boolean(props.errors.specificSymbol)}
                      helperText={props.errors.specificSymbol}
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='note'
                      margin='dense'
                      label='Poznámka pre príjemcu'
                      type='text'
                      value={props.values.note}
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Select
                      name='intervalId'
                      value={props.values.intervalId || 1}
                      label='Periodicita*'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      fullWidth
                    >
                      <MenuItem value={1}>Denne</MenuItem>
                      <MenuItem value={2}>Týždenne</MenuItem>
                      <MenuItem value={3}>Mesačne</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={8}>
                    <IntervalDropdown props={props}></IntervalDropdown>
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label='Začiatok účinnosti*'
                      value={
                        props.values.validFrom
                          ? moment(props.values.validFrom)
                          : moment().add(1, 'days')
                      }
                      onChange={(value) => {
                        props.setFieldValue('validFrom', value?.format());
                      }}
                      minDate={moment().add(1, 'days')}
                      format='DD/MM/YYYY'
                    />
                  </Grid>
                </Grid>
                <SymbolDialog
                  openSymbolsDialog={openSymbolsDialog}
                  handleCloseSymbolDialog={handleCloseSymbolDialog}
                  constSymbols={constSymbols}
                  values={props.values.constantSymbol}
                  handleChange={props.handleChange}
                />
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions style={styles.actions}>
        <Button
          type='submit'
          form='my-form-id'
          variant='contained'
          color='warning'
          sx={styles.acceptButton}
          startIcon={<DoneIcon />}
        >
          Uložiť
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={() => handleClose()}
          sx={styles.cancelButton}
          startIcon={<CancelOutlinedIcon />}
        >
          Zrušiť
        </Button>
      </DialogActions>
    </Dialog>
  );
}
