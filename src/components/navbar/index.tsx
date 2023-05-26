import { COLORS } from '../../constants/colors';

const Styles = {
  backgroundColor: COLORS.secondary,
  color: COLORS.text,
  padding: '1rem',
  paddingLeft: '5rem',
};

const Navbar = () => {
  return (
    <div style={Styles}>
      <h1>Prehľad trvalých príkazov</h1>
      <p>
        Trvalé prikazy sú ideálne, keď potrebujete pravidelne posielať platby v
        rovnakej výške. Tu ich môžete upravovať alebo vytvárať nové.
      </p>
    </div>
  );
};

export default Navbar;
