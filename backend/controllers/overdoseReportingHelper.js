const odreporting_db = require('../models/overdoseReportingModel');
const org_db = require('../models/organizationModel');
const indv_db = require('../models/user_reportModel');

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

async function getOverdoseReports() {
    try {
        const reports = await odreporting_db.find();
        console.log('Overdose reports:', reports);
        return reports;
    } catch (error) {
        console.error('Error getting overdose reports:', error);
        throw error;
    }
}


module.exports = {
    createOverdoseReport,
    getOverdoseReports
};
