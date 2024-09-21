const org_db = require('../models/organizationModel');
const narcanCollection = require('../models/narcanFulfillmentModel');
const reportsCollection = require('../models/overdoseReportingModel');

const mongoose = require('mongoose')   

async function getAllOrgs() {
    try {
        return await org_db.find();
    } catch (error) {
        console.error('Error retrieving documents:', error);
        throw error;
    }
}

async function getOrg(phoneNumber) {
    try {
        return await org_db.findOne({ phone_number: phoneNumber });
    } catch (error) {
        console.error('Error finding organization:', error);
        throw error;
    }
}

async function updateOrg(phoneNumber, updates) {
    try {
        await org_db.findOneAndUpdate({ phone_number: phoneNumber }, updates);
    } catch (error) {
        console.error('Error updating organization:', error);
        throw error;
    }
}


async function postReporter(address, phoneNumber, name, state, county, email) {
    try {
        const existingOrg = await org_db.findOne({ phone_number: phoneNumber })
        if (existingOrg) {
            return await org_db.findOneAndUpdate({ phone_number: phoneNumber }, {monthly_reporting: true });
        }
        return await org_db.create({organizationName: name, phone_number: phoneNumber, state, county, email, availability: null, monthly_reporting: true, monthly_narcan: false, address});
    } catch (error) {
        console.error('Error adding reporter:', error);
        throw error;
    }
}

async function mostRecentService(phoneNumber) {

    const mostRecentNarcan = await narcanCollection.findOne(
        { phone_number: phoneNumber },
        { sort: { Date: -1 } }
    );

    // Find the most recent entry in OD_REPORTS for the given phone number
    const mostRecentReport = await reportsCollection.findOne(
        { phone_number: phoneNumber },
        { sort: { Date: -1 } }
    );

    // Check which is more recent and return the corresponding EntryType
    if (mostRecentNarcan && mostRecentReport) {
        if (mostRecentNarcan.Date > mostRecentReport.Date) {
        return EntryType.NARCAN;
        } else {
        return EntryType.REPORTING;
        }
    } else if (mostRecentNarcan) {
        return EntryType.NARCAN;
    } else if (mostRecentReport) {
        return EntryType.REPORTING;
    } else {
        return null;  // No entries
    }
}


module.exports = {
    getAllOrgs,
    getOrg,
    updateOrg,
    postReporter,
    mostRecentService
};
