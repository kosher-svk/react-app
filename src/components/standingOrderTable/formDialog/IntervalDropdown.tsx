import { MenuItem, Select } from '@mui/material';
import moment from 'moment';

const IntervalDropdown = ({ props }: { props: any }) => {
  const daysInWeek = [
    'Pondelok',
    'Utorok',
    'Streda',
    'Štvrtok',
    'Piatok',
    'Sobota',
    'Nedeľa',
  ];
  const daysInMonth = Array(31).fill('d');

  switch (props.values.intervalId) {
    case 1:
      props.values.intervalSpecification = 0;
      return <></>;
    case 2:
      return (
        <Select
          name='intervalSpecification'
          value={props.values.intervalSpecification || 1}
          onChange={props.handleChange}
          style={{ display: 'block' }}
        >
          {daysInWeek.map((day, index) => {
            return (
              <MenuItem key={index} value={index + 1}>
                {day}
              </MenuItem>
            );
          })}
        </Select>
      );

    case 3:
      return (
        <Select
          name='intervalSpecification'
          value={
            props.values.intervalSpecification || moment().add(1, 'days').date()
          }
          onChange={props.handleChange}
          style={{ display: 'block' }}
        >
          {daysInMonth.map((day, index) => {
            return (
              <MenuItem key={index} value={index + 1}>
                {index + 1 + '.'}
              </MenuItem>
            );
          })}
        </Select>
      );

    default:
      return <></>;
  }
};
export default IntervalDropdown;
