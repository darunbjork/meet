import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEventCount(value);
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="eventCount">Number of Events:</label>
      <input
        type="number"
        id="eventCount"
        name="eventCount"
        value={eventCount}
        onChange={handleInputChange}
        role="textbox"
      />
    </div>
  );
};

export default NumberOfEvents;
