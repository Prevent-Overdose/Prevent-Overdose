const odreporting_db = require('../models/overdoseReportingModel');
const narcan_fulfill_db = require('../models/narcanFulfillmentModel');


async function createOverdoseReport(phone_number, created, fatal, nonfatal, reversed, is_org) {
    try {
        const report = await odreporting_db.create({
            phone_number,
            created,
            fatal,
            nonfatal,
            reversed,
            is_org,
        });
        console.log('New overdose report created:', report);
    } catch (error) {
        console.error('Error creating overdose report:', error);
        throw error;
    }
}

async function createNarcanFulfillment(phone_number, date, narcan_requested) {
    try {
        const report = await narcan_fulfill_db.create({
            phone_number,
            date,
            narcan_requested
        });
        console.log('New Narcan request created:', report);
    } catch (error) {
        console.error('Error creating Narcan request:', error);
        throw error;
    }
}

module.exports = {
    createOverdoseReport, 
    createNarcanFulfillment
};
