import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './styles.css'

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Resources from "./pages/Resources";
import RequestNarcan from "./pages/requestNarcanPage";

import FoundersPage from "./pages/FoundersPage"; // Import your FoundersPage component
import BoardPage from "./pages/BoardPage"; // Import your BoardPage component

function App() {
  return (
     <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/request-narcan" element={<RequestNarcan/>}></Route>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/resources" element={<Resources />} />
                
                <Route path="/founders" element={<FoundersPage />} /> {/* Route for Founders page */}
                <Route path="/board" element={<BoardPage />} /> {/* Route for Board page */}
                
            </Routes>
        </Router>
  );
}

export default App;
