import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useState } from 'react';
import Sidenav from './SideNav';

const Navbar = ({ isSideNavOpen, toggleSideNav }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="navbar2">
        <div className="left-section">
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleSideNav}>
              ☰
            </button>
          </div>
          <Link to="/" className="navbar-logo">
            <img src="/preventOD logo.png" alt="PreventOD Logo" />
          </Link>
        </div>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          {/*<Link to="/resources">Resources</Link>*/}
          <Link to="/request-narcan" className="navbar-request-narcan">
            <img src="Request Narcan.png" alt="Request Narcan" />
          </Link>
        </nav>
      </div>
      <Sidenav isOpen={isSideNavOpen} toggle={toggleSideNav} />
    </header>
  );
}

export default Navbar;
