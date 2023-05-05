import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Grid, MenuItem, Modal, Select } from '@mui/material';
import validationSchema from './validationSchema';
import moment from 'moment';
import { useContext } from 'react';
import { StandingOrder } from '../../../interfaces/standingOrder.interface';
import { CodeTableContext } from '../../../App';
import IntervalDropdown from './IntervalDropdown';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 1,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
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

  console.log('constSymbols', constSymbols);

  return (
    <Dialog open={openDialog} onClose={() => handleClose()} fullScreen={true}>
      <DialogTitle>Trvalý príkaz</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={formData}
          onSubmit={(values, actions) => {
            handleFormSubmit({ ...values });
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            console.log('rendering', props.values);
            const defaultConstantSymbol =
              props.values.constantSymbol ||
              (constSymbols && constSymbols[0] && constSymbols[0].value);

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
                      label='Variabilný symbol*'
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
                      label='Konštantný symbol*'
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
                      label='Špecifický symbol*'
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
                      label='Poznámka pre príjemcu*'
                      type='text'
                      value={props.values.note}
                      fullWidth
                      variant='standard'
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      name='intervalId'
                      value={props.values.intervalId || 1}
                      label='Periodicita*'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      style={{ display: 'block' }}
                    >
                      <MenuItem value={1}>Denne</MenuItem>
                      <MenuItem value={2}>Týždenne</MenuItem>
                      <MenuItem value={3}>Mesačne</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={10}>
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
                <Modal
                  open={openSymbolsDialog}
                  onClose={handleCloseSymbolDialog}
                  aria-labelledby='parent-modal-title'
                  aria-describedby='parent-modal-description'
                >
                  <Box sx={{ ...style, width: 600 }}>
                    <Select
                      name='constantSymbol'
                      value={defaultConstantSymbol}
                      label='Konštantný symbol'
                      onChange={(e) => {
                        props.handleChange(e);
                        handleCloseSymbolDialog();
                      }}
                      style={{ display: 'block' }}
                    >
                      {constSymbols
                        ? constSymbols.map((constSymbol, index) => {
                            return (
                              <MenuItem key={index} value={constSymbol.value}>
                                {`[${constSymbol.value}] ${constSymbol.text}`}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </Box>
                </Modal>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
