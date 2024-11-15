
import { render } from '@testing-library/react';
import ProfessionalLogin from './ProfessionalLogin';

test('renders ProfessionalLogin component', () => {
  const { getByPlaceholderText } = render(<ProfessionalLogin />);
  expect(getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
});
