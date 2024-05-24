import { Link } from 'react-router-dom';
import './SideNav.css';
import { useEffect, useRef } from 'react';

const Sidenav = ({ isOpen, toggle }) => {
  const sidenavRef = useRef();

  const handleClickOutside = (event) => {
    if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
      toggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={sidenavRef} className={`sidenav ${isOpen ? 'open' : ''}`}>
      <div className="sidenav-header">
        <Link to="/" className="sidenav-logo" onClick={toggle}>
          <img src="/preventOD white logo.png" alt="PreventOD Logo" />
        </Link>
        <button className="closebtn" onClick={toggle}>×</button>
      </div>
      <div className="sidenav-elements">
        <Link to="/" onClick={toggle}>Home</Link>
        <Link to="/about" onClick={toggle}>About Us</Link>
        <div className="sidenav-about-children">
            <Link to="/founders" onClick={toggle}>Founders</Link>
            <Link to="/board" onClick={toggle}>Board</Link>
        </div>
        <Link to="/resources" onClick={toggle}>Resources</Link>
      </div>
        <Link to="/request-narcan" className="navbar-request-narcan2">
            <img src="Request Narcan.png" alt="Request Narcan" />
        </Link>
    </div>
  );
}

export default Sidenav;
