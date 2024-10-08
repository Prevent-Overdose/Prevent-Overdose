  import React, { useState } from 'react';
  import 'react-datepicker/dist/react-datepicker.css';
  import './NarcanForm.css';
  import { TextField } from '@mui/material/';
  import Button from '@mui/material/Button';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Checkbox from '@mui/material/Checkbox';


  
  const CancelShipmentsForm = () => {
    const [formData, setFormData] = useState({
      organizationName: '',
      state: '',
      county: '',
      address: '',
      phoneNumber: '',
      email: '',
      boxesOfNarcan: '',
      availability: [
        { date: null, startTime: null, endTime: null },
        { date: null, startTime: null, endTime: null },
        { date: null, startTime: null, endTime: null }
      ],
      fatalOverdoses: '',
      nonFatalOverdoses: '',
      reversedOverdoses: '',
      monthly_narcan: false
    });
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [pick, setPick] = useState('');
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

    /* if we want to format the phone number as (123) 456-7890 instead of 123-456-7890, we can uncomment the following function:

    const formatPhoneNumber = (value) => {
      if (!value) return value;
      
      // Remove all non-digit characters
      const phoneNumber = value.replace(/[^\d]/g, '');
      
      const phoneNumberLength = phoneNumber.length;
      
      if (phoneNumberLength < 4) {
          return phoneNumber;
      } else if (phoneNumberLength < 7) {
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      } else {
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
      }
  };

  */

    const handleTermsChange = (event) => {
      setAgreedToTerms(event.target.checked);
  };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'phoneNumber') {
        const formattedPhoneNumber = formatPhoneNumber(value);
        setFormData({ ...formData, [name]: formattedPhoneNumber });
      } else {
        const numericFields = ['boxesOfNarcan', 'fatalOverdoses', 'nonFatalOverdoses', 'reversedOverdoses'];
        if (numericFields.includes(name)) {
          const isValidNumber = /^([1-9][0-9]*|0)$/.test(value);
          if (value === '' || isValidNumber) {
            setFormData({ ...formData, [name]: value });
            setIsFormValid(isValidNumber);
          } else {
            setIsFormValid(false);
          }
        } else {
          setFormData({ ...formData, [name]: value });
        }
      }
    };

  


    const verifyNumber = async () => {
      try {
          const response = await fetch(`https://prevent-overdose-github-io.onrender.com/api/narcan/${formData.phoneNumber}`);
          const result = await response.json();
  
          if (result.exists) {
              toast.success("Phone number verified!");
          } else {
              toast.error("Failed to locate phone number!");
          }
      } catch (error) {
          toast.error("An error occurred while verifying the phone number.");
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!agreedToTerms){
      setError('Please agree to the Terms of Service')
      return
    }
    
    if(formData.availability.length < 1){
      setError('Please provide at least one date of availability.')
      return
    }
    

   if(!isFormValid){
      setError('Please enter valid numbers in the numeric fields.');
      return;
   }
    for (const avail of formData.availability) {
      if (avail.startTime && avail.endTime && avail.startTime >= avail.endTime) {
        setError('End time cannot be earlier than or the same as start time.');
        return;
      }
    }

    

    

    try {
      //




      // TBD -- check phone number exists and send the form data to the backend to update the availability of the organization

      // create new backend route to handle this form submissions



      //




      const response = await fetch("https://prevent-overdose-github-io.onrender.com/api/dummy", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        toast.error("Failed to update availability.");
        
      }
      else {
        toast.success("Successfully unsubscribed!")
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
        availability: [
          { date: null, startTime: null, endTime: null },
          { date: null, startTime: null, endTime: null },
          { date: null, startTime: null, endTime: null }
        ],
        fatalOverdoses: '',
        nonFatalOverdoses: '',
        reversedOverdoses: '',
        monthly_narcan: false

      });
      setError(null);
      setSubmitted(true);
      setPick('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="formcontainer" style={{ backgroundColor: '#171a1d', border: '3px solid #ccc' }}>
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <form className="create" onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: "0px"}}><strong style={{ fontSize: "50px", color: "red"}}>Cancel Narcan Shipments</strong></h1>
        <div >
          <p className='form-info'>
            This is a form to cancel your monthly shipments of Narcan. If you do not want to cancel your shipments, <strong> do not fill out this form</strong>.
          </p>
          <p className='form-info'>
              <strong> If you would like to update your current availability </strong> to receive monthly 
              deliveries, please visit the <a href="/update-availability" style={{ color: 'green' }}>Update Availability</a> page.
          </p>
        </div>
        <div>
          <p style={{ fontSize: "45px", marginBottom: "20px", marginTop: "40px"}}>Organizational Information</p>
  
        </div>
        
        <div>
          <span>Enter your registered phone number:</span>
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
          placeholder="Enter phone number" 
          InputProps={{
            style: { color: 'white', backgroundColor: 'black' }  
          }}
        />
        <Button 
        color="inherit" 
        variant="outlined" 
        onClick={verifyNumber}  // Call the custom function on click
        sx={{
          marginTop: '10px',
          marginLeft: '10px',
          '&:hover': {
            color: 'green', // Change text color on hover (optional)
            borderColor: 'green', // Change border color on hover (optional)
          },
        }}
      >
        Verify Number
      </Button>
       
        </div>

        <div>
          
       
        </div>
        
           <br/>

           <span>Cancel all monthly deliveries?</span>
                  

       
        <FormControlLabel
          control={<Checkbox checked={agreedToTerms} onChange={handleTermsChange} />}
          label={
            <span style={{ fontSize: '15px' }}>
              Yes, I'd like to cancel all current and future monthly Narcan deliveries.
            </span>
          }          
          sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
        />

        

        <div className="submit-button">
          <Button color="inherit" variant="outlined" type="submit">Submit Request</Button>
        </div>
        {submitted && (
          <p className='confirmation-message'>
            We will send a text message to confirm 
            your cancellation. Thank you!
          </p>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CancelShipmentsForm;
