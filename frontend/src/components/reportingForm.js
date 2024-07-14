import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './narcanForm.css';
import { TextField } from '@mui/material/';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Tooltip, IconButton } from '@mui/material/';
import HelpIcon from '@mui/icons-material/Help';




const ReportingForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    zipcode: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isZipValid, setIsZipValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [phoneErrorMessage, setphoneErrorMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleTermsChange = (event) => {
    setAgreedToTerms(event.target.checked);
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const formattedPhoneNumber = formatPhoneNumber(value);
      if (formattedPhoneNumber.length >= 12) {
        setIsPhoneValid(true)
      
      }
      else {
        setIsPhoneValid(false)
        setphoneErrorMessage("Phone number must have 10 digits.")
      }
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    
    } 
    else if (name === 'zipcode') {
        const isValidZipCode = /^\d{0,5}$/.test(value);
        setIsZipValid(value.length === 5)
        if (isValidZipCode) {
            setFormData({ ...formData, [name]: value });
        }

    }    
    else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleToggle = () =>{
    setTooltipOpen((prev)=> !prev)

  };

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getNearbyParks = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://prevent-overdose-github-io.onrender.com/api/places?latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nearby parks:", error);
    return null;
  }
};

const getAddressFromLatLng = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://prevent-overdose-github-io.onrender.com/api/geocode?latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error("Error fetching address from latlng:", error);
    return null;
  }
};

const autofillAddressAndZipcode = async () => {
  try {
    const location = await getUserLocation();
   
    const parks = await getNearbyParks(location.latitude, location.longitude);
    
    
    if (parks.candidates && parks.candidates.length > 0) { 
      const parkLocation = parks.candidates[0].geometry.location; 
      const address = await getAddressFromLatLng(parkLocation.lat, parkLocation.lng);

      const parkAddress = address.formatted_address;
      const zipcode = address.address_components.find((component) =>
        component.types.includes("postal_code")
      ).long_name;
      
      setFormData({
        ...formData,
        address: parkAddress,
        zipcode: zipcode,
      });
    } else {
      console.error("No parks found nearby.");
    }
  } catch (error) {
    console.error("Error getting user location or nearby parks:", error);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  

  if(!agreedToTerms){
    setError('Please agree to the Terms of Service.')
    return
  }
    

 if(!isPhoneValid || !isZipValid){
    setError('Please enter valid inputs.');
    return;
 }

  const dataToSend = {
    ...formData,
    phoneNumber: formData.phoneNumber.replace(/[^\d]/g, '')
  };

  
    

  try {
    const response = await fetch("https://prevent-overdose-github-io.onrender.com/api/sms/createReporter", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    console.log(response.status)
    
    if (!response.ok) {
      console.log(response.status)
      
      // Handle specific HTTP error statuses
      if (response.status === 400) {
          toast.error('Phone number already exists.');
          setIsPhoneValid(false)
          setphoneErrorMessage("Phone number has already been added.")
      } else {
          // Handle other error statuses (like 500 Internal Server Error)
          toast.error("Failed to submit the form.");
      }
      setSubmitted(false);
      return; // Exit the function to prevent further execution
  }
    else {
      toast.success("Successfully signed up for overdose reporting!")
      console.log(response)
    }
    const result = await response.json();
    console.log('Form submitted successfully:', result);
    setFormData({
        address: '',
        zipcode: '',
        phoneNumber: '',
      });
      setAgreedToTerms(false);
    setError(null);
    setSubmitted(true);
  } catch (error) {
    setError(error.message);
  }

};

return (
  <div className="formcontainer" style={{ backgroundColor: '#171a1d', border: '3px solid #ccc' }}>
    <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    <form className="create" onSubmit={handleSubmit}>
      <h1 style={{ marginBottom: "0px"}}><strong style={{ fontSize: "50px"}}>Overdose Reporting Survey</strong></h1>
      <div >
        <p className='form-info'>
        Our overdose reporting form is a three 
                    question monthly survey sent to participating 
                    individuals's phone numbers on the 1st of each month. 
                    We are using this information to better distribute services 
                    equitably in our own communities. <br /> <br />Once you fill out 
                    this online form the questions will be sent to your phone number.
        </p>
      </div>
      <br/>
      <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>Provide an address of the nearest park in your area:</span>
        <Tooltip title="Nearest park location is a way
                     to maintain reporter anonymity and give nonprofit 
                     organizations location-specific information to 
                     help communities in-need."
                     open={tooltipOpen}
                     onClose={()=> setTooltipOpen(false)}
                     disableHoverListener
                     >
                        <IconButton color="inherit" onClick={handleToggle}>
                            <HelpIcon fontSize="small" className='custom-icon'/>
                        </IconButton>
                    </Tooltip>
        </div>
        <TextField
        margin="dense"
        size="small"
        className='text-field'
        fullWidth
        color="secondary"
        focused
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        placeholder=" Enter Address" 
        InputProps={{
          style: { color: 'white', backgroundColor: 'black' }  
        }}
      />
      </div>
      {/*
      <button variant="contained" onClick={autofillAddressAndZipcode} style = {{marginTop: '10px', marginBottom: '5px'}}>
        Autofill Address & Zipcode
      </button>
      */}
      <br/>
      <div>
        <span>Zipcode:</span>
        <TextField
        margin="dense"
        size="small"
        className='text-field'
        color="secondary"
        focused
        name="zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        required
        error={!isZipValid}
        helperText="Zip code must be 5 digits."
        inputProps={{ maxLength: 5, pattern: '[0-9]*' }}
        placeholder=" Enter zip code" 
        InputProps={{
          style: { color: 'white', backgroundColor: 'black' }  
        }}
      />
      </div>
      <br />
      <div>
        <span>What is your phone number?:</span>
        <TextField
        margin="dense"
        size="small"
        className='text-field'
        color="secondary"
        focused
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        error={!isPhoneValid}
        helperText={phoneErrorMessage}
        placeholder=" Enter phone number" 
        InputProps={{
          style: { color: 'white', backgroundColor: 'black' }  
        }}
      />
      </div>
      
      <br />

     
      <FormControlLabel
        control={<Checkbox checked={agreedToTerms} onChange={handleTermsChange} />}
        label={<span style={{fontSize: '15px'}}>I agree to the <a href='https://drive.google.com/file/d/1H38HhxQW_29faTN6PRfW0w8XkIPpuwDX/view' target='blank' rel="noopener noreferrer"> Terms of Service</a></span>}
        
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
      />

      

      <div className="submit-button">
        <Button color="inherit" variant="outlined" type="submit">Submit Request</Button>
      </div>
      {submitted && (
        <p className='confirmation-message'>
          You will receive a text message to start the overdose reporting survey. Thank you!
        </p>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  </div>
);
};

export default ReportingForm;
