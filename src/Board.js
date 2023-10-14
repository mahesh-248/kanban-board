import React from 'react';
import Card from './Card';
import { useMemo } from 'react';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No Priority',
};

const priorityOrder = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];


function Board({ tickets, userNamesMap, groupingOption, setGroupingOption, sortingOption, setSortingOption }) {
  // Grouping Logic
  const groupedTickets = {};

  if (groupingOption === 'user') {
    tickets.forEach((ticket) => {
      const userName = userNamesMap[ticket.userId] || 'Unknown User';

      if (!groupedTickets[userName]) {
        groupedTickets[userName] = [];
      }

      groupedTickets[userName].push(ticket);
    });
  } else if (groupingOption === 'status' || groupingOption === 'priority') {
    tickets.forEach((ticket) => {
      const groupKey =
        groupingOption === 'status'
          ? ticket.status
          : groupingOption === 'priority'
          ? ticket.priority
          : 'Uncategorized';

      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }

      groupedTickets[groupKey].push(ticket);
    });
  }

  // Sorting Logic
  const sortedGroups = Object.keys(groupedTickets).sort((a, b) => {
    if (sortingOption === 'priority') {
      return b - a; // Sort by priority (descending)
    } else if (sortingOption === 'title') {
      return a.localeCompare(b, undefined, { sensitivity: 'base' }); // Sort by title (ascending)
    }
  });


const groupedData = useMemo(() => {
    const grouped = {};

    tickets.forEach((ticket) => {
      const groupKey =
        groupingOption === 'user'
          ? userNamesMap[ticket.userId] // Use userNamesMap to get user name for grouping by user
          : groupingOption === 'priority'
          ? priorityLabels[ticket.priority] // Use priorityLabels for grouping by priority
          : ticket[groupingOption];

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }

      grouped[groupKey].push(ticket);
    });

    return grouped;
  }, [tickets, userNamesMap, groupingOption]);
  

return (
    <div className="board">
      {groupedData && Object.keys(groupedData).length === 0 ? (
        <div className="no-tickets">No tickets available.</div>
      ) : (
        <>
          {Object.entries(groupedData).map(([group, groupTickets]) => (
            <div key={group} className="group">
              <div className="group-header">
                {/* Display the group name (user name) and number of cards */}
                <h2>
                  {group}    <small className='fntWgt'>{groupTickets.length}</small>
                </h2>
              </div>
              <div className="group-cards">
                {groupTickets.map((ticket) => (
                  <Card key={ticket.id} ticket={ticket} user={group} /> 
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
    
}

export default Board;
