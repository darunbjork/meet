import { useState } from 'react';
import { ErrorAlert } from './Alert';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);
  const [errorText, setErrorText] = useState('');

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const numericValue = Number(value);

    if (isNaN(numericValue) || numericValue <= 0) {
      setErrorText('Invalid input. Please enter a positive number.');
      setCurrentNOE('');
    } else {
      setNumber(numericValue);
      setCurrentNOE(numericValue);
      setErrorText('');
    }
  };

  return (
    <div id="number-of-events">
      {errorText && <ErrorAlert text={errorText} />}
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
