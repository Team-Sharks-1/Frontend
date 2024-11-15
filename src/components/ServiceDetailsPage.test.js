
import { render } from '@testing-library/react';
import ServiceDetailsPage from './ServiceDetailsPage';

test('renders ServiceDetailsPage component', () => {
  const { getByText } = render(<ServiceDetailsPage />);
  expect(getByText(/service details/i)).toBeInTheDocument();
});
