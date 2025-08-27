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
        phoneNumber: '',
    });
    const [agreedToCancel, setAgreedToCancel] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            const formattedPhoneNumber = formatPhoneNumber(value);
            setFormData({ ...formData, [name]: formattedPhoneNumber });
        }
    };

    const verifyNumber = async () => {
        const unformattedPhoneNumber = formData.phoneNumber.replace(/[-() ]/g, '');
        try {
            const response = await fetch(`https://prevent-overdose-github-io.onrender.com/api/narcan/${unformattedPhoneNumber}`);
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

<<<<<<< Updated upstream
    

   if(!isFormValid){
      setError('Please enter valid numbers in the numeric fields.');
      return;
   }

   const formattedFormData = {
    phoneNumber: formData.phoneNumber.replace(/-/g, ''),
    };

=======
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreedToCancel) {
            setError("Please confirm cancellation of all shipments.");
            return;
        }

        try {
            const response = await fetch("https://prevent-overdose-github-io.onrender.com/api/narcan/cancelShipments", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber: formData.phoneNumber.replace(/[-() ]/g, '') })
            });

            if (response.ok) {
                toast.success("Successfully unsubscribed from all future shipments!");
                setFormData({ phoneNumber: '' });
                setAgreedToCancel(false);
                setSubmitted(true);
                setError(null);
            } else {
                const result = await response.json();
                toast.error(result.message || "Failed to cancel shipments.");
            }
        } catch (error) {
            setError("An error occurred: " + error.message);
        }
    };
>>>>>>> Stashed changes

    return (
        <div className="formcontainer" style={{ backgroundColor: '#171a1d', border: '3px solid #ccc' }}>
            <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <form className="create" onSubmit={handleSubmit}>
                <h1 style={{ marginBottom: "0px" }}><strong style={{ fontSize: "50px", color: "red" }}>Cancel Narcan Shipments</strong></h1>
                <div>
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
                        onClick={verifyNumber} 
                        sx={{
                            marginTop: '10px',
                            marginLeft: '10px',
                            '&:hover': {
                                color: 'green', 
                                borderColor: 'green', 
                            },
                        }}
                    >
                        Verify Number
                    </Button>
                </div>

                <br />
                <span>Cancel all monthly deliveries?</span>
                <FormControlLabel
                    control={<Checkbox checked={agreedToCancel} onChange={(e) => setAgreedToCancel(e.target.checked)} />}
                    label={
                        <span style={{ fontSize: '15px' }}>
                            Yes, I'd like to cancel all current and future monthly Narcan deliveries.
                        </span>
                    }          
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                />

<<<<<<< Updated upstream
      // TBD -- check phone number exists and send the form data to the backend to update the availability of the organization

      // create new backend route to handle this form submissions



      //




      const response = await fetch("https://prevent-overdose-github-io.onrender.com/api/dummy", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedFormData),
      });
      if (!response.ok) {
        toast.error("Failed to cancel shipments.");
        
      }
      else {
        toast.success("Successfully unsubscribed from Narcan shipments!!")
      }
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setFormData({
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
        <h1 style={{ marginBottom: "0px"}}><strong style={{ fontSize: "50px", color: "red"}}>Cancel Narcan Shipments</strong></h1>
        <div >
          <p className='form-info'>
            This is a form to cancel your monthly shipments of Narcan. If you do not want to cancel your shipments, <strong> do not fill out this form</strong>.
          </p>
          <p className='form-info'>
              <strong> If you would like to update your current availability </strong> to receive monthly 
              deliveries, please visit the <a href="/update-availability" style={{ color: 'green' }}>Update Availability</a> page.
          </p>
=======
                <div className="submit-button">
                    <Button color="inherit" variant="outlined" type="submit">Submit Request</Button>
                </div>
                {submitted && (
                    <p className='confirmation-message'>
                        We will send a text message to confirm your cancellation. Thank you!
                    </p>
                )}
                {error && <div className="error">{error}</div>}
            </form>
>>>>>>> Stashed changes
        </div>
    );
};

export default CancelShipmentsForm;
