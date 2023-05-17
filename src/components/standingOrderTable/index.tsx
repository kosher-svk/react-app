import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableBody';
import FormDialog from './formDialog/FormDialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import formDataNormalizer from '../../utils/FormDataNormalizer';
import { StandingOrder } from '../../interfaces/standingOrder.interface';
import { GRID_CARD_VALIDATE_URL, STANDING_ORDER_URL } from '../../constants';
import { Validation } from '../../interfaces/validation.interface';
import AuthorizationDialog from './authorizationDialog/AuthorizationDialog';
import { Alert, Snackbar } from '@mui/material';
import { Severity, SnackbarMessage } from '../../interfaces/snackbarMessage';

const Styles = {
  table: {
    padding: '1rem',
    paddingRight: '7rem',
    paddingLeft: '7rem',
    paddingBottom: '0rem',
  },
};

const StandingOrderTable = () => {
  const [dataStandingOrders, setData] = useState<StandingOrder[]>([]);
  const [formData, setFormData] = useState<StandingOrder>({} as StandingOrder);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openSymbolsDialog, setSymbolsDialog] = useState(false);
  const [openAuthorizationDialog, setAuthorizationDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarMessage>({
    state: false,
  } as SnackbarMessage);

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

  const handleOpenSnackbar = (severity: Severity, message: string) => {
    setSnackbarMessage({ state: true, severity: severity, message: message });
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage({ state: false });
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
          updateForm(formData);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          createForm(formData);
        } catch (error) {}
      }
    }
  };

  const getAllForms = () => {
    const response = axios.get<StandingOrder[]>(STANDING_ORDER_URL);
    return response
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((error) => {
        handleOpenSnackbar(Severity.Error, error.message);
      });
  };

  const updateForm = (standingOrder: StandingOrder) => {
    authorization(() => {
      const formUrl = STANDING_ORDER_URL.concat(
        '/' + standingOrder.standingOrderId
      );
      const response = axios.put<StandingOrder>(formUrl, standingOrder);
      return response
        .then((res) => {
          getAllForms();
          handleClickCloseFormDialog();
        })
        .catch((error) => {
          handleOpenSnackbar(Severity.Error, error.message);
        });
    });
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

  const createForm = (standingOrder: StandingOrder) => {
    if (!standingOrder) return;
    authorization(() => {
      const normalizedForm = formDataNormalizer(standingOrder);
      const response = axios.post<StandingOrder>(
        STANDING_ORDER_URL,
        normalizedForm
      );
      return response
        .then((res) => {
          getAllForms();
          handleClickCloseFormDialog();
        })
        .catch((error) => {
          handleOpenSnackbar(Severity.Error, error.message);
          getAllForms();
          handleClickCloseFormDialog();
        });
    });
  };

  const deleteForm = (standingOrderId?: number) => {
    if (!standingOrderId) return;
    authorization(() => {
      const formUrl = STANDING_ORDER_URL.concat('/' + standingOrderId);
      const response = axios.delete(formUrl);
      response
        .then((res) => {
          if (res.status === 200) {
            getAllForms();
          }
        })
        .catch((error) => {
          handleOpenSnackbar(Severity.Error, error.message);
        });
    });
  };
  const [callbackFunction, setCallbackFunction] = useState<() => void>(
    () => {}
  );
  const authorization = (callback: () => void) => {
    setCallbackFunction(() => callback);
    handleOpenAuthorizationDialog();
  };

  const handleSubmitAuthorization = async (
    authorizationData: Validation,
    callback: () => void
  ) => {
    if (authorizationData) {
      const response = await axios.post<string>(
        GRID_CARD_VALIDATE_URL,
        authorizationData
      );
      const token = response.data;
      if (token) {
        callback();
      }
    }
  };

  useEffect(() => {
    getAllForms();
  }, []);
  return (
    <div style={Styles.table}>
      <Table>
        <StandingOrderTableHeader handleClickOpen={handleClickOpenFormDialog} />
        <StandingOrderTableList
          standingOrderList={dataStandingOrders}
          handleClickOpen={handleClickOpenFormDialog}
          handleClickDelete={deleteForm}
        />
        <StandingOrderTableFooter standingOrderList={dataStandingOrders} />
      </Table>
      <FormDialog
        formData={formData}
        openDialog={openFormDialog}
        handleClose={handleClickCloseFormDialog}
        handleFormSubmit={handleFormSubmit}
        handleOpenSymbolDialog={handleOpenSymbolDialog}
        openSymbolsDialog={openSymbolsDialog}
        handleCloseSymbolDialog={handleCloseSymbolDialog}
      />
      <AuthorizationDialog
        openDialog={openAuthorizationDialog}
        closeDialog={handleCloseAuthorizationDialog}
        handleSubmitAuthorization={handleSubmitAuthorization}
        callbackFunction={callbackFunction}
      />

      <Snackbar
        open={snackbarMessage.state}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarMessage.severity}>
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StandingOrderTable;
