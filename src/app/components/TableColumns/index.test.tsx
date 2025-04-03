import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableColumns } from '.'

test('renders MyComponent', () => {
  render(<TableColumns />);
  const element = screen.getByText('First Name');
  expect(element).toBeInTheDocument();
});