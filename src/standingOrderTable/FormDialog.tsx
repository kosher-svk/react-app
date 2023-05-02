import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { StandingOrder } from './standingOrderInterface';

import validationSchema from './validationSchema';
import { Formik, Form } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

export default function FormDialog({
  openDialog,
  formData,
  handleClose,
  handleFormSubmit,
}: {
  openDialog: boolean;
  formData: StandingOrder;
  handleClose: Function;
  handleFormSubmit: (formData: StandingOrder) => void;
}) {
  console.log('formData from Dialog', formData);

  return (
    <Dialog open={openDialog} onClose={() => handleClose()} fullScreen={true}>
      <DialogTitle>Trvalý príkaz</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={formData}
          onSubmit={(values, actions) => {
            const newValues = { ...values };
            newValues.nextRealizationDate =
              values.nextRealizationDate?.toString();

            handleFormSubmit(newValues);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <Form>
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
                      onBlur={() => {
                        console.log(props.values.accountNumber);
                        // props.setFieldValue('accountNumber', 'fsdfds');
                      }}
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
                      label='Čiastka'
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
                      type='number'
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
                      type='number'
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
                    <Button variant='outlined' color='info'>
                      Zoznam symbolov
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='specificSymbol'
                      margin='dense'
                      label='Špecifický symbol'
                      type='number'
                      onChange={props.handleChange}
                      value={props.values.specificSymbol}
                      error={
                        props.touched.specificSymbol &&
                        Boolean(props.errors.specificSymbol)
                      }
                      helperText={
                        props.touched.specificSymbol &&
                        props.errors.specificSymbol
                      }
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='note'
                      margin='dense'
                      id='name'
                      label='Poznámka pre príjemcu'
                      type='text'
                      value={props.values.note}
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      autoFocus
                      margin='dense'
                      label='Periodicita'
                      type='text'
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      autoFocus
                      margin='dense'
                      label='Deň v týždni'
                      type='text'
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <TextField
                      margin='dense'
                      label='Začiatok účinnosti'
                      type='text'
                      fullWidth
                      variant='standard'
                    /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label='Začiatok účinnosti'
                      value={moment(props.values.nextRealizationDate)}
                      onChange={(value) => {
                        props.setFieldValue('nextRealizationDate', value);
                      }}
                      minDate={moment().add(1, 'days')}
                    />
                  </Grid>
                </Grid>
                <Button type='submit' variant='contained'>
                  submit
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => handleClose()}
                >
                  Zahodiť
                </Button>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
