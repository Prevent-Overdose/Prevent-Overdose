// routes/odmapRoutes.js

const express = require('express');
const router = express.Router();
const { OverdoseReport, Organization, IndividualReport } = require('../models/odmapModel');

const addressToCoords = {
  '123 Main St': [27.9510, -82.4584],
  '456 Oak Ave': [27.9453, -82.4560],
  // Add more address mappings here
};

// Route: GET /api/odmap/:month
router.get('/:month', async (req, res) => {
  const { month } = req.params;
  const [year, monthNumber] = month.split('-').map(Number);

  const startDate = new Date(year, monthNumber - 1, 1);
  const endDate = new Date(year, monthNumber, 1);

  try {
    // Aggregate data for organizations (is_org: true)
    const orgData = await OverdoseReport.aggregate([
      { $match: { created: { $gte: startDate, $lt: endDate }, is_org: true } },
      {
        $lookup: {
          from: 'organizations',
          localField: 'phone_number',
          foreignField: 'phone_number',
          as: 'organization',
        },
      },
      { $unwind: '$organization' },
      {
        $group: {
          _id: '$organization.address',
          fatal: { $sum: '$fatal' },
          nonfatal: { $sum: '$nonfatal' },
          reversed: { $sum: '$reversed' },
        },
      },
    ]);

    // Aggregate data for individuals (is_org: false)
    const indivData = await OverdoseReport.aggregate([
      { $match: { created: { $gte: startDate, $lt: endDate }, is_org: false } },
      {
        $lookup: {
          from: 'individual_reports',
          localField: 'phone_number',
          foreignField: 'phoneNumber',
          as: 'individual',
        },
      },
      { $unwind: '$individual' },
      {
        $group: {
          _id: '$individual.address',
          fatal: { $sum: '$fatal' },
          nonfatal: { $sum: '$nonfatal' },
          reversed: { $sum: '$reversed' },
        },
      },
    ]);

    // Combine and map coordinates
    const combinedData = [...orgData, ...indivData].map((report) => {
      const address = report._id;
      const coordinates = addressToCoords[address] || [27.9506, -82.4572]; // Default to Tampa if address not found

      return {
        address,
        fatal: report.fatal,
        nonfatal: report.nonfatal,
        reversed: report.reversed,
        coordinates,
        type: orgData.includes(report) ? 'organization' : 'individual',
      };
    });

    res.json({ reports: combinedData });
  } catch (err) {
    console.error('Error fetching OD Map data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;