import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableBody';
import FormDialog from './formDialog/FormDialog';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';

import formDataNormalizer from '../../utils/FormDataNormalizer';
import { StandingOrder } from '../../interfaces/standingOrder.interface';

const url =
  'http://cvicna-uloha-vzor-api-edge.akademia.apps.oshift4.softec.sk/api/standingOrder';

const StandingOrderTable = () => {
  const [dataStandingOrders, setData] = useState<StandingOrder[]>([]);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState<StandingOrder>({} as StandingOrder);

  const [openSymbolsDialog, setSymbolsDialog] = useState(false);

  const handleClickOpenSymbolDialog = () => {
    setSymbolsDialog(true);
  };

  const handleClickCloseSymbolDialog = () => {
    setSymbolsDialog(false);
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
      const response = await axios.get<StandingOrder[]>(url);
      const data = response.data;
      setData(data);
    } catch (error) {}
  };

  const updateForm = async (standingOrder: StandingOrder) => {
    try {
      const formUrl = url.concat('/' + standingOrder.standingOrderId);
      const response = await axios.put<StandingOrder>(formUrl, standingOrder);
      return response.status;
    } catch (error) {}
  };

  const getForm = async (standingOrderId: number) => {
    try {
      const formUrl = url.concat('/' + standingOrderId);
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

      const response = await axios.post<StandingOrder>(url, normalizedForm);
      return response.data;
    } catch (error) {}
  };

  const deleteForm = async (standingOrderId?: number) => {
    if (!standingOrderId) return;
    try {
      const formUrl = url.concat('/' + standingOrderId);
      const response = await axios.delete(formUrl);
      if (response.status === 200) {
        getAllForms();
      }
    } catch (error) {
      console.log(error);
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
        openDialog={openFormDialog}
        formData={formData}
        handleClose={handleClickCloseFormDialog}
        handleFormSubmit={handleFormSubmit}
        handleOpenSymbolDialog={handleClickOpenSymbolDialog}
        openSymbolsDialog={openSymbolsDialog}
        handleCloseSymbolDialog={handleClickCloseSymbolDialog}
      />
    </div>
  );
};

export default StandingOrderTable;
