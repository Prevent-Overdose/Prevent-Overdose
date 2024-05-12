import { Link } from 'react-router-dom'

const Navbar = () => {
  



 
  

  return (
    <header>
      <div className="navbar">
       
        <h1 className='title'>PreventOD</h1>

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