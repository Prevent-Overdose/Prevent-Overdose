import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="navbar">
        <div className="left-section">
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              ☰
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                <Link to="/" onClick={toggleDropdown}>Home</Link>
                <Link to="/about" onClick={toggleDropdown}>About Us</Link>
                <Link to="/resources" onClick={toggleDropdown}>Resources</Link>
              </div>
            )}
          </div>
          <Link to="/" className="navbar-logo">
            <img src="/preventOD white logo.png" alt="PreventOD Logo" />
          </Link>
        </div>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/request-narcan" className="navbar-request-narcan">
            <img src="/Request Narcan.png" alt="Request Narcan" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
