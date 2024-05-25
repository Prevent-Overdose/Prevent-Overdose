import {React, useState } from "react";
import './narcanForm.css'

const NarcanForm = ()=>{
    
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [telephone, setTelephone] = useState('')
  const [number, setNumber] = useState('')
  const [ time, setTime] = useState('')
  const [error, setError] = useState(null)
    
  const handleSubmit = async(e)=>{
        
    }



  return (
    <form className="create" onSubmit={handleSubmit}>
      <h4>Send a Request</h4>
      <div className="form-info">
        <p>This is a form to receive bulk 
        shipments of free Narcan, monthly. 
        Our Narcan is supplied by state-specific 
        government agencies. 

        Currently available in  
        <strong> Allegheny county, PA; 
        Hillsborough county, FL; 
        Pinellas county, FL; 
        Alachua county, FL. 
        </strong>
        If not available in your 
        area, contact us through our website.
        </p>

      </div>



      <div>
        <label>Organization:</label>
        <br />
        <input
          type="text"
          name="Organization"
          value={description}
          placeholder="What kind of Organization are you?"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <br />
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contact:</label>
        <br />
        <input
          type="text"
          name="telephone"
          value={telephone}
          placeholder="Enter a number to contact you"
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Occurrences:</label>
        <br />
        <input
          type = "text"
          name="number"
          value={number}
          placeholder="How many overdoses do you see per month?"
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Availability:</label>
        <br />
        <input
          type = "text"
          name="time"
          value={time}
          placeholder="When are you available for delivery and overdose response training?"
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Request</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NarcanForm