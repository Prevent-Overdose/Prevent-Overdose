const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { parse } = require('date-fns');
const { postReporter, getOrg, updateOrg, mostRecentService, updateIndiv } = require('../controllers/organizationHelper');
const { createOverdoseReport, createNarcanFulfillment} = require('../controllers/overdoseReportingHelper');
const { sendRefillForm, sendSurvey, finishMessage2, bothFinishMessage, switchMessage1, switchMessage2, startMessage1, startMessage2, finishMessage, sendMessage, generateDateString, stopMessage, switchMessage3, indivFinishMessage} = require('./smsHelper');
const { cronJob } = require('./cronHelper');
const UserReport = require('../models/user_reportModel')
const Org = require('../models/organizationModel')
const Indiv = require('../models/user_reportModel')


const router = express.Router();
const userResponses = {};


const allQuestions = [
    'How many boxes of Narcan do you need this month',
    'How many fatal overdoses that you are aware of occurred in your community from ',
    'How many non-fatal overdoses that you are aware of occurred in your community from ',
    'How many overdoses have you reversed with Narcan from ',
];

const narcQuestion = [
    'How many boxes of Narcan do you need this month'
];

const odQuestions = [
    'How many fatal overdoses that you are aware of occurred in your community from ',
    'How many non-fatal overdoses that you are aware of occurred in your community from ',
    'How many overdoses have you reversed with Narcan from '
];

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
cron.schedule('0 9 6 * *', () => {
    cronJob(userResponses);
});

