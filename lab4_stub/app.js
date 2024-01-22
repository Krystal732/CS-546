/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/
import events from './events.js';
import {dbConnection, closeConnection} from './mongoConnection.js';

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let patrick = undefined
let krystal = undefined
let katie = undefined
let bob = undefined

// console.log("test")
//1 create event and 2 log it
// console.log("step 1 and 2")
try {
    patrick = await events.create(
      "CS 546 Class Party",
      "Celebrating making it halfway through the class.",
      {"streetAddress":"1 Castle Point Ter","city":"Hoboken","state":"NJ","zip":"07030"},
      "organizer@stevens.edu",
      183,
      10.83,
      "11/03/2023",
      "10:00PM",
      "11:00PM",
      false
    );
    console.log(patrick)
} catch (e) {
    console.log(e);
}

try {
  const updatedEvent = await events.get(
    patrick._id.toString(),
  );
  console.log(updatedEvent);
} catch (e) {
  console.log(e);
}
//3 create new event
// console.log("step 3")

try {
    krystal = await events.create("Krystals Birthday Party","krystals super duper fun birthday party", {streetAddress: "2 Castle Point Terrace", city: "Bridgewater", state: "ny", zip: "07030      "}, "khong1@stevens.edu", 9 , 25.5000,"07/03/2024","11:30Am","12:00PM",true);
} catch (e) {
    console.log(e);
}
//4query all events and log them
// console.log("step 4")

try{
    let allEvents = await events.getAll()
    console.log(allEvents)  
}catch(e){
    console.log(e)
}
//5 create 3rd event and 6 log it
// console.log("step 5 and 6")

try {
    katie = await events.create("Katies Birthday Party","       katies super duper fun birthday party",{streetAddress: "     3 Castle Point Terrace", city: "New York City ", state: "nY", zip: "    07030      "}, "khong1@stevens.edu       ", 1 , 1.1 ,"10/31/2023","11:45AM","12:15PM",false);
    console.log(katie)
} catch (e) {
    console.log(e);
}
//7 rename first event and 8 log it 
// console.log("step 7 and 8")

try {
    const updatedEvent = await events.rename(
      patrick._id.toString(),
      "Patricks Birthday Party",
    );
    console.log(updatedEvent);
  } catch (e) {
    console.log(e);
  }
//9 remove the second event
// console.log("step 9")

try {
    await events.remove(krystal._id.toString());
  } catch (e) {
    console.log(e);
  }
//10 query and log all events
// console.log("step 10")

try{
    let allEvents = await events.getAll()
    console.log(allEvents)
}catch(e){
    console.log(e)
}
//11 try to create event w bad input
// console.log("step 11")

try {
    await events.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07301"}, "phill@stevens.edu",10, 25.50,"10/13/2023","3:40am","12:20pM", true);
} catch (e) {
    console.log(e);
}
//12 try to remove an event that dne
// console.log("step 12")

try {
    await events.remove();
  } catch (e) {
    console.log(e);
  }
//13 try to rename event that dne
// console.log("step 13")

try {
    await events.rename(
      bob._id.toString(),
      "Bobs Birthday Party",
    );
  } catch (e) {
    console.log(e);
  }

//14 try to rename event with bad neweventname
// console.log("step 14")

try {
    await events.rename(
      patrick._id.toString(),
      "Patricks Birthday Party",
    );
  } catch (e) {
    console.log(e);
  }
//15 try to get an event by id that dne
// console.log("step 15")

try {
    await events.get('123');
  } catch (e) {
    console.log(e);
  }
  
  
await closeConnection();
console.log('Done!');
  