
import { render } from '@testing-library/react';
import UserLogin from './UserLogin';

test('renders UserLogin component', () => {
  const { getByPlaceholderText } = render(<UserLogin />);
  expect(getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
});
