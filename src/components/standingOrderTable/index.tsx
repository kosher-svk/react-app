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
import { Validation } from '../../interfaces/validation.interface';
import AuthorizationDialog from './authorizationDialog/AuthorizationDialog';

const StandingOrderTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataStandingOrders, setData] = useState<StandingOrder[]>([]);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState<StandingOrder>({} as StandingOrder);

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
      return response;
    } catch (error) {}
  };

  const deleteForm = (standingOrderId?: number) => {
    if (!standingOrderId) return;
    authorization(() => {
      debugger;
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
