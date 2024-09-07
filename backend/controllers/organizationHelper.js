const org_db = require('../models/organizationModel');

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

async function postReporter(zipcode, address, phoneNumber) {
    try {
        return await org_db.create({zip_code: zipcode, address, phone_number: phoneNumber, monthly_narcan: false, monthly_reporting: true});
    } catch (error) {
        console.error('Error adding reporter:', error);
        throw error;
    }
}

module.exports = {
    getAllOrgs,
    getOrg,
    updateOrg,
    postReporter
};
