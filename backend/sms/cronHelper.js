const { getAllOrgs, getAllIndivs } = require('../controllers/organizationHelper');
const { sendRefillForm, sendSurvey } = require('./smsHelper');

async function cronJob(userResponses) {
    const orgs = await getAllOrgs();
    const indivs = await getAllIndivs();
    const reporting_intro = `
Prevent Overdose - Thank you for signing up for your 4 question monthly narcan and reporting service!

`;

const reporting_intro2 = `
Prevent Overdose - Thank you for signing up for your 3 question monthly reporting service!

`;

const reporting_intro3 = `
Prevent Overdose - Thank you for signing up for your monthly narcan refillment service!

`;

const allQuestions = [
    'How many boxes of Narcan do you need this month?',
    'How many overdoses have you reversed with Narcan from ',
    'How many non-fatal overdoses that you are aware of occurred in your community from ',
    'How many fatal overdoses that you are aware of occurred in your community from '
];

const narcQuestion = [
    'How many boxes of Narcan do you need this month?'
];

const odQuestions = [
    '1. How many overdoses have you reversed with Narcan from ',
    '2. How many non-fatal overdoses that you are aware of occurred in your community from ',
    '3. How many fatal overdoses that you are aware of occurred in your community from '
];
    orgs.forEach((org) => {
        console.log(org.phone_number)
        if (org.monthly_narcan && org.monthly_reporting) {
            sendSurvey(userResponses, org.phone_number, 0, reporting_intro, true, allQuestions);
        } else if (org.monthly_reporting) {
            sendSurvey(userResponses, org.phone_number, 0, reporting_intro2, true, odQuestions);
        } else if (org.monthly_narcan) {
            sendSurvey(userResponses, org.phone_number, 0, reporting_intro3, true, narcQuestion);
        }
    });

    indivs.forEach((indiv) => {
        console.log(indiv.phoneNumber)
        if (indiv.monthly_reporting) {
            sendSurvey(userResponses, indiv.phoneNumber, 0, reporting_intro2, true, odQuestions);
        }
    });
}

module.exports = {
    cronJob
};
