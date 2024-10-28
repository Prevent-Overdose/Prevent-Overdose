import React, { useState, useEffect }  from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import './styles.css'

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Resources from "./pages/Resources";
import RequestNarcan from "./pages/RequestNarcanPage";
import ReportOverdose from "./pages/ReportOverdosePage"
import UpdateNarcanAvailability from "./pages/UpdateNarcanAvailability";
import CancelShipmentsForm from "./components/CancelShipmentsForm";
import FoundersPage from "./pages/FoundersPage";
import BoardPage from "./pages/BoardPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <Router>
      <ScrollToTop />
        <Navbar isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav}/>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/request-narcan" element={<RequestNarcan/>} />
            <Route path="/report-overdose" element={<ReportOverdose/>} />
            <Route path="/update-availability" element={<UpdateNarcanAvailability />} />
            <Route path="/cancel-shipments" element={<CancelShipmentsForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/founders" element={<FoundersPage />} />
            <Route path="/board" element={<BoardPage />} />
          </Routes>
        </main>
        <Footer />
    </Router>
  );
}

export default App;