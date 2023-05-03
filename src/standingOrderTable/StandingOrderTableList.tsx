import { TableBody } from '@mui/material';
import { StandingOrder } from '../interfaces/standingOrderInterface';
import StandingOrderRow from './standingOrderRow/StandingOrderRow';

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
