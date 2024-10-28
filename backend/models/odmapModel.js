// models/odmapModel.js

const OverdoseReport = require('./overdoseReportingModel');
const Organization = require('./organizationModel');
const IndividualReport = require('./user_reportModel');

module.exports = {
  OverdoseReport,
  Organization,
  IndividualReport
};
