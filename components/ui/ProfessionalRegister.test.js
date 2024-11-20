
import { render } from '@testing-library/react';
import ProfessionalRegister from './ProfessionalRegister';

test('renders ProfessionalRegister component', () => {
  const { getByPlaceholderText } = render(<ProfessionalRegister />);
  expect(getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/email/i)).toBeInTheDocument();
});
