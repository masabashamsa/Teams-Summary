import React, { useState } from 'react';
import './Modal.css';


const cardJSON = [
    {
      title: "Welcome to Summarize!",
      content: "We are excited to guide you through the essential features of Summarize.",
      buttons: [{ text: "Next", action: "next", isPrimary: true }],
    },
  {
    title: "View Meetings",
    content: "Easily access and review your upcoming meetings right here.",
    buttons: [
      { text: "Previous", action: "previous", isPrimary: false },
      { text: "Next", action: "next", isPrimary: true },
  ],
},
{
  title: "Subscription Options",
  content: "Subscribe to a meeting to receive a summary.",
  buttons: [
    { text: "Previous", action: "previous", isPrimary: false },
    { text: "Next", action: "next", isPrimary: true  },
],
},
{
  title: "Personalized Summaries",
  content: "Receive summaries directly in your personal chat for easy reference.",
  buttons: [
    { text: "Previous", action: "previous", isPrimary: false },
    { text: "Done", action: "done", isPrimary: true  },
],
},

];

const Modal = ({ isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0); 
    if(!isOpen){
      return null
    };

    const handleNext = () => {
        if (currentIndex < cardJSON.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };

      const handlePrevious = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };

      const isLastCard = currentIndex === cardJSON.length - 1;

     return (
        <div className='modal-overlay'>
            <div className='modal-content'>
            <button className="close-button" onClick={() => {
              console.log("Close button clicked");
              onClose();
            }}>×</button> 

            <h2>{cardJSON[currentIndex].title}</h2>
            <p>{cardJSON[currentIndex].content}</p>

             <div className="modal-footer">
             {currentIndex > 0 && (
            <button className="modal-button" onClick={handlePrevious}>Previous</button>
          )}
          <button className="modal-button" onClick={isLastCard ? onClose : handleNext}>
            {isLastCard ? 'Done' : 'Next'}
          </button>

          </div>
         </div>
        </div>
     );
};

export default Modal;