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
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
      setIsPhoneValid(value.length >= 12)
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
    if (!response.ok) {
      toast.error("Failed to submit the form.");
      
    }
    else {
      toast.success("Successfully requested Narcan!")
      console.log(response)
    }
    const result = await response.json();
    console.log('Form submitted successfully:', result);
    setFormData({
        address: '',
        zipcode: '',
        phoneNumber: '',
      });
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
                     help communities in-need.">
                        <IconButton color="inherit">
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
        helperText="Phone number must have 10 digits."
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
          We will send a text message to confirm 
          that your order has been received and 
          will update you with the progress of the order 
          through the phone number provided. 
        </p>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  </div>
);
};

export default ReportingForm;
