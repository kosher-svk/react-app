import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableBody';
import FormDialog from './formDialog/FormDialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import formDataNormalizer from '../../utils/FormDataNormalizer';
import { StandingOrder } from '../../interfaces/standingOrder.interface';
import {
  GRID_CARD_INIT_URL,
  GRID_CARD_VALIDATE_URL,
  STANDING_ORDER_URL,
} from '../../constants';
import { Box, Button, Modal, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import validationSchema from './formDialog/validationSchemaPINcode';
import { Validation } from '../../interfaces/validation.interface';

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

const StandingOrderTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataStandingOrders, setData] = useState<StandingOrder[]>([]);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState<StandingOrder>({} as StandingOrder);

  const [openSymbolsDialog, setSymbolsDialog] = useState(false);

  const [openAuthorizationDialog, setAuthorizationDialog] = useState(false);
  const [gridCardCoordinates, setGridCardCoordinates] = useState(-1);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleOpenSymbolDialog = () => {
    setSymbolsDialog(true);
  };

  const handleCloseSymbolDialog = () => {
    setSymbolsDialog(false);
  };

  const handleOpenAuthorizationDialog = () => {
    setAuthorizationDialog(true);
  };

  const handleCloseAuthorizationDialog = () => {
    setAuthorizationDialog(false);
  };

  const handleClickOpenFormDialog = async (id?: number) => {
    if (id) {
      await getForm(id);
    } else {
      setFormData(formDataNormalizer({}));
    }
    setOpenFormDialog(true);
  };

  const handleClickCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleFormSubmit = async (formData: StandingOrder) => {
    if (formData) {
      if (formData.standingOrderId) {
        try {
          await updateForm(formData);
          getAllForms();
          handleClickCloseFormDialog();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await createForm(formData);
          getAllForms();
          handleClickCloseFormDialog();
        } catch (error) {}
      }
    }
  };

  const getAllForms = async () => {
    try {
      const response = await axios.get<StandingOrder[]>(STANDING_ORDER_URL);
      const data = response.data;
      setData(data);
      setLoading(false);
    } catch (error) {}
  };

  const updateForm = async (standingOrder: StandingOrder) => {
    try {
      const formUrl = STANDING_ORDER_URL.concat(
        '/' + standingOrder.standingOrderId
      );
      const response = await axios.put<StandingOrder>(formUrl, standingOrder);
      return response.status;
    } catch (error) {}
  };

  const getForm = async (standingOrderId: number) => {
    try {
      const formUrl = STANDING_ORDER_URL.concat('/' + standingOrderId);
      const response = await axios.get<StandingOrder>(formUrl);
      const formData = response.data;
      const normalizedForm = formDataNormalizer(formData);
      setFormData(normalizedForm);
      return response.status;
    } catch (error) {}
  };

  const createForm = async (standingOrder: StandingOrder) => {
    try {
      const normalizedForm = formDataNormalizer(standingOrder);

      const response = await axios.post<StandingOrder>(
        STANDING_ORDER_URL,
        normalizedForm
      );
      return response.data;
    } catch (error) {}
  };

  const deleteForm = async (standingOrderId?: number) => {
    if (!standingOrderId) return;
    authorization();
    console.log(1);

    if (isAuthorized) {
      console.log(3);
      try {
        const formUrl = STANDING_ORDER_URL.concat('/' + standingOrderId);
        const response = await axios.delete(formUrl);
        if (response.status === 200) {
          getAllForms();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const authorization = () => {
    setIsAuthorized(false);
    getGridCardCoordinates();
    if (gridCardCoordinates) {
      handleOpenAuthorizationDialog();
    }
  };

  const handleSubmitAutorization = async (pinCode: number) => {
    if (pinCode) {
      const validation: Validation = {
        pin: pinCode,
        coordinate: gridCardCoordinates,
      };
      const response = await axios.post<string>(
        GRID_CARD_VALIDATE_URL,
        validation
      );
      const token = response.data;
      if (token) {
        setIsAuthorized(true);
      }
    }
  };

  const getGridCardCoordinates = async () => {
    try {
      const response = await axios.get<number>(GRID_CARD_INIT_URL);
      const gridCardCoordinates = response.data;
      console.log(gridCardCoordinates);
      setGridCardCoordinates(gridCardCoordinates);

      return response.status;
    } catch (error) {}
  };

  useEffect(() => {
    getAllForms();
  }, []);
  return (
    <div>
      <Table className='table'>
        <StandingOrderTableHeader handleClickOpen={handleClickOpenFormDialog} />
        <StandingOrderTableList
          standingOrderList={dataStandingOrders}
          handleClickOpen={handleClickOpenFormDialog}
          handleClickDelete={deleteForm}
        />
        <StandingOrderTableFooter standingOrderList={dataStandingOrders} />
      </Table>
      <FormDialog
        openDialog={openFormDialog}
        formData={formData}
        handleClose={handleClickCloseFormDialog}
        handleFormSubmit={handleFormSubmit}
        handleOpenSymbolDialog={handleOpenSymbolDialog}
        openSymbolsDialog={openSymbolsDialog}
        handleCloseSymbolDialog={handleCloseSymbolDialog}
      />
      <Modal
        open={openAuthorizationDialog}
        onClose={handleCloseAuthorizationDialog}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div>
            <p>
              Zadajte PIN kód z riadku {String(gridCardCoordinates)[0]} a stĺpca{' '}
              {String(gridCardCoordinates)[1]}
            </p>
            <Formik
              initialValues={{ PINcode: 0 }}
              onSubmit={(values) => {
                console.log(values.PINcode);
                handleSubmitAutorization(values.PINcode);
                handleCloseAuthorizationDialog();
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
                      sx={{ marginRight: '1rem' }}
                    >
                      OK
                    </Button>
                    <Button
                      onClick={handleCloseAuthorizationDialog}
                      variant='outlined'
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
    </div>
  );
};

export default StandingOrderTable;
