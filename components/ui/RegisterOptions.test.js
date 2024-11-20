
import { render } from '@testing-library/react';
import RegisterOptions from './RegisterOptions';

test('renders RegisterOptions component', () => {
  const { getByText } = render(<RegisterOptions />);
  expect(getByText(/register options/i)).toBeInTheDocument();
});
