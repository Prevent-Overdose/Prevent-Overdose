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

async function postReporter(address, phoneNumber, name, state, county, email) {
    try {
        const existingOrg = await org_db.findOne({ phone_number: phoneNumber })
        if (existingOrg) {
            return await org_db.findOneAndUpdate({ phone_number: phoneNumber }, {monthly_reporting: true });
        }
        return await org_db.create({organizationName: name, phone_number: phoneNumber, state, county, email, monthly_reporting: true, monthly_narcan: false, address})
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
