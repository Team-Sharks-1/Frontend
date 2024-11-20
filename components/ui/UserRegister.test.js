
import { render } from '@testing-library/react';
import UserRegister from './UserRegister';

test('renders UserRegister component', () => {
  const { getByPlaceholderText } = render(<UserRegister />);
  expect(getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/email/i)).toBeInTheDocument();
});
