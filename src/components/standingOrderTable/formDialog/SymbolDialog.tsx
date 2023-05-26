import { Box, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { ConstSymbol } from '../../../interfaces/constSymbol.interface';

const styles = {
  constantSymbolBox: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  },
};

const SymbolDialog = ({
  openSymbolsDialog,
  handleCloseSymbolDialog,
  constSymbols,
  values,
  handleChange,
}: {
  openSymbolsDialog: boolean;
  handleCloseSymbolDialog: () => void;
  constSymbols: ConstSymbol[] | undefined;
  values: string | undefined;
  handleChange: any;
}) => {
  return (
    <div>
      <Modal
        open={openSymbolsDialog}
        onClose={handleCloseSymbolDialog}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={styles.constantSymbolBox}>
          <InputLabel>Zoznam konštantných symbolov</InputLabel>
          <Select
            name='constantSymbol'
            value={values}
            label='Konštantný symbol'
            onChange={(e) => {
              handleChange(e);
              handleCloseSymbolDialog();
            }}
            style={{ display: 'block' }}
          >
            {constSymbols
              ? constSymbols.map((constSymbol, index) => {
                  return (
                    <MenuItem key={index} value={constSymbol.value}>
                      {`[${constSymbol.value}] ${constSymbol.text}`}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </Box>
      </Modal>
    </div>
  );
};
export default SymbolDialog;
