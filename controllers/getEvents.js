const momentTZ = require("moment-timezone");
const config = require("../config/static");
const db = require('../config/config')


const getEvents = async (req,res) => {
  const {startDate,endDate} = req.body
  reqStart = new Date(momentTZ(startDate).hour(0).minute(0).second(0));
  reqEnd = new Date(momentTZ(endDate).hour(23).minute(59).second(59));

  let eventsList = [];
  db.collection(config.collection)
    .where("dateTime", ">", reqStart)
    .where("dateTime", "<", reqEnd)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        eventsList.push(doc.data());
      });

      eventsList.map((event) => {
        event.dateTime = event.dateTime.toDate();
        event.dateTime = momentTZ
          .tz(event.dateTime, config.timezone)
          .format();
      });

      res.status(200).json(eventsList);
    });
} 

exports.getEvents = getEvents