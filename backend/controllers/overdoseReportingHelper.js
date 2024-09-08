const odreporting_db = require('../models/overdoseReportingModel');

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

module.exports = {
    createOverdoseReport
};
