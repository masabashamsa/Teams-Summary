import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Text} from "@fluentui/react-components";
import "./Welcome.css";
import axios from "axios";
import Modal from './Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDay} from "@fortawesome/free-solid-svg-icons";

export function Welcome() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeeting, setSelectedMeeting] =useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

 
    useEffect(() => {
      const fetchMeetings = async () => {
        try {
          const response = await fetch('/api/meetings/upcoming');
          if (!response.ok) {
           throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMeetings(data);
          setLoading(false);
        } catch(error) {
          setError(error);
          setLoading(false);
        }
      };
     fetchMeetings();
    }, []);
  

  //Handle meeting selection
 const handleMeetingSelect = (meeting) => {
    setSelectedMeeting(meeting);
    setIsSubscribed(false); //Reset subscription status when a new meeting is selected
  };

  
  //Function to handle subscription
  const handleSubscribe =async (meetingId)=> {
    try {
      const response = await axios.post('/api/subscribe', { meetingId });
      console.log("Subscription successful!", response.data);
    } catch(error) {
      console.error("Error")
    }

   /*if (selectedMeeting) {
      //Subscription logic
      setIsSubscribed(true);
      alert('Subscribed to meeting: ${selectedMeeting.subject}');
    }*/
  }
  
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
       <h1> Upcoming Meetings</h1>
       <div className="meeting-card-container">
        {loading && <p>Loading meetings...</p>}
        {!loading &&meetings.length > 0? (
          meetings.map((meeting) => (
          <Card key={meeting.id} className="meeting-card" onClick={() => handleMeetingSelect(meeting)}>
            <CardHeader
            header={ <Text weight="semibold">
             {meeting.subject}
            </Text> }
            description={<Text> <FontAwesomeIcon icon={faCalendarDay}/>  Day: {meeting.start} </Text>}
            />
            <CardFooter>
              <Text> <FontAwesomeIcon icon={faClock}/>Time: {meeting.time}</Text>
            </CardFooter>
          </Card>          
        ))) : (
          <p>No upcoming meetings available</p>
        )}
       </div>
      
      {selectedMeeting && (
        <div className="selected-meeting-container">
          <h2 className="selected-meeting-title">Selected Meeting Details</h2>
          <p className="selected-meeting-text"><strong>Subject: </strong>{selectedMeeting.subject} </p>
          <p className="selected-meeting-text"><FontAwesomeIcon icon={faCalendarDay} /> <strong>Day: </strong> {selectedMeeting.start} </p>
          <p className="selected-meeting-text"><FontAwesomeIcon icon={faClock} /> <strong>Time: </strong>{selectedMeeting.time}</p>

          {!isSubscribed && (
            <button className="subscribe-button"
            onClick={() => handleSubscribe()}
            >
             Subscribe to receive meeting 
            </button>
          )}

          {isSubscribed && <p className="subscription-message">Subscribed successfully!</p>}
        </div>
      )}

       <Modal 
       isOpen={isModalOpen}
       onClose={handleCloseModal}
       containerClassName="modal-container"
       />

      </div>
    </div>
  );
}
