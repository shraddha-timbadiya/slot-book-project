const moment = require('moment')
const momentTZ = require('moment-timezone')
const config = require('../config/static')
const db = require('../config/config')
const admin = require("firebase-admin");

const createEvent = async(req,res)=>{
  try {
    const { dateTime,duration } = req.body;
    
    const startTime = new Date(
      moment(dateTime).hour(config.startTime.hour).minute(config.startTime.minute)
    );
    const endTime = new Date(
      moment(dateTime).hour(config.endTime.hour).minute(config.endTime.minute)
    );

    if (new Date(dateTime) < new Date(startTime) || new Date(dateTime) >= new Date(endTime)) {
      res.status(422).json({
        message: "Cannot book an Event for given time and duration",
      });
    }
   else {
            const reqDateTime = momentTZ.utc(dateTime).toDate();
            const reqDuration = parseInt(duration);
         
            const data = {
              dateTime: admin.firestore.Timestamp.fromDate(reqDateTime),
              duration: reqDuration
            }
            // let eventsList = [];
            //   db.collection(config.collection)
            //     .where("dateTime", "==", data.dateTime)
            //     .get()
            //     .then((snapshot) => {
            //       snapshot.docs.forEach((doc) => {
            //         eventsList.push(doc.data());
            //       })
            //     });

            //     eventsList.map((event) => {
            //         event.dateTime = event.dateTime.toDate();
            //         event.dateTime = momentTZ
            //           .tz(event.dateTime, config.timezone)
            //           .format();
            //       })
            //       console.log(eventsList)

              const docRef = db.collection(config.collection).doc();
              await docRef.set(data);
              res.status(200).json({ message: "Event Created Successfully" });      
          }
        } 
      catch (error) {
          console.error(error);
          res.status(500).json({ message: error.message });
        }
        
}

exports.createEvent = createEvent
  