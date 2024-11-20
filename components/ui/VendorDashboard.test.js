
import { render } from '@testing-library/react';
import VendorDashboard from './VendorDashboard';

test('renders VendorDashboard component', () => {
  const { getByText } = render(<VendorDashboard />);
  expect(getByText(/vendor dashboard/i)).toBeInTheDocument();
});
