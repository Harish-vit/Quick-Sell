import React, { useState } from 'react';
import './styles.css';
import DisplayIcon from './icons/Display.svg'; 

const Header = ({ setGrouping, setOrdering }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleGroupingChange = (value) => {
    setGrouping(value);
  };

  const handleOrderingChange = (value) => {
    setOrdering(value);
  };

  return (
    <header className="header">
      <button className="display-button" onClick={toggleMenu}>
        <img src={DisplayIcon} alt="Display Icon" className="icon" />
        <span>Display</span>
      </button>

      {menuOpen && (
        <div className="dropdown">
          <div className="dropdown-row">
            <span>Grouping</span>
            <select onChange={(e) => handleGroupingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="user">User</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className="dropdown-row">
            <span>Ordering</span>
            <select onChange={(e) => handleOrderingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
