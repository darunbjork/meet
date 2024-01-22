import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li>
      <div>
        <h2>{event.summary}</h2>
        <p>Start Time: {event.created}</p>
        <p>Location: {event.location}</p>
      </div>
      <button onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div>
          {/* Additional details or any other information you want to display when details are shown */}
        </div>
      )}
    </li>
  );
};

export default Event;
