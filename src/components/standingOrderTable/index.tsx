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

const Styles = {
  table: {
    margin: '20px',
    width: '1240px',
  },
};

const StandingOrderTable = () => {
  const [dataStandingOrders, setData] = useState<StandingOrder[]>([]);
  const [formData, setFormData] = useState<StandingOrder>({} as StandingOrder);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openSymbolsDialog, setSymbolsDialog] = useState(false);
  const [openAuthorizationDialog, setAuthorizationDialog] = useState(false);

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

  const getAllForms = async () => {
    try {
      const response = await axios.get<StandingOrder[]>(STANDING_ORDER_URL);
      const data = response.data;
      setData(data);
    } catch (error) {}
  };

  const updateForm = (standingOrder: StandingOrder) => {
    authorization(() => {
      try {
        const formUrl = STANDING_ORDER_URL.concat(
          '/' + standingOrder.standingOrderId
        );
        const response = axios.put<StandingOrder>(formUrl, standingOrder);
        return response.then((res) => {
          getAllForms();
          handleClickCloseFormDialog();
        });
      } catch (error) {}
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
      try {
        const normalizedForm = formDataNormalizer(standingOrder);
        const response = axios.post<StandingOrder>(
          STANDING_ORDER_URL,
          normalizedForm
        );
        return response.then((res) => {
          getAllForms();
          handleClickCloseFormDialog();
        });
      } catch (error) {
        return null;
      }
    });
  };

  const deleteForm = (standingOrderId?: number) => {
    if (!standingOrderId) return;
    authorization(() => {
      try {
        const formUrl = STANDING_ORDER_URL.concat('/' + standingOrderId);
        const response = axios.delete(formUrl);
        response.then((res) => {
          if (res.status === 200) {
            getAllForms();
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  const [callbackFunction, setCallbackFunction] = useState<() => void>(
    () => {}
  );
  const authorization = (callback: () => void) => {
    debugger;
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
    <div>
      <Table className='table' style={Styles.table}>
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
    </div>
  );
};

export default StandingOrderTable;
