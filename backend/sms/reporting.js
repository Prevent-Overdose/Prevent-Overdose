const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { parse } = require('date-fns');
const { postReporter, getOrg, updateOrg } = require('../controllers/organizationHelper');
const { createOverdoseReport } = require('../controllers/overdoseReportingHelper');
const { sendRefillForm, sendSurvey, questions, switchMessage1, switchMessage2, startMessage1, startMessage2, finishMessage, sendMessage, generateDateString} = require('./smsHelper');
const { cronJob } = require('./cronHelper');
const UserReport = require('../models/user_reportModel')
const Org = require('../models/organizationModel')
const Indiv = require('../models/user_reportModel')


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
    const indiv = await Indiv.findOne({phone_number: phoneNumber})
    if (org || indiv) {
        if (org && org.monthly_narcan) {
            if (stop_commands.has(response.toUpperCase())) {
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
            } else if (response.toUpperCase() === 'SWITCH') {
                sendMessage(switchMessage1, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true, last_service: "reporting" });
            }
        } else if (indiv || org.monthly_reporting) {
            console.log(response.toUpperCase())
            if (stop_commands.has(response.toUpperCase())) {
                if (org) {
                    updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
                } 
                else {
                    await indiv.findOneAndUpdate({ phone_number: phoneNumber }, {monthly_reporting: false});
                }
                delete userResponses[phoneNumber];
            } else if (response.toUpperCase() === 'SWITCH' && org) {
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
                        createOverdoseReport(phoneNumber, Date.now(), userResponses[phoneNumber].responses[0], userResponses[phoneNumber].responses[1], userResponses[phoneNumber].responses[2], org != null);
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
    const {zipcode, address, phoneNumber, orgRep, name, state, county, email} = req.body

   
   try{
    
    let data = null

    if (orgRep) {
        data = await postReporter(address, phoneNumber, name, state, county, email)
    }
    else {
        data = await UserReport.create({zipcode, address, phoneNumber, monthly_reporting: true})        
    }

    sendSurvey(userResponses, phoneNumber, 0, reporting_intro, true);
    
    


    res.status(200).json(data)

   } catch(error){
    if (error.code === 11000 && error.keyPattern.phone_number) {
        // Duplicate key error (phoneNumber already exists)
        return res.status(400).json({ error: 'Phone number already exists.' });
      }
      return res.status(500).json({ error: 'Failed to add phone number.' });
   }
}

// module.exports = router;
module.exports = {handleMessage, createReporter}
