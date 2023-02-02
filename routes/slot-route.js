const express = require('express')
const router = express.Router();
const createEvent= require('../controllers/createEvent')
const freeSlots = require('../controllers/freeSlots')
const getEvents = require('../controllers/getEvents')

router.post('/create-event',createEvent.createEvent)
router.post('/free-slot',freeSlots.freeSlot)
router.post('/get-event',getEvents.getEvents)

module.exports = router