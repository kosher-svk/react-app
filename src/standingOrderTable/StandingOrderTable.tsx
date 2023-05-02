import { useEffect, useState } from 'react';
import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableList';
import { StandingOrder } from './standingOrderInterface';
import axios from 'axios';

import Table from '@mui/material/Table';
import FormDialog from './FormDialog';

const url =
  'http://cvicna-uloha-vzor-api-edge.akademia.apps.oshift4.softec.sk/api/standingOrder';

const StandingOrderTable = () => {
  const [dataStandingOrders, setData] = useState<StandingOrder[]>([]);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState<StandingOrder>({} as StandingOrder);

  const handleClickOpenFormDialog = (id: number) => {
    setOpenFormDialog(true);
    if (id) {
      fetchFormData(id);
    } else {
      setFormData({} as StandingOrder);
    }
  };

  const handleClickCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleFormSubmit = async (formData: StandingOrder) => {
    if (formData) {
      try {
        const response = await updateForm(formData);
        if (response === 200) {
          fetchData();
          handleClickCloseFormDialog();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<StandingOrder[]>(url);
      const data = response.data;
      setData(data);
    } catch (error) {}
  };

  const updateForm = async (standingOrder: StandingOrder) => {
    const formUrl = url.concat('/' + standingOrder.standingOrderId);
    const response = await axios.put(formUrl, standingOrder);
    return response.status;
  };
  const fetchFormData = async (standingOrderId: number) => {
    try {
      const formUrl = url.concat('/' + standingOrderId);
      const response = await axios.get<StandingOrder>(formUrl);
      const data = response.data;
      setFormData(data);
      console.log(formData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table className='table'>
        <StandingOrderTableHeader handleClickOpen={handleClickOpenFormDialog} />
        <StandingOrderTableList
          standingOrderList={dataStandingOrders}
          handleClickOpen={handleClickOpenFormDialog}
        />
        <StandingOrderTableFooter standingOrderList={dataStandingOrders} />
      </Table>
      <FormDialog
        openDialog={openFormDialog}
        formData={formData}
        handleClose={handleClickCloseFormDialog}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default StandingOrderTable;
