import React, { useState }  from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { useSwipeable } from "react-swipeable";


import './styles.css'

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Resources from "./pages/Resources";
import RequestNarcan from "./pages/requestNarcanPage";
import ReportOverdose from "./pages/reportOverdosePage"

import FoundersPage from "./pages/FoundersPage"; // Import your FoundersPage component
import BoardPage from "./pages/BoardPage"; // Import your BoardPage component

function App() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handlers = useSwipeable({
    
    onSwipedRight: () => !isSideNavOpen ? toggleSideNav() : void(0),
    onSwipedLeft: () => isSideNavOpen ? toggleSideNav() : void(0)

  });

  return (
    <Router>
      <div {...handlers}>
        <Navbar isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav}/>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/request-narcan" element={<RequestNarcan/>}></Route>
            <Route path="/report-overdose" element={<ReportOverdose/>}></Route>
            <Route path="/about" element={<AboutUs />} />
            {/*<Route path="/resources" element={<Resources />} />*/}
                    
            <Route path="/founders" element={<FoundersPage />} /> {/* Route for Founders page */}
            <Route path="/board" element={<BoardPage />} /> {/* Route for Board page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
