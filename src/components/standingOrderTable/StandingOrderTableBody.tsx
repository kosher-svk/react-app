import { TableBody } from '@mui/material';

import StandingOrderRow from './standingOrderRow/StandingOrderRow';
import { StandingOrder } from '../../interfaces/standingOrder.interface';

const StandingOrderTableList = ({
  standingOrderList,
  handleClickOpen,
  handleClickDelete,
}: {
  standingOrderList: StandingOrder[];
  handleClickOpen: (id?: number) => void;
  handleClickDelete: (id?: number) => void;
}) => {
  return (
    <TableBody>
      {standingOrderList.map((formData) => {
        return (
          <StandingOrderRow
            formData={formData}
            key={formData.standingOrderId}
            handleClickOpen={handleClickOpen}
            handleClickDelete={handleClickDelete}
          />
        );
      })}
    </TableBody>
  );
};

export default StandingOrderTableList;
