const moment = require('moment')
const config = require("../config/static");
const momentTZ = require("moment-timezone");


const freeSlot = async(req,res) =>{
  try{
    // const reqTimezone = config.timezone;

    const {date,timezone,duration} = req.body
    const start = new Date(
        moment(date).hour(config.startTime.hour).minute(config.startTime.minute)
      ).toUTCString();
      const end = new Date(
          moment(date).hour(config.endTime.hour).minute(config.endTime.minute)
        ).toUTCString();

    let changedStart = momentTZ.tz(start, timezone);
    let changedEnd = momentTZ.tz(end, timezone);
  
    
            let slots = [momentTZ(changedStart)];
            while (momentTZ(changedStart) < momentTZ(changedEnd)) {
            changedStart = momentTZ(changedStart).add(duration, "minutes");
            slots.push(momentTZ(changedStart));
            }
            res.status(200).json(slots)
           
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: error.message });
            }
}
exports.freeSlot = freeSlot
  