import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './narcanForm.css';

const NarcanForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    state: '',
    county: '',
    address: '',
    phoneNumber: '',
    email: '',
    boxesOfNarcan: '',
    availability: [{ date: null, startTime: null, endTime: null }],
    fatalOverdoses: '',
    nonFatalOverdoses: '',
    reversedOverdoses: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (index, date) => {
    const newAvailability = formData.availability.map((avail, i) => {
      if (i === index) {
        return { ...avail, date };
      }
      return avail;
    });
    setFormData({ ...formData, availability: newAvailability });
  };

  const handleTimeChange = (index, time, timeType) => {
    const newAvailability = formData.availability.map((avail, i) => {
      if (i === index) {
        if (timeType === 'startTime' && avail.endTime && time > avail.endTime) {
          setError('Start time cannot be after end time');
          return avail;
        }
        if (timeType === 'endTime' && avail.startTime && time < avail.startTime) {
          setError('End time cannot be before start time');
          return avail;
        }
        setError(null);
        return { ...avail, [timeType]: time };
      }
      return avail;
    });
    setFormData({ ...formData, availability: newAvailability });
  };

  const addAvailability = () => {
    setFormData({
      ...formData,
      availability: [...formData.availability, { date: null, startTime: null, endTime: null }]
    });
  };

  const deleteAvailability = (index) => {
    const newAvailability = formData.availability.filter((_, i) => i !== index);
    setFormData({ ...formData, availability: newAvailability });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    for (const avail of formData.availability) {
      if (avail.startTime && avail.endTime && avail.startTime >= avail.endTime) {
        setError('End time cannot be earlier than or the same as start time.');
        return;
      }
    }

    try {
      const response = await fetch("/api/narcan", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setFormData({
        organizationName: '',
        state: '',
        county: '',
        address: '',
        phoneNumber: '',
        email: '',
        boxesOfNarcan: '',
        availability: [{ date: null, startTime: null, endTime: null }],
        fatalOverdoses: '',
        nonFatalOverdoses: '',
        reversedOverdoses: ''
      });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h4>Send a Request</h4>
      <div>
        <label>Organization Name:</label>
        <br />
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          placeholder="Enter organization name"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <br />
        <input
          type="text"
          name="state"
          value={formData.state}
          placeholder="Enter state"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>County:</label>
        <br />
        <input
          type="text"
          name="county"
          value={formData.county}
          placeholder="Enter county"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <br />
        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Enter address"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter phone number"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Boxes of Narcan:</label>
        <br />
        <input
          type="number"
          name="boxesOfNarcan"
          value={formData.boxesOfNarcan}
          placeholder="Enter number of boxes of Narcan"
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div>
        <label>Availability:</label>
        {formData.availability.map((avail, index) => (
          <div key={index}>
            <DatePicker
              selected={avail.date}
              onChange={(date) => handleDateChange(index, date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              required
            />
            <DatePicker
              selected={avail.startTime}
              onChange={(time) => handleTimeChange(index, time, 'startTime')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Start Time"
              dateFormat="h:mm aa"
              placeholderText="Select start time"
              required
            />
            <DatePicker
              selected={avail.endTime}
              onChange={(time) => handleTimeChange(index, time, 'endTime')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="End Time"
              dateFormat="h:mm aa"
              placeholderText="Select end time"
              required
            />
            <button type="button" onClick={() => deleteAvailability(index)}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={addAvailability}>Add Availability</button>
      </div>
      <div>
        <label>Fatal Overdoses:</label>
        <br />
        <input
          type="number"
          name="fatalOverdoses"
          value={formData.fatalOverdoses}
          placeholder="Enter number of fatal overdoses"
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div>
        <label>Non-Fatal Overdoses:</label>
        <br />
        <input
          type="number"
          name="nonFatalOverdoses"
          value={formData.nonFatalOverdoses}
          placeholder="Enter number of non-fatal overdoses"
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div>
        <label>Reversed Overdoses:</label>
        <br />
        <input
          type="number"
          name="reversedOverdoses"
          value={formData.reversedOverdoses}
          placeholder="Enter number of reversed overdoses"
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <button type="submit">Submit Request</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NarcanForm;
