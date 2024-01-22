import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Event from '../components/Event';

// Mock event data
const mockEvent = {
  id: '123',
  summary: 'Test Event',
  location: 'Test Location',
  created: '2024-01-22T12:00:00Z',
};

test('renders event information correctly', () => {
  render(<Event event={mockEvent} />);

  // Test rendering of event details
  const eventTitle = screen.getByText(/Test Event/i);
  const startTime = screen.getByText(`Start Time: ${mockEvent.created}`);
  const location = screen.getByText(`Location: ${mockEvent.location}`);

  expect(eventTitle).toBeInTheDocument();
  expect(startTime).toBeInTheDocument();
  expect(location).toBeInTheDocument();

  // Test initial state of show details button
  const showDetailsButton = screen.getByRole('button', { name: /Show Details/i });
  expect(showDetailsButton).toBeInTheDocument();
});

test('toggles event details on button click', () => {
  render(<Event event={mockEvent} />);

  // Click the show details button
  const showDetailsButton = screen.getByRole('button', { name: /Show Details/i });
  fireEvent.click(showDetailsButton);

  // Test that details are shown
  const hideDetailsButton = screen.getByRole('button', { name: /Hide Details/i });
  expect(hideDetailsButton).toBeInTheDocument();

  // Click the hide details button
  fireEvent.click(hideDetailsButton);

  // Test that details are hidden again
  const showDetailsButtonAfterHide = screen.getByRole('button', { name: /Show Details/i });
  expect(showDetailsButtonAfterHide).toBeInTheDocument();
});
