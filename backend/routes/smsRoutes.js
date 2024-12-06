const express = require('express')
const bodyParser = require('body-parser');

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const {
    handleMessage,
    createReporter,
    sendWeeklyNarcanRequests
} = require('../sms/reporting')



//post a narcan request form
router.post('/message', handleMessage)

router.post('/createReporter', createReporter)

router.get('/sendWeeklyNarcanRequests', sendWeeklyNarcanRequests)



module.exports = router