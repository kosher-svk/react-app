import { useEffect, useState } from 'react';
import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableList';
import { StandingOrder } from '../interfaces/standingOrderInterface';
import axios from 'axios';

import Table from '@mui/material/Table';
import FormDialog from './formDialog/FormDialog';
import formDataNormalizer from '../utils/FormDataNormalizer';
import Modal from '@mui/material/Modal/Modal';
import Box from '@mui/material/Box/Box';

const url =
  'http://cvicna-uloha-vzor-api-edge.akademia.apps.oshift4.softec.sk/api/standingOrder';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
      />
      <Modal
        open={openSymbolsDialog}
        onClose={handleClickCloseSymbolDialog}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id='parent-modal-title'>Text in a modal</h2>
          <p id='parent-modal-description'>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default StandingOrderTable;
