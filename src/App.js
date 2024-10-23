import React, { useEffect, useState } from 'react';
import Header from './Header';
import './styles.css'; 

import noPriorityIcon from './icons/No-priority.svg';
import lowPriorityIcon from './icons/Img - Low Priority.svg';
import mediumPriorityIcon from './icons/Img - Medium Priority.svg';
import highPriorityIcon from './icons/Img - High Priority.svg';
import urgentPriorityIcon from './icons/SVG - Urgent Priority colour.svg';
import backlogIcon from './icons/Backlog.svg';
import todoIcon from './icons/To-do.svg';
import inProgressIcon from './icons/in-progress.svg';
import completedIcon from './icons/Done.svg';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState('priority');
  const [ordering, setOrdering] = useState('priority');

  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketsAndUsers();
  }, []);

  const priorityLabels = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };

const groupTickets = (tickets) => {
  if (grouping === 'priority') {
    return tickets.reduce((groups, ticket) => {
      const priorityLabel = priorityLabels[ticket.priority] || 'No priority';
      if (!groups[priorityLabel]) groups[priorityLabel] = [];
      groups[priorityLabel].push(ticket);
      return groups;
    }, {});
  } else if (grouping === 'user') {
    return tickets.reduce((groups, ticket) => {
      const userName = users.find((u) => u.id === ticket.userId)?.name || 'Unknown User';
      if (!groups[userName]) groups[userName] = [];
      groups[userName].push(ticket);
      return groups;
    }, {});
  } else if (grouping === 'status') {
    return tickets.reduce((groups, ticket) => {
      const statusLabel = ticket.status || 'Unknown Status'; 
      if (!groups[statusLabel]) groups[statusLabel] = [];
      groups[statusLabel].push(ticket);
      return groups;
    }, {});
  }
};


  const groupedTickets = groupTickets(tickets);

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (ordering === 'priority') return a.priority - b.priority;
      if (ordering === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const priorityOrder = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
  const userOrder = users.map((user) => user.name).concat('Unknown User');
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done']; 

  const order = grouping === 'priority' ? priorityOrder : 
                grouping === 'status' ? statusOrder : 
                userOrder;

  return (
    <div>
      <Header setGrouping={setGrouping} setOrdering={setOrdering} />
      <div className="kanban-board">
        {loading ? (
          <p>Loading tickets...</p>
        ) : (
          order.map((group) => (
            <div key={group} className="kanban-column">
              <div className="column-header">
                {grouping === 'priority' && group === 'No priority' && (
                  <img src={noPriorityIcon} alt="No Priority Icon" className="column-icon" />
                )}
                {grouping === 'priority' && group === 'Low' && (
                  <img src={lowPriorityIcon} alt="Low Priority Icon" className="column-icon" />
                )}
                {grouping === 'priority' && group === 'Medium' && (
                  <img src={mediumPriorityIcon} alt="Medium Priority Icon" className="column-icon" />
                )}
                {grouping === 'priority' && group === 'High' && (
                  <img src={highPriorityIcon} alt="High Priority Icon" className="column-icon" />
                )}
                {grouping === 'priority' && group === 'Urgent' && (
                  <img src={urgentPriorityIcon} alt="Urgent Priority Icon" className="column-icon" />
                )}
                {grouping === 'status' && group === 'Backlog' && (
                  <img src={backlogIcon} alt="Backlog Icon" className="column-icon" />
                )}
                {grouping === 'status' && group === 'Todo' && (
                  <img src={todoIcon} alt="Todo Icon" className="column-icon" />
                )}
                {grouping === 'status' && group === 'In progress' && (
                  <img src={inProgressIcon} alt="In Progress Icon" className="column-icon" />
                )}
                {grouping === 'status' && group === 'Done' && (
                  <img src={completedIcon} alt="Completed Icon" className="column-icon" />
                )}
                <h3>{group}</h3>
              </div>
              <ul>
                {groupedTickets[group]?.length > 0 ? (
                  sortTickets(groupedTickets[group]).map((ticket) => (
                    <li key={ticket.id} className="ticket-card">
                      <strong>{ticket.title}</strong>
                      <p>Status: {ticket.status}</p>
                      <p>Priority: {priorityLabels[ticket.priority]}</p>
                    </li>
                  ))
                ) : (
                  <p>No tickets</p>
                )}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
