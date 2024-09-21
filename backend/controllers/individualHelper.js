const indv_db = require('../models/user_reportModel');

async function getIndv(phoneNumber) {
    try {
        return await org_db.findOne({ phone_number: phoneNumber });
    } catch (error) {
        console.error('Error finding organization:', error);
        throw error;
    }
}

module.exports = {
    getIndv
};
