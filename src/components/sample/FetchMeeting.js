import React, { useEffect, useState } from 'react';

const FetchMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const UpcomingMeetings = async () => {
        try {
          const response = await fetch('/api/meetings/upcoming'); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Network response was not okay');
          }
          const data = await response.json(); // Parse the JSON from the response
          setMeetings(data); // Store the meetings data
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      // Call fetchMeetings when the component is mounted
  useEffect(() => {
    UpcomingMeetings();
  }, []);

  // Render loading, error, or meetings data
  return (
    <div>
      {loading && <p>Loading meetings...</p>}
      {error && <p>Error fetching meetings: {error.message}</p>}
      {!loading && meetings.length > 0 && (
        <div>
          <h2>Upcoming Meetings</h2>
          <ul>
            {meetings.map((meeting) => (
                <li key={meeting.id}>
                <strong>{meeting.subject}</strong> - {meeting.start}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchMeetings;