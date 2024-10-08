import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './NarcanForm.css';
import { TextField } from '@mui/material/';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip, IconButton } from '@mui/material/';
import HelpIcon from '@mui/icons-material/Help';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ReportingForm = () => {
  const [formData, setFormData] = useState({
    organizationName:'',
    state: '',
    email: '',
    county: '',
    address: '',
    zipcode: '',
    phoneNumber: '',
    orgRep: null
  });
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isZipValid, setIsZipValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [optIn, setOpt] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [pick, setPick] = useState('');
  const [choose,setChoose] = useState('')


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.MuiTooltip-popper') && tooltipOpen) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipOpen]);

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

  const handleTermsChange2 = (event) => {
    setOpt(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const formattedPhoneNumber = formatPhoneNumber(value);
      if (formattedPhoneNumber.length >= 12) {
        setIsPhoneValid(true);
      } else {
        setIsPhoneValid(false);
        setPhoneErrorMessage('Phone number must have 10 digits.');
      }
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else if (name === 'zipcode') {
      const isValidZipCode = /^\d{0,5}$/.test(value);
      setIsZipValid(value.length === 5);
      if (isValidZipCode) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleToggle = () => {
    setTooltipOpen((prev) => !prev);
  };

  const handlePick = (event)=>{
    setPick(event.target.value)
    setFormData({
      ...formData,
      orgRep: event.target.value === 'yes' ? true : false,
    });
    console.log(formData)
  }

  const handleChoose = (event)=>{
    setChoose(event.target.value)
  }
  

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
          },
          { enableHighAccuracy: true }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const getNearbyParks = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://prevent-overdose-github-io.onrender.com/api/places?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching nearby parks:', error);
      return null;
    }
  };

  const getAddressFromLatLng = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://prevent-overdose-github-io.onrender.com/api/geocode?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error('Error fetching address from your location:', error);
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

        if (address) {
          const parkAddress = address.formatted_address;
          const zipcodeComponent = address.address_components.find((component) =>
            component.types.includes('postal_code')
          );

          if (zipcodeComponent) {
            const zipcode = zipcodeComponent.long_name;

            setFormData({
              ...formData,
              address: parkAddress,
              zipcode: zipcode,
            });
          } else {
            console.error('Zipcode not found in the address components.');
            setError('Zipcode not found. Please enter manually.');
          }
        } else {
          console.error('Address not found for the park location.');
          setError('Address not found for the park location. Please enter address manually.');
        }
      } else {
        console.error('No parks found nearby.');
        setError('No parks found nearby. Please enter address manually.');
      }
    } catch (error) {
      console.error('Error getting user location or nearby parks:', error);
      setError('Error getting user location or nearby parks. Enable location or enter address manually.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!pick){
      setError('Please choose whether you\'re reporting as an individual or as representative of an organization.')
      return;
    }
    
    if(!optIn){
      setError('Please opt in to SMS')
      return
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service.');
      return;
    }

    if (!isPhoneValid || !isZipValid) {
      setError('Please enter valid inputs.');
      return;
    }

    const dataToSend = {
      ...formData,
      phoneNumber: formData.phoneNumber.replace(/[^\d]/g, ''),
    };

    try {
      
      
      const response = await fetch('https://prevent-overdose-github-io.onrender.com/api/sms/createReporter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        if (response.status === 400) {
          toast.error('Phone number already exists.');
          setIsPhoneValid(false);
          setPhoneErrorMessage('Phone number has already been added.');
        } else {
          toast.error('Failed to submit the form.');
        }
        setSubmitted(false);
        return;
      } else {
        toast.success('Successfully signed up for overdose reporting!');
      }
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setFormData({
        organizationName:'',
        state: '',
        email: '',
        county: '',
        address: '',
        zipcode: '',
        phoneNumber: '',
      });
      setAgreedToTerms(false);
      setOpt(false)
      setError(null);
      setSubmitted(true);
      setPick(null);
      setChoose(null);
    } catch (error) {
      setError(error.message);
      <div></div>
    }
  };

  return (
    <div className="formcontainer" style={{ backgroundColor: '#171a1d', border: '3px solid #ccc' }}>
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  
      <form className="create" onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: '0px' }}>
          <strong style={{ fontSize: '50px' }}>Overdose Reporting Survey</strong>
        </h1>
        <div>
          <p className="form-info">
            Our overdose reporting form is a three question monthly survey sent to participating individuals's phone numbers on the 1st of each month. We are using this information to better distribute services equitably in our own communities. <br /> <br />Once you fill out this online form the questions will be sent to your phone number.
          </p>
        </div>
        <br />
        <span>Are you filling out this survey while in your community?</span>
        <div>
            <FormControl  >
              <FormLabel id="radio-buttons"></FormLabel>
              <RadioGroup row aria-label="options" name="row-radio-buttons-group"
                value={choose} onChange={handleChoose} > 
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
        </div>
        <br />
        <div>
          {choose && <span>Are you a representative/employee reporting for an organization?</span>}
          {choose &&(
          <div>
            <FormControl  >
              <FormLabel id="radio-buttons"></FormLabel>
              <RadioGroup row aria-label="options" name="row-radio-buttons-group"
                value={pick} onChange={handlePick} > 
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
          )}
          {pick === 'yes' && (
            <div>
              <br />
              <span>What is your organization's name?</span>
              <TextField
                margin="dense"
                size="small"
                color="secondary"
                focused
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
                placeholder="ex. Prevent Overdose Inc." 
                InputProps={{
                  style: { color: 'white', backgroundColor: 'black' }  
                }}
              />
              <br />
              <br />
              <div>
                <span>What state is your organization located in?</span>
                <TextField
                  margin="dense"
                  size="small"
                  className='text-field'
                  color="secondary"
                  focused
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="ex. Florida" 
                  InputProps={{
                    style: { color: 'white', backgroundColor: 'black' }  
                  }}
                />
              </div>
              <br />
              <div>
                <span>What county is your organization located in?</span>
                <TextField
                  margin="dense"
                  size="small"
                  className='text-field'
                  color="secondary"
                  focused
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  required
                  placeholder="ex. Hillsborough" 
                  InputProps={{
                    style: { color: 'white', backgroundColor: 'black' }  
                  }}
                />
              </div>
              <br />
              <div>
                <span>Provide an email to contact the organization:</span>
                <TextField
                  margin="dense"
                  size="small"
                  className='text-field'
                  color="secondary"
                  focused
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ex. example@gmail.com" 
                  InputProps={{
                    style: { color: 'white', backgroundColor: 'black' }  
                  }}
                />
              </div>
              <br />
            </div>
          )}
        </div>
      {(pick === 'yes' || pick ==='no') && (
        <div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Provide an address of the nearest park in your area:</span>
              <Tooltip
                title="Nearest park location is a way to maintain reporter anonymity and give nonprofit organizations location-specific information to help communities in-need."
                open={tooltipOpen}
                onClose={() => setTooltipOpen(false)}
                disableHoverListener
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                {choose === 'yes' && <Button color="inherit" variant="outlined" onClick={autofillAddressAndZipcode} style={{ marginLeft: 10 }}>
                    Autofill
                  </Button>
                  }
                  <IconButton color="inherit" onClick={handleToggle}>
                    <HelpIcon fontSize="small" className="custom-icon" />
                  </IconButton>
                </div>
              </Tooltip>
            </div>
            <TextField
              margin="dense"
              size="small"
              className="text-field"
              fullWidth
              color="secondary"
              focused
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter Address"
              InputProps={{
                style: { color: 'white', backgroundColor: 'black' },
              }}
            />
          </div>
    
          <br />
          <div>
            <span>Zipcode:</span>
            <TextField
              margin="dense"
              size="small"
              className="text-field"
              color="secondary"
              focused
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
              error={!isZipValid}
              inputProps={{ maxLength: 5, pattern: '[0-9]*' }}
              placeholder="Enter zip code"
              InputProps={{
                style: { color: 'white', backgroundColor: 'black' },
              }}
            />
          </div>
          <br />
          <div>
            <span>What is your phone number?:</span>
            <TextField
              margin="dense"
              size="small"
              className="text-field"
              color="secondary"
              focused
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              error={!isPhoneValid}
              helperText={phoneErrorMessage}
              placeholder="Enter phone number"
              InputProps={{
                style: { color: 'white', backgroundColor: 'black' },
              }}
            />
          </div>
        <br />
  
        <FormControlLabel
          control={<Checkbox checked={optIn} onChange={handleTermsChange2} />}
          label={
            <span style={{ fontSize: '15px' }}>
              Opt in to SMS 
            </span>
          }      
          sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
        />     
        <br />
        <FormControlLabel
          control={<Checkbox checked={agreedToTerms} onChange={handleTermsChange} />}
          label={
            <span style={{ fontSize: '15px' }}>
              I agree to the <a 
                href="Electronic Accountability Agreement Requirements.pdf" 
                target="blank" 
                rel="noopener noreferrer" 
                style={{ color: '#9226f0' }}
              > 
                Terms of Service
              </a>
            </span>
          }      
          sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
        />
        </div>
        )}

        <div className="submit-button">
          <Button color="inherit" variant="outlined" type="submit">
            Submit Request
          </Button>
        </div>
        {submitted && (
          <p className="confirmation-message">
            You will receive a text message to start the overdose reporting survey. Thank you!
          </p>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}  
export default ReportingForm;
