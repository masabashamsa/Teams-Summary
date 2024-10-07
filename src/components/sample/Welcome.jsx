/* global MicrosoftGraph */
import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Text} from "@fluentui/react-components";
import "./Welcome.css";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";
import axios from "axios";
import { getMeetings } from './Graph';
import Modal from './Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDay} from "@fortawesome/free-solid-svg-icons";

export function Welcome({meeting}) {
  
  const { teamsUserCredential } = useContext(TeamsFxContext);
  
  const { data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
 
  const [meetings, setMeetings] = useState([
    { id: "1", subject: "Team Sync", start: "2024-10-03", time: "T10:00:00", },
    { id: "2", subject: "Project Review", start: "2024-10-03", time: "T12:00:00",},
    { id: "3", subject: "Planning Session", start: "2024-10-04", time:"T09:00:00",  },
    { id: "4", subject: "One-on-One", start: "2024-10-04", time: "T11:00:00",},
    { id: "5", subject: "Client Call", start: "2024-10-05", time: "10:00:00", },
  ]);

  const [selectedMeeting, setSelectedMeeting] =useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

 
    useEffect(() => {
      const fetchMeetings = async () => {
        try {
          const meetings = await getMeetings();
          setMeetings(meetings);
        } catch(error) {
          console.error("Error fetching meetings", error);
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

   /* if (selectedMeeting) {
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

       <h1> Upcoming Meetings </h1>

       <div className="meeting-card-container">

        {meetings.length > 0? (
          meetings.map((meeting) => (
          <Card key={meeting.id} className="meeting-card" onClick={() => handleMeetingSelect(meeting)}>
            
            <CardHeader
            header={<Text weight="semibold">
              {meeting.subject}
            </Text>}
            description={<Text> <FontAwesomeIcon icon={faCalendarDay} />  Day: {meeting.start} </Text>}/>
            <CardFooter>
              <Text> <FontAwesomeIcon icon={faClock} /> Time: {meeting.time}</Text>
            </CardFooter>
          </Card>          
        ))) : (
          <p>No upcoming meetings scheduled.</p>
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
              Subscribe to receive summary
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
