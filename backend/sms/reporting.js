const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { parse } = require('date-fns');
const { postReporter, getOrg, updateOrg } = require('../database/organizationHelper');
const { createOverdoseReport } = require('../database/overdoseReportingHelper');
const { sendRefillForm, sendSurvey, questions, switchMessage1, switchMessage2, startMessage1, startMessage2, finishMessage, sendMessage, generateDateString} = require('./smsHelper');
const { cronJob } = require('./cronHelper');

const router = express.Router();
const userResponses = {};

const stop_commands = new Set([
    'STOP',
    'STOPALL',
    'UNSUBSCRIBE',
    'CANCEL',
    'END',
    'QUIT'
]);

const start_commands = new Set([
    'UNSTOP',
    'START'
]);

// Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Schedule cron job
cron.schedule('0 9 1 * *', () => {
    cronJob(userResponses);
});

// Endpoint to handle user responses
const handleMessage = async(req,res)=> {
    let { From: phoneNumber, Body: response } = req.body;
    console.log(req.body)
    phoneNumber = phoneNumber.slice(-10);

    const org = await getOrg(phoneNumber);
    if (org) {
        if (org.monthly_narcan) {
            if (stop_commands.has(response.toUpperCase())) {
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
            } else if (response.toUpperCase() === 'SWITCH') {
                sendMessage(switchMessage1, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true, last_service: "reporting" });
            }
        } else if (org.monthly_reporting) {
            console.log(response.toUpperCase())
            if (stop_commands.has(response.toUpperCase())) {
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
                delete userResponses[phoneNumber];
            } else if (response.toUpperCase() === 'SWITCH') {
                sendMessage(switchMessage2, phoneNumber);
                delete userResponses[phoneNumber];
                updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: false, last_service: "narcan" });
            }

            if (userResponses[phoneNumber]) {
                const { questionIndex } = userResponses[phoneNumber];
                const parsedResponse = parseInt(response);
                const isPositiveInteger = !isNaN(parsedResponse) && parsedResponse >= 0;

                if (!isPositiveInteger) {
                    sendSurvey(userResponses, phoneNumber, questionIndex, 'Please strictly enter a non-negative number. ');
                } else {
                    userResponses[phoneNumber].responses.push(parsedResponse);
                    const nextQuestionIndex = questionIndex + 1;

                    if (nextQuestionIndex < questions.length) {
                        sendSurvey(userResponses, phoneNumber, nextQuestionIndex);
                    } else {
                        sendMessage(finishMessage, phoneNumber);
                        createOverdoseReport(phoneNumber, Date.now(), userResponses[phoneNumber].responses[0], userResponses[phoneNumber].responses[1], userResponses[phoneNumber].responses[2]);
                        delete userResponses[phoneNumber];
                    }
                }
            }
        } else {
            if (start_commands.has(response.toUpperCase())) {
                if (org.last_service === "narcan") {
                    sendMessage(startMessage1, phoneNumber);
                    updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: false });
                }
                else 
                {
                    sendMessage(startMessage2, phoneNumber);
                    updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true });
                }
            } 
        }
    }
};


const createReporter = async(req,res)=>{
    const reporting_intro = `
Prevent Overdose - Thank you for signing up for your three question monthly overdose report!

`;
    const {zipcode, address, phoneNumber} = req.body

   
   try{
    
    const form = await postReporter(zipcode, address, phoneNumber)

    //format date

    sendSurvey(userResponses, phoneNumber, 0, reporting_intro, true);
    
    


    res.status(200).json({zipcode, address, phoneNumber, createdAt: Date.now()})

   } catch(error){
    res.status(400).json({error:error.message})
   }
}

// module.exports = router;
module.exports = {handleMessage, createReporter}
