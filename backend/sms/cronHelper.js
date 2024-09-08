const { getAllOrgs } = require('../controllers/organizationHelper');
const { sendRefillForm, sendSurvey } = require('./smsHelper');

async function cronJob(userResponses) {
    const orgs = await getAllOrgs();
    const reporting_intro = `
Prevent Overdose - Thank you for signing up for your three question monthly overdose report!

`;
    orgs.forEach((org) => {
        console.log(org.phone_number)
        if (org.monthly_narcan) {
            sendRefillForm(org.phone_number);
        } else if (org.monthly_reporting) {
            sendSurvey(userResponses, org.phone_number, 0, reporting_intro, true);
        }
    });
}

module.exports = {
    cronJob
};
