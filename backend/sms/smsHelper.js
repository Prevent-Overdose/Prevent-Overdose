const client = require('twilio')(process.env.TWILIO_SID, process.env.SMS_AUTH);

const refillMessage = `
Below is a secure link to refill bulk shipments of free Narcan: 
Please note that this link is valid for one-time use only. If you have any questions or need further assistance, feel free to contact our support team. 
If you wish to switch to only the monthly overdose reporting service, please reply with 'SWITCH'.
If you would like to stop receiving these messages, please reply with 'END'.
Stay safe,
Prevent Overdose Inc.
`;

const stopMessage = `
We have received your request to stop receiving monthly messages.
If you wish to join the monthly service, please reply with 'START'.
- Prevent Overdose Inc.
`;

const switchMessage2 = `
You have successfully switched to only the monthly overdose reporting service.

If you wish to subscribe only to the monthly Narcan refill service, please reply with 'SWITCH'.

If you wish to subscribe to both services, please reply with 'BOTH'.

If you would like to stop receiving these messages, please reply with 'STOP'.
- Prevent Overdose Inc.
                `;

const switchMessage1 = `
You have successfully switched to only the monthly Narcan refill service.

If you wish to subscribe only to the monthly overdose reporting service, please reply with 'SWITCH'.

If you wish to subscribe to both services, please reply with 'BOTH'.

If you would like to stop receiving these messages, please reply with 'STOP'.
- Prevent Overdose Inc.
                `;

const switchMessage3 = `
You have successfully subscribed to both the monthly Narcan refill and overdose reporting service.

If you wish to subscribe only to the monthly overdose reporting service, please reply with 'DROPNARCAN'.

If you wish to subscribe only to the monthly Narcan refill service, please reply with 'DROPREPORTING'.

If you would like to stop receiving these messages, please reply with 'STOP'.
- Prevent Overdose Inc.
                `;

const startMessage1 = `
You have successfully resubscribed to the monthly Narcan refill service.

If you wish to switch to only the monthly overdose reporting service, please reply with 'SWITCH'.
Stay safe,
Prevent Overdose Inc.
                `;

const startMessage2 = `
You have successfully resubscribed to the monthly overdose reporting service.

If you would like to stop receiving these messages, please reply with 'STOP'.
Stay safe,
Prevent Overdose Inc.
                `;

const bothFinishMessage = `
Thank you for completing your monthly survey!

If you would like to update your Narcan delivery availability, click here: https://preventod.com/update-availability

If you wish to subscribe only to the monthly overdose reporting service, please reply with 'DROPNARCAN'.

If you wish to subscribe only to the monthly Narcan refill service, please reply with 'DROPREPORTING'.

Type ‘STOP’ if you want to stop receiving these messages. 
`;

const indivFinishMessage = `
Thank you for completing your monthly overdose survey!

Reply with ‘STOP’ if you want to stop receiving these messages. 
                    `;

const finishMessage = `
Thank you for completing your monthly overdose survey!

Type ‘SWITCH’ if you wish to subscribe only to the monthly narcan refill service.

If you wish to subscribe to both services, please reply with 'BOTH'.

Type ‘STOP’ if you want to stop receiving these messages. 
                    `;

const finishMessage2 = `
Thank you for completing your monthly narcan survey!

If you would like to update your availability, click here: https://preventod.com/update-availability

Type ‘SWITCH’ if you wish to subscribe only to the monthly overdose reporting service.

If you wish to subscribe to both services, please reply with 'BOTH'.

Type ‘STOP’ if you want to stop receiving these messages. 
                    `;


const allQuestions = [
    '1. How many boxes of Narcan do you need this month?',
    '2. How many overdoses have you reversed with Narcan from ',
    '3. How many non-fatal overdoses that are you aware of occurred in your community from ',
    '4. How many fatal overdoses that are you aware of occurred in your community from '
];

const narcQuestion = [
    'How many boxes of Narcan do you need this month?'
];

const odQuestions = [
    '1. How many overdoses have you reversed with Narcan from ',
    '2. How many non-fatal overdoses that are you aware of occurred in your community from ',
    '3. How many fatal overdoses that are you aware of occurred in your community from '
];


function sendMessage(message, phoneNumber) {
    client.messages.create({ body: message, from: process.env.SMS_NUM, to: phoneNumber })
    .then(message => {
        console.log(`Message sent to ${phoneNumber}: ${message.sid}`);
    })
    .catch(error => console.error(`Error sending message to ${phoneNumber}:`, error));
}

function sendRefillForm(phoneNumber) {
    client.messages.create({
        body: refillMessage,
        from: process.env.SMS_NUM,
        to: phoneNumber
    })
    .then(message => {
        console.log(`Message sent to ${phoneNumber}: ${message.sid}`);
    })
    .catch(error => console.error(`Error sending message to ${phoneNumber}:`, error));
}

function sendSurvey(userResponses, phoneNumber, questionIndex, customMessage = '', start = false, questions) {
    const dateString = (questionIndex === 0 && questions.length === 4) ? '' : generateDateString(); //to check if its asking for narcan boxes

    client.messages.create({
        body: customMessage + questions[questionIndex] + dateString + "?",
        from: process.env.SMS_NUM,
        to: phoneNumber
    })
    .then(message => {
        console.log(`Survey question ${questionIndex + 1} sent to ${phoneNumber}: ${message.sid}`);
        if (start) {
            userResponses[phoneNumber] = { questionIndex: questionIndex, responses: [] };
        } else {
            userResponses[phoneNumber].questionIndex = questionIndex;
        }
    })
    .catch(error => console.error(`Error sending survey question ${questionIndex + 1} to ${phoneNumber}:`, error));
}

function generateDateString() {
    let currentDate = new Date();

  // Calculate the first day of the previous month
  let previousMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  let previousMonthFirstDayFormatted = `${previousMonthFirstDay.getMonth() + 1}/${previousMonthFirstDay.getDate()}/${previousMonthFirstDay.getFullYear()}`;

  // Calculate the last day of the previous month
  let previousMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  let previousMonthLastDayFormatted = `${previousMonthLastDay.getMonth() + 1}/${previousMonthLastDay.getDate()}/${previousMonthLastDay.getFullYear()}`;

  // Combine into the desired string format
  let dateString = `${previousMonthFirstDayFormatted} - ${previousMonthLastDayFormatted}`;
  
  return dateString;
}
  
  


module.exports = {
    sendRefillForm,
    sendSurvey,
    sendMessage,
    generateDateString,
    stopMessage,
    bothFinishMessage,
    switchMessage1,
    switchMessage2,
    switchMessage3,
    startMessage1,
    startMessage2,
    finishMessage,
    finishMessage2,
    indivFinishMessage,
    client
};
