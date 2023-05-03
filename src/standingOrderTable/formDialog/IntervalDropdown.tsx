import { MenuItem, Select } from '@mui/material';

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
    case 2:
      return (
        <Select
          name='intervalSpecification'
          value={props.values.intervalSpecification}
          label='Periodicita'
          onChange={props.handleChange}
          style={{ display: 'block' }}
        >
          {daysInWeek.map((day, index) => {
            return (
              <MenuItem selected={index === 3} value={index + 1}>
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
          value={props.values.intervalSpecification}
          label='Periodicita'
          onChange={props.handleChange}
          style={{ display: 'block' }}
        >
          {daysInMonth.map((day, index) => {
            return <MenuItem value={index + 1}>{index + 1 + '.'}</MenuItem>;
          })}
        </Select>
      );

    default:
      return <></>;
  }
};
export default IntervalDropdown;
