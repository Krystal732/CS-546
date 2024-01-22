import {dbConnection, closeConnection} from './config/mongoConnection.js';
import attendees from './data/attendees.js';
import events from './data/events.js';

const db = await dbConnection();
await db.dropDatabase();

//creating events
let patrick = await events.create(
  "Patrick's Birthday Bash!","Come join us for my yearly birthday bash!",
  {streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, 
  "phill@stevens.edu",
  30,
  0,
  "11/01/2024",
  "2:00 PM",
  "9:00 PM",
  true
);
let patrickID = patrick._id.toString()

let CSclass = await events.create(
  "CS 546 Class Party",
  "Celebrating making it halfway through the class.",
  {"streetAddress":"1 Castle Point Ter","city":"Hoboken","state":"NJ","zip":"07030"},
  "organizer@stevens.edu",
  183,
  10.83,
  "11/03/2024",
  "10:00 PM",
  "11:00 PM",
  false
);
let CSclassID = CSclass._id.toString()


let bday = await events.create(
  "Krystals Birthday Party","krystals super duper fun birthday party", 
  {streetAddress: "2 Castle Point Terrace", city: "Bridgewater", state: "ny", zip: "07030      "},
  "khong1@stevens.edu", 
  1, 
  25.5000,
  "07/03/2024",
  "11:30 AM",
  "12:00 PM",
  true
  );
  let bdayID = bday._id.toString()

await attendees.createAttendee(
  bdayID, 
  "Krystal", 
  "Hong", 
  "khong1@stevens.edu")

// let list = await events.getAll()
// console.log(list)

// let getBday = await events.get(bdayID)
// console.log(getBday)

// let rem = await events.remove(bdayID)
// console.log(rem)

// list = await events.getAll()
// console.log(list)

// let updated = await events.update(
//   CSclassID,
//   "UPDATED CS 546 Class Party",
//   "Celebrating making it halfway through the class.",
//   {"streetAddress":"1 Castle Point Ter","city":"Hoboken","state":"NJ","zip":"07030"},
//   "organizer@stevens.edu",
//   2,
//   10.83,
//   "11/03/2023",
//   "10:00 PM",
//   "11:00 PM",
//   true
// )
// console.log(updated)

// let newUpdated = await events.get(CSclassID)
// console.log(newUpdated)


// list = await events.getAll()
// console.log(list)


// let x = await attendees.createAttendee(
//   patrickID, 
//   "patty", 
//   "hill", 
//   "phill123@gmail.com")
// console.log(x)
// let pattyID = patty._id.toString()



// try{
//   let lini = await attendees.createAttendee(
//     bdayID, 
//     "lini", 
//     "santana", 
//     "lsantana@yahoo.com")
//     console.log(lini)
// }catch(e){
//   console.log(e)
// }

// try{
//   let lini = await attendees.createAttendee(
//     bdayID, 
//     "lini", 
//     "santana", 
//     "khong1@stevens.edu")
//     console.log(lini)
// }catch(e){
//   console.log(e)
// }

// await attendees.createAttendee(
//   patrickID, 
//   "lini", 
//   "santana", 
//   "lsantana@yahoo.com")

// let allAttendees = await attendees.getAllAttendees(patrickID)
// console.log(allAttendees)

// let gotten = await attendees.getAttendee(pattyID)
// console.log(gotten)


// let removed = await attendees.removeAttendee(pattyID)
// console.log(removed)



await closeConnection();


