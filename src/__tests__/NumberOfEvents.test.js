import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} />);
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.getByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default number is 32', () => {
    const numberTextBox = NumberOfEventsComponent.getByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });

  test('number of events text box value changes when the user types in it', async () => {
    const user = userEvent;
    const numberTextBox = NumberOfEventsComponent.getByRole('textbox');
    await user.type(numberTextBox, "123");

    // 32 (the default value already written) + 123
    expect(numberTextBox).toHaveValue("32123");
  });
});
