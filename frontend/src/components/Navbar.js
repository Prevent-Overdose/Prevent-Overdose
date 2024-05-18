import { Link } from 'react-router-dom'

const Navbar = () => {
  



 
  

  return (
    <header>
      <div className="navbar">
        <nav>
        <Link to="/">Home</Link>
        
        <Link to="/about">About Us</Link>
        <Link to="/resources">Resources</Link>

         
        </nav>
      </div>
    </header>
  )
}

export default Navbar