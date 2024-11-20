
import { render } from '@testing-library/react';
import LoginOptions from './LoginOptions';

test('renders LoginOptions component', () => {
  const { getByText } = render(<LoginOptions />);
  expect(getByText(/login options/i)).toBeInTheDocument();
});
