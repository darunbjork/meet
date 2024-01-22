import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    const EventListComponent = render(<EventList events={allEvents} />);
    
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});
