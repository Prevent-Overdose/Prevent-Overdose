import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import reportsData from './reports.json';

const ODMap = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(reportsData);     // loads the data from the JSON file
  }, []);

  const getColor = (type, reports) => {
    // Determines the color of the marker based on the type and number of reports
    let opacity = Math.min(0.8, reports / 10); // Limit transparency to 0.8
    let color;
    if (type === 'Individual') {
      color = `rgba(255, 0, 0, ${opacity})`; // Red for individuals
    } else if (type === 'Organization') {
      color = `rgba(0, 0, 255, ${opacity})`; // Blue for Organizations
    }
    return color;
  };

  const renderCircles = () => {
    return reports.map((report) => {
      const { id, type, location, reports, park } = report;
      const color = getColor(type, reports);

      return (
        <Circle
          key={id}
          center={location}
          radius={reports * 100} // Radius of the circle based on number of reports
          pathOptions={{
            color: color,
            fillColor: color,
            fillOpacity: 0.5
          }}
        >
          <Popup>
            <div>
              <strong>Type:</strong> {type} <br />
              <strong>Reports:</strong> {reports} <br />
              <strong>Nearest Park:</strong> {park}
            </div>
          </Popup>
        </Circle>
      );
    });
  };

  return (
    <MapContainer center={[27.9506, -82.4572]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {renderCircles()}
    </MapContainer>
  );
};

export default ODMap;
