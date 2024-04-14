import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Resources from "./pages/Resources";

function App() {
  return (
     <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                
                <Route path="/resources" element={<Resources />} />
                
            </Routes>
        </Router>
  );
}

export default App;
