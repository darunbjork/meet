import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

test('renders NumberOfEvents component correctly', () => {
  const { container } = render(<NumberOfEvents />);
  expect(container.querySelector('#numberOfEvents')).toBeInTheDocument();
});

test('contains an element with role of textbox', () => {
  const { queryByRole } = render(<NumberOfEvents />);
  const textBox = queryByRole('textbox');
  expect(textBox).toBeInTheDocument();
});

test('default value of the input field is 32', () => {
  const { queryByRole } = render(<NumberOfEvents />);
  const textBox = queryByRole('textbox');
  expect(textBox.value).toBe('32');
});

test('updates value when user types in the input field', async () => {
  const { queryByRole } = render(<NumberOfEvents />);
  const textBox = queryByRole('textbox');

  // Use fireEvent.change to simulate a user changing the input
  fireEvent.change(textBox, { target: { value: '10' } });

  expect(textBox.value).toBe('10');
});
