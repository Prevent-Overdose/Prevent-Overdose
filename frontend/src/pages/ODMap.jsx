// ODMap.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const ODMap = () => {
  const [reports, setReports] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('2024-09');

  useEffect(() => {
    // Fetch overdose data based on the selected month
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/odmap/${selectedMonth}`);
        console.log('API Response:', response.data); // Log to verify data
        setReports(response.data.reports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [selectedMonth]);

  const getColor = (type) => {
    return type === 'organization' ? 'red' : 'green';
  };

  const getRadius = (type) => {
    return type === 'organization' ? 1200 : 600;
  };

  const renderCircles = () =>
    reports.map((report, index) => {
      const { address, fatal, nonfatal, reversed, coordinates, type } = report;
      const color = getColor(type);
      const radius = getRadius(type);

      return (
        <Circle
          key={index}
          center={coordinates}
          radius={radius}
          pathOptions={{
            color,
            fillColor: color,
            fillOpacity: 0.6,
          }}
        >
          <Popup>
            <div>
              <strong>Address:</strong> {address} <br />
              <strong>Fatal:</strong> {fatal} <br />
              <strong>Nonfatal:</strong> {nonfatal} <br />
              <strong>Reversed:</strong> {reversed}
            </div>
          </Popup>
        </Circle>
      );
    });

  return (
    <div style={{ position: 'relative' }}>
      {/* Month Selector */}
      <div style={toggleContainerStyle}>
        <label style={checkboxStyle}>
          Month:
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>

      {/* Map Container */}
      <MapContainer center={[27.9506, -82.4572]} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {/* Render Circles */}
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
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const checkboxStyle = {
  display: 'block',
  marginBottom: '6px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  color: '#333',
};

export default ODMap;
