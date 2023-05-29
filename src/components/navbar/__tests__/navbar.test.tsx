import '@testing-library/jest-dom';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import Navbar from '../index';
import { COLORS } from '../../../constants/colors';

test('renders the navbar page', () => {
  render(<Navbar />);
  const headingElement = screen.getByText('Prehľad trvalých príkazov');
  const paragraphElement = screen.getByText(
    'Trvalé prikazy sú ideálne, keď potrebujete pravidelne posielať platby v rovnakej výške. Tu ich môžete upravovať alebo vytvárať nové.'
  );
  const parentElement = headingElement.parentElement;

  expect(headingElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
  expect(parentElement).toHaveStyle(`color: ${COLORS.text}`);
});
