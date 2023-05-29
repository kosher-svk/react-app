import { Box, Button, Modal, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import validationSchema from '../formDialog/validationSchemaPINcode';
import { useEffect, useState } from 'react';
import { Validation } from '../../../interfaces/validation.interface';
import { GRID_CARD_INIT_URL } from '../../../constants/url';
import DoneIcon from '@mui/icons-material/Done';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from 'axios';
import { COLORS } from '../../../constants/colors';

const styles = {
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    backgroundColor: COLORS.analogous,
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

const AuthorizationDialog = ({
  openDialog,
  closeDialog,
  handleSubmitAuthorization,
  callbackFunction,
}: {
  openDialog: boolean;
  closeDialog: () => void;
  handleSubmitAuthorization: (
    authorizationData: Validation,
    callback: () => void
  ) => Promise<void>;
  callbackFunction: () => void;
}) => {
  useEffect(() => {
    if (openDialog) {
      getGridCardCoordinates();
    }
  }, [openDialog]);

  const [authorizationData, setAuthorizationData] = useState<Validation>({});
  const gridCardCoordinates = authorizationData.coordinate;
  const getGridCardCoordinates = async () => {
    try {
      const response = await axios.get<number>(GRID_CARD_INIT_URL);
      if (response.data) {
        const updatedAuthorizationData = { ...authorizationData };
        updatedAuthorizationData.coordinate = response.data;
        setAuthorizationData(updatedAuthorizationData);
        return response.data;
      }
    } catch (error) {}
    return null;
  };
  return (
    <Modal
      open={openDialog}
      onClose={closeDialog}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styles.box}>
        <div>
          <p>
            Zadajte PIN kód z riadku {String(gridCardCoordinates)[0]} a stĺpca{' '}
            {String(gridCardCoordinates)[1]}
          </p>
          <Formik
            initialValues={{ PINcode: undefined }}
            onSubmit={(values) => {
              const updatedAuthorizationData = { ...authorizationData };
              updatedAuthorizationData.pin = values.PINcode;
              handleSubmitAuthorization(
                updatedAuthorizationData,
                callbackFunction
              );
              closeDialog();
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
              <Form>
                <TextField
                  label='PIN kód'
                  variant='outlined'
                  autoFocus
                  margin='dense'
                  name='PINcode'
                  type='number'
                  value={values.PINcode}
                  onChange={handleChange}
                  sx={{ display: 'flex' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '1rem',
                  }}
                >
                  <Button
                    type='submit'
                    variant='contained'
                    color='warning'
                    sx={styles.acceptButton}
                    startIcon={<DoneIcon />}
                  >
                    Potvrdiť
                  </Button>
                  <Button
                    onClick={closeDialog}
                    variant='outlined'
                    color='error'
                    sx={styles.cancelButton}
                    startIcon={<CancelOutlinedIcon />}
                  >
                    Zrušit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};
export default AuthorizationDialog;
