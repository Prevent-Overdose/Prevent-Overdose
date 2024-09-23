  import React, { useState } from 'react';
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import moment from 'moment';
  import './NarcanForm.css';
  import { TextField } from '@mui/material/';
  import Button from '@mui/material/Button';
  import AddIcon from '@mui/icons-material/Add';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Radio from '@mui/material/Radio';
  import RadioGroup from '@mui/material/RadioGroup';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import FormControl from '@mui/material/FormControl';
  import FormLabel from '@mui/material/FormLabel';
  import Checkbox from '@mui/material/Checkbox';
  import { Tooltip, IconButton } from '@mui/material/';
  import HelpIcon from '@mui/icons-material/Help';


  
  const NarcanForm = () => {
    const [formData, setFormData] = useState({
      organizationName: '',
      state: '',
      county: '',
      address: '',
      zipcode: '',
      phoneNumber: '',
      email: '',
      boxesOfNarcan: '',
      availability: [
        { date: null, startTime: null, endTime: null },
        
      ],
      
      monthly_narcan: false
    });
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [pick, setPick] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [choose,setChoose] = useState('')

  
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
      console.error('Error fetching address from latlng:', error);
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
              zipcode: null,
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

  const handleToggle = () => {
    setTooltipOpen((prev) => !prev);
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

  const handlePick = (event)=>{
    setPick(event.target.value)
    setFormData({...formData, monthly_narcan: event.target.value === "yes"})
  }

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

  
  const formatAvailabilityForBackend = (availability) => {
    return availability.map((avail) => ({
      ...avail,
      date: moment(avail.date).format('YYYY-MM-DD'),
      startTime: moment(avail.startTime).format('h:mm A'),
      endTime: moment(avail.endTime).format('h:mm A')
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!agreedToTerms){
      setError('Please agree to Terms of Service')
      return
    }
    
    if(formData.availability.length < 1){
      setError('Please provide at least 1 date of availability.')
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
    
    if(!pick){
      setError('Please select an option for monthly deliveries.')
      return
    }

    
    const formattedFormData = {...formData, 
      availability: formatAvailabilityForBackend(formData.availability)
    
    };
    
    const newRequest = {
      organizationName: formData.organizationName,
      state: formData.state,
      county: formData.county,
      email: formData.email,
      num_boxes: formData.boxesOfNarcan,
      monthly_narcan: formData.monthly_narcan,
      address: formData.address,
      phone_number: formData.phoneNumber.replace(/-/g, ''),
      availability: formData.availability
    }

        
    const dataToSend = {
      organizationName: formData.organizationName,
      state: formData.state,
      county: formData.county,
      email: formData.email,
      address: formData.address,
      zipcode: null,
      phoneNumber: formData.phoneNumber.replace(/-/g, ''),
      orgRep: true
    }
    

    try {
      const response = await fetch("https://prevent-overdose-github-io.onrender.com/api/narcan", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
      });
      if (!response.ok) {
        toast.error("Failed to submit the form.");
        
      }
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      toast.success("Successfully requested Narcan!")

      const reporting = await fetch('https://prevent-overdose-github-io.onrender.com/api/sms/createReporter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result2 = await reporting.json();
      console.log('Form submitted successfully:', result2);


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
         
        ],
        monthly_narcan: false

      });
      setError(null);
      setSubmitted(true);
      setPick('');
      setChoose(null)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="formcontainer" style={{ backgroundColor: '#171a1d', border: '3px solid #ccc' }}>
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <form className="create" onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: "0px"}}><strong style={{ fontSize: "50px"}}>Send a Narcan Request</strong></h1>
        <div >
          <p className='form-info'>
            This is a form to receive bulk shipments of free 
            Narcan, monthly. Our Narcan is supplied by state-specific government agencies. 
            Currently available in <strong>Allegheny county, PA;
            Hillsborough county, FL; 
            Pinellas county, FL; 
            Alachua county, FL. </strong>
            If not available in your area, 
            contact us through our website. 
          </p>
        </div>
        <div>
          <p style={{ fontSize: "45px", marginBottom: "20px", marginTop: "40px"}}>Organizational Information</p>
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
        </div>
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
        <br/>
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
        <p style={{ fontSize: "45px", marginBottom: "20px", marginTop: "40px"}}>Narcan Shipment Information</p> 
        <div>
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
          <span>Provide a phone number within your organization that can respond to monthly Narcan:</span>
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
        </div>
        <br />
        <div>
          <span>How many boxes of Narcan do you need?</span>
          
          <TextField
            margin="dense"
            size="small"
            type="number"
            name="boxesOfNarcan"
            color="secondary"
            focused
            value={formData.boxesOfNarcan}
            placeholder="Enter number"
            onChange={handleChange}
            min="0"
            required
            style={{ background: 'black' }}
            InputProps={{
              style: { color: 'white', backgroundColor: 'black' }  
            }}
          />
        </div>
        <br />
        <div>
          <label style={{fontSize: "25px"}}>What is your availability this month? (add at least three dates)</label>
          <br />
          
          {formData.availability.map((avail, index) => (
            <div key={index} className='availability-input'>
              <DatePicker
                selected={avail.date}
                onChange={(date) => handleDateChange(index, date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Date"
                required
                className='date-input'
              />
              <DatePicker
                selected={avail.startTime}
                onChange={(time) => handleTimeChange(index, time, 'startTime')}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="h:mm aa"
                placeholderText="Start Time"
                required
                className='date-input'
              />
              <DatePicker
                selected={avail.endTime}
                onChange={(time) => handleTimeChange(index, time, 'endTime')}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End Time"
                dateFormat="h:mm aa"
                placeholderText="End Time"
                required
                className='date-input'
              />
              
            </div>
          ))}
          <Button size="small" color="inherit"  variant="outlined" aria-label="add" onClick={addAvailability}>
            <AddIcon />
          </Button>
           </div>
           <br/>

           <span>Receive monthly deliveries?</span>
        <div>
        <FormControl >
          <FormLabel id="radio-buttons"></FormLabel>
          <RadioGroup row aria-label="options" name="row-radio-buttons-group"
           value={pick} onChange={handlePick}> 
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

        
        </FormControl>
        </div>
           
    
        
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

export default NarcanForm;
