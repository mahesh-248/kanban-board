// src/Card.js
import React from 'react';

// function Card({ ticket }) {
//   return (
//     <div className="card">
//       <h3>{ticket.title}</h3>
//       <p>Status: {ticket.status}</p>
//       <p>User: {ticket.userId}</p>
//       <p>Priority: {getPriorityText(ticket.priority)}</p>
//     </div>
//   );
// }


function Card({ ticket, user }) {
  return (
    <div className="card">
      <div className="ticket-id">{ticket.id}</div>
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-tag">{ticket.tag}</div>
    </div>
  );
}

// Helper function to get priority text based on priority value
function getPriorityText(priority) {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'No Priority';
  }
}

export default Card;
