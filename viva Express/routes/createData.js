const express = require('express')

const router = express.Router()

const {postData} = require('../controller/storeData')


router.post('/data',postData)

module.exports = router;