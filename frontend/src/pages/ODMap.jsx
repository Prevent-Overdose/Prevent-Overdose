import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import reportsData from './reports.json';

const ODMap = () => {
  const [reports, setReports] = useState([]);
  const [hoveredCircle, setHoveredCircle] = useState(null);  // State to track which circle is hovered
  const [showDeaths, setShowDeaths] = useState(true);
  const [showReversals, setShowReversals] = useState(true);

  useEffect(() => {
    setReports(reportsData);
  }, []);

  // Function to get color based on number of reports, not transparency but actual color shade
  const getColor = (category, reports) => {
    // More defined shades for deaths and reversals
    const deathColors = ['#FFD6D6', '#FF9999', '#FF5050', '#FF3333', '#CC0000']; // Lighter to darker reds
    const reversalColors = ['#D6FFD6', '#99FF99', '#66FF66', '#33CC33', '#009900']; // Lighter to darker greens

    let color = '';
    if (category === 'death') {
      color = reports >= 4 ? deathColors[4] : deathColors[reports];
    } else if (category === 'reversal') {
      color = reports >= 4 ? reversalColors[4] : reversalColors[reports];
    }
    return color;
  };

  const renderCircles = () => {
    return reports
      .filter(report => (showDeaths && report.category === 'death') || (showReversals && report.category === 'reversal'))
      .map(report => {
        const { id, location, reports, category, park, park_address, type } = report;
        const color = getColor(category, reports);

        // Updated fixed radius: 600 for individuals, 1200 for organizations
        const radius = type === 'individual' ? 600 : 1200;

        // Check if the current circle is being hovered
        const isHovered = hoveredCircle === id;

        return (
          <Circle
            key={id}
            center={location}
            radius={radius}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: isHovered ? 0.2 : 1, // More transparent when hovered
            }}
            eventHandlers={{
              mouseover: () => setHoveredCircle(id),  // On hover, set the current circle as hovered
              mouseout: () => setHoveredCircle(null),  // On mouse out, reset the hover state
            }}
          >
            <Popup>
              <div>
                <strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)} <br />
                <strong>Reports:</strong> {category === 'death' ? 'Overdose Deaths' : 'Overdose Reversals'} - {reports} <br />
                <strong>Nearest Park:</strong> {park} <br />
                <strong>Park Address:</strong> {park_address}
              </div>
            </Popup>
          </Circle>
        );
      });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toggle Buttons */}
      <div style={toggleContainerStyle}>
        <label style={checkboxStyle}>
          <input type="checkbox" checked={showDeaths} onChange={() => setShowDeaths(!showDeaths)} />
          Show Deaths
        </label>
        <label style={checkboxStyle}>
          <input type="checkbox" checked={showReversals} onChange={() => setShowReversals(!showReversals)} />
          Show Reversals
        </label>
      </div>

      {/* Map Container */}
      <MapContainer center={[27.9506, -82.4572]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderCircles()}
      </MapContainer>
    </div>
  );
};

// CSS styles for the toggle controls
const toggleContainerStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column', // Ensures the checkboxes stack vertically
  alignItems: 'flex-start', // Align to the left within the box
};

const checkboxStyle = {
  display: 'block',
  marginBottom: '6px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  color: '#333'
};

export default ODMap;