// Endpoint to handle user responses
const handleMessage = async(req,res)=> {
    let { From: phoneNumber, Body: response } = req.body;
    console.log(req.body)
    phoneNumber = phoneNumber.slice(-10);

    const org = await getOrg(phoneNumber);
    const indiv = await Indiv.findOne({phoneNumber})
    if (org || indiv) {
        if (org && org.monthly_narcan && org.monthly_reporting) {
            if (stop_commands.has(response.toUpperCase())) {
                // sendMessage(stopMessage, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else if (response.toUpperCase() === 'DROPREPORTING') {
                sendMessage(switchMessage2, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: false });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            }
            else if (response.toUpperCase() === 'DROPNARCAN') {
                sendMessage(switchMessage1, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else {
                if (userResponses[phoneNumber]) {
                    const { questionIndex } = userResponses[phoneNumber];
                    const parsedResponse = parseInt(response);
                    const isPositiveInteger = !isNaN(parsedResponse) && parsedResponse >= 0;
    
                    if (!isPositiveInteger) {
                        sendSurvey(userResponses, phoneNumber, questionIndex, 'Please strictly enter a non-negative number. ', false, allQuestions);
                    } else {
                        userResponses[phoneNumber].responses.push(parsedResponse);
                        const nextQuestionIndex = questionIndex + 1;
    
                        if (nextQuestionIndex < allQuestions.length) {
                            sendSurvey(userResponses, phoneNumber, nextQuestionIndex, '', false, allQuestions);
                        } else {
                            if (userResponses[phoneNumber].responses.length === 3) { //in the case of starter from website
                                createOverdoseReport(phoneNumber, Date.now(), userResponses[phoneNumber].responses[0], userResponses[phoneNumber].responses[1], userResponses[phoneNumber].responses[2], org != null);
                            } else { //regular monthly survey
                                console.log(userResponses[phoneNumber])
                                createOverdoseReport(phoneNumber, Date.now(), userResponses[phoneNumber].responses[1], userResponses[phoneNumber].responses[2], userResponses[phoneNumber].responses[3], org != null);
                                createNarcanFulfillment(phoneNumber, Date.now(),  userResponses[phoneNumber].responses[0]);
                            }
                            sendMessage(bothFinishMessage, phoneNumber);
                            delete userResponses[phoneNumber];

                        }
                    }
                }
            }
        }
        else if (org && org.monthly_narcan && !org.monthly_reporting) {
            if (stop_commands.has(response.toUpperCase())) {
                // sendMessage(stopMessage, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else if (response.toUpperCase() === 'SWITCH') {
                sendMessage(switchMessage2, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            }
            else if (response.toUpperCase() === 'BOTH') {
                sendMessage(switchMessage3, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: true });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else {
                if (userResponses[phoneNumber]) {
                    const { questionIndex } = userResponses[phoneNumber];
                    const parsedResponse = parseInt(response);
                    const isPositiveInteger = !isNaN(parsedResponse) && parsedResponse >= 0;
    
                    if (!isPositiveInteger) {
                        sendSurvey(userResponses, phoneNumber, questionIndex, 'Please strictly enter a non-negative number. ', false, narcQuestion);
                    } else {
                        userResponses[phoneNumber].responses.push(parsedResponse);
                        const nextQuestionIndex = questionIndex + 1;
    
                        if (nextQuestionIndex < narcQuestion.length) {
                            sendSurvey(userResponses, phoneNumber, nextQuestionIndex, '', false, narcQuestion);
                        } else {
                            sendMessage(finishMessage2, phoneNumber);
                            createNarcanFulfillment(phoneNumber, Date.now(),  userResponses[phoneNumber].responses[0]);
                            delete userResponses[phoneNumber];
                        }
                    }
                }
            }
        }
        else if (org && !org.monthly_narcan && org.monthly_reporting) {
            if (stop_commands.has(response.toUpperCase())) {
                // sendMessage(stopMessage, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: false });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else if (response.toUpperCase() === 'SWITCH') {
                sendMessage(switchMessage1, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: false });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            }
            else if (response.toUpperCase() === 'BOTH') {
                sendMessage(switchMessage3, phoneNumber);
                updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: true });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else {
                if (userResponses[phoneNumber]) {
                    const { questionIndex } = userResponses[phoneNumber];
                    const parsedResponse = parseInt(response);
                    const isPositiveInteger = !isNaN(parsedResponse) && parsedResponse >= 0;
    
                    if (!isPositiveInteger) {
                        sendSurvey(userResponses, phoneNumber, questionIndex, 'Please strictly enter a non-negative number. ', false, odQuestions);
                    } else {
                        userResponses[phoneNumber].responses.push(parsedResponse);
                        const nextQuestionIndex = questionIndex + 1;
    
                        if (nextQuestionIndex < odQuestions.length) {
                            sendSurvey(userResponses, phoneNumber, nextQuestionIndex, '', false, odQuestions);
                        } else {
                            sendMessage(finishMessage, phoneNumber);
                            createOverdoseReport(phoneNumber, Date.now(), userResponses[phoneNumber].responses[0], userResponses[phoneNumber].responses[1], userResponses[phoneNumber].responses[2], org != null);
                            delete userResponses[phoneNumber];
                        }
                    }
                }
            }
        }
        else if (indiv && indiv.monthly_reporting) {
            if (stop_commands.has(response.toUpperCase())) {
                // sendMessage(stopMessage, phoneNumber);
                updateOrg(phoneNumber, { monthly_reporting: false });
                userResponses[phoneNumber] && delete userResponses[phoneNumber];

            } else {
                if (userResponses[phoneNumber]) {
                    const { questionIndex } = userResponses[phoneNumber];
                    const parsedResponse = parseInt(response);
                    const isPositiveInteger = !isNaN(parsedResponse) && parsedResponse >= 0;
    
                    if (!isPositiveInteger) {
                        sendSurvey(userResponses, phoneNumber, questionIndex, 'Please strictly enter a non-negative number. ', false, odQuestions);
                    } else {
                        userResponses[phoneNumber].responses.push(parsedResponse);
                        const nextQuestionIndex = questionIndex + 1;
    
                        if (nextQuestionIndex < odQuestions.length) {
                            sendSurvey(userResponses, phoneNumber, nextQuestionIndex, '', false, odQuestions);
                        } else {
                            sendMessage(indivFinishMessage, phoneNumber);
                            createOverdoseReport(phoneNumber, Date.now(), userResponses[phoneNumber].responses[0], userResponses[phoneNumber].responses[1], userResponses[phoneNumber].responses[2], org != null);
                            delete userResponses[phoneNumber];
                        }
                    }
                }
            }
        }
        // this else should only hit if the org is currently subbed to neither
        else {
            console.log('is it in yet');
            if (start_commands.has(response.toUpperCase())) {
                if (indiv) {
                    sendMessage(startMessage2, phoneNumber);
                    updateIndiv(phoneNumber, { monthly_reporting: true });
                }
                else if(org) {
                    sendMessage(switchMessage3, phoneNumber);
                    updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: true });
                }
                
                // const last_service = await mostRecentService(phoneNumber);
                // if (last_service === EntryType.NARCAN) {
                //     sendMessage(startMessage1, phoneNumber);
                //     updateOrg(phoneNumber, { monthly_narcan: true, monthly_reporting: false });
                // }
                // else if (last_service === EntryType.REPORTING) { 
                //     sendMessage(startMessage2, phoneNumber);
                //     updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true });
                // }
                // // this else should never actually hit, since all orgs register with at least one report or narcan request
                // else {
                //     console.error('Error: Organization has no recent service');
                //     updateOrg(phoneNumber, { monthly_narcan: false, monthly_reporting: true });
                // }
            } 
        }
    }
};


const createReporter = async(req,res)=>{
    const reporting_intro = `
Prevent Overdose - Thank you for signing up for your monthly overdose and narcan service!

`;
    const {zipcode, address, phoneNumber, orgRep, name, state, county, email} = req.body

   
   try{
    
    let data = null

    if (orgRep) {
        if (zipcode != null) {
            data = await postReporter(address, phoneNumber, name, state, county, email)
            sendSurvey(userResponses, phoneNumber, 0, reporting_intro, true, odQuestions);
        }
        else {
            sendSurvey(userResponses, phoneNumber, 1, reporting_intro, true, allQuestions);
        }
    }
    else {
        data = await UserReport.create({zipcode, address, phoneNumber, monthly_reporting: true}) 
        sendSurvey(userResponses, phoneNumber, 0, reporting_intro, true, odQuestions);       
    }
    
    


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
