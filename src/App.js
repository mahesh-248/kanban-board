import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import axios from 'axios';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [userNamesMap, setUserNamesMap] = useState({});
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);

  useEffect(() => {
    // fetch('/data.json')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTickets(data.tickets);
    //     setUsers(data.users);

        
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        const data = response.data;
        setTickets(data.tickets);
        setUsers(data.users);
        const userMap = {};
        data.users.forEach((user) => {
          userMap[user.id] = user.name;
        });
        setUserNamesMap(userMap);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const toggleDisplayDropdown = () => {
    setDisplayDropdownOpen(!displayDropdownOpen);
  };

  return (
    <div className="App">
      <nav className="navbar">
        {/* <h1>Kanban Board</h1> */}
      {/* </nav> */}
      <div className={`display-box ${displayDropdownOpen ? 'active' : ''}`}>
        <span onClick={toggleDisplayDropdown}>Display &#x25BE;</span>
        <div className="display-dropdown">
          <label htmlFor="groupDropdown">Group By:</label>
          <select
            id="groupDropdown"
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
          >
            <option value="status">By Status</option>
            <option value="user">By User</option>
            <option value="priority">By Priority</option>
          </select>
          <label htmlFor="sortDropdown">Sort By:</label>
          <select
            id="sortDropdown"
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      </nav>
      <Board
        tickets={tickets}
        userNamesMap={userNamesMap}
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
      />
    </div>
  );
}

export default App;

  



