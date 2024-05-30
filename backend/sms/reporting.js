const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const client = require('twilio')(process.env.TWILIO_SID, process.env.SMS_AUTH);

const router = express.Router();
// const client = twilio(process.env.TWILIO_SID, process.env.SMS_AUTH);

// Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Define the survey questions
const questions = [
    'How many fatal overdoses have you seen in the past month?',
    'How many non-fatal overdoses have you seen in the past month?',
    'How many overdoses have you reversed with our Narcan in the past month?'
];

// Object to store user responses
const userResponses = {};

cron.schedule('11 11 * * *', () => {
    // Retrieve phone numbers from a database or another source
    const phoneNumbers = ['+18504591972'];

    const intro = 'Hello from Prevent Overdose Inc. Thank you for joining our monthly overdose reporting survey. Your participation helps us make a difference. Please respond to the following three questions with positive numbers only: ';

    phoneNumbers.forEach((phoneNumber) => {
        sendSurvey(phoneNumber, 0, intro, true);
    });
});

// Function to send the survey
function sendSurvey(phoneNumber, questionIndex, customMessage = '', start = false) {
    client.messages.create({
        body: customMessage+questions[questionIndex],
        from: process.env.SMS_NUM,
        to: phoneNumber
    })
    .then(message => {
        console.log(`Survey question ${questionIndex + 1} sent to ${phoneNumber}: ${message.sid} | ${phoneNumber} ${process.env.SMS_NUM}`);
        // Store the phone number and current question index for handling responses
        if (start){
            userResponses[phoneNumber] = { questionIndex: 0, responses: [] };
        }
        else{
            userResponses[phoneNumber] = { questionIndex }; 
        }

    })
    .catch(error => console.error(`Error sending survey question ${questionIndex + 1} to ${phoneNumber}:`, error));
}

// Endpoint to handle user responses
router.post('/sms', (req, res) => {
    const { From: phoneNumber, Body: response } = req.body;

    // userResponses['+18504591972'].questionIndex = 0;

    if (true) { //userResponses[phoneNumber]
        //const { questionIndex } = userResponses[phoneNumber];

        // Check if the response is a number
        const parsedResponse = parseInt(response);
        const isPositiveInteger = !isNaN(parsedResponse) && parsedResponse > 0;
        if (response === 'END'){
            console.log('User terminated monthly surveys.');
        }
        else if (!isPositiveInteger) {
            // If the response is not a number, resend the current question
            //sendSurvey(phoneNumber, questionIndex, 'Please enter a positive number. ');
        } else {
            // Store the response
            userResponses[phoneNumber].responses.push(response);

            // If there is another question to send, send it
            const nextQuestionIndex = questionIndex + 1;
            if (nextQuestionIndex < questions.length) {
                //sendSurvey(phoneNumber, nextQuestionIndex);
            } else {
                // If all questions have been answered, process the responses
                console.log('All questions answered by', phoneNumber);
                console.log('Responses:', userResponses[phoneNumber]);
                // Clear the user's responses
                delete userResponses[phoneNumber];
            }
        }
    }

    res.sendStatus(200);
});


module.exports = router