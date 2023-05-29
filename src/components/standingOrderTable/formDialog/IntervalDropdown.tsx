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
  let initialValue = props.values.intervalSpecification;
  switch (props.values.intervalId) {
    case 1:
      props.values.intervalSpecification = 0;
      return <></>;
    case 2:
      if (!initialValue || initialValue < 1 || initialValue > 7) {
        props.values.intervalSpecification = 1;
      }
      return (
        <Select
          name='intervalSpecification'
          value={props.values.intervalSpecification}
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
      if (!initialValue || initialValue < 1 || initialValue > 31) {
        props.values.intervalSpecification = moment().add(1, 'days').date();
      }
      return (
        <Select
          name='intervalSpecification'
          value={props.values.intervalSpecification}
          onChange={props.handleChange}
          fullWidth
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
