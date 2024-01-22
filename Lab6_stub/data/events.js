// This data file should export all functions using the ES6 standard as shown in the lecture code
import {create_validation, checkAndTrimString} from '../helpers.js'
import {events} from '../config/mongoCollections.js'
import {ObjectId} from 'mongodb';


const exportedMethods = {
   async create(
    eventName,
    eventDescription,
    eventLocation,
    contactEmail,
    maxCapacity,
    priceOfAdmission,
    eventDate,
    startTime,
    endTime,
    publicEvent
  ) {
    // console.log(eventName, eventDescription)
      //Implement Code here
    //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation
    create_validation(eventName,
      eventDescription,
      eventLocation,
      contactEmail,
      maxCapacity,
      priceOfAdmission,
      eventDate,
      startTime,
      endTime,
      publicEvent)
    //creation time
    let newEvent = 
    {
        eventName: eventName.trim(),
        description: eventDescription.trim(),
        eventLocation: {streetAddress: eventLocation.streetAddress.trim(), city: eventLocation.city.trim(), state: eventLocation.state.trim(), zip:eventLocation.zip.trim()},
        contactEmail: contactEmail.trim(),
        maxCapacity: maxCapacity,
        priceOfAdmission: priceOfAdmission,
        eventDate: eventDate.trim(),
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        publicEvent: publicEvent, 
        attendees: [],
        totalNumberOfAttendees: 0 
    }
  
    const eventCollection = await events();
    const insertInfo = await eventCollection.insertOne(newEvent);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw `Could not add event`;
  
    const newId = insertInfo.insertedId.toString();
  
    const event = await this.get(newId);
    return event;
  },
  
  async getAll() {
    //Implement Code here
    const eventCollection = await events();
    const eventList = await eventCollection.find({}, {projection: {_id: 1, eventName: 1}}).toArray();
    for (const event of eventList) {
        event._id = event._id.toString();
      }
    return eventList;
  },
  
  async get(eventId) {
    //Implement Code here
    let id = checkAndTrimString(eventId, "eventId")
    if (!ObjectId.isValid(id)) throw `invalid object ID`;
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: new ObjectId(id)});
    if (event === null) throw `No event with that id`;
    event._id = event._id.toString();
    return event;
  },
  
  async remove(eventId) {
    //Implement Code here
    let id = checkAndTrimString(eventId, "eventID")
    if (!ObjectId.isValid(id)) throw `invalid object ID`;
    const eventCollection = await events();
    const deletionInfo = await eventCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });
    if (!deletionInfo) {
      throw `Could not delete event with id of ${id}`;
    }
    return {eventName: deletionInfo.eventName, deleted: true}
  },
  
  async update(
    eventId,
    eventName,
    eventDescription,
    eventLocation,
    contactEmail,
    maxCapacity,
    priceOfAdmission,
    eventDate,
    startTime,
    endTime,
    publicEvent
  ) {
  
    //Implement Code here
    let id = checkAndTrimString(eventId, "eventId")
    if (!ObjectId.isValid(id)) throw `invalid object ID`;
    create_validation(eventName,
      eventDescription,
      eventLocation,
      contactEmail,
      maxCapacity,
      priceOfAdmission,
      eventDate,
      startTime,
      endTime,
      publicEvent)
    //update
    const updatedEvent = {
      eventName: eventName.trim(),
      description: eventDescription.trim(),
      eventLocation: {streetAddress: eventLocation.streetAddress.trim(), city: eventLocation.city.trim(), state: eventLocation.state.trim(), zip:eventLocation.zip.trim()},
      contactEmail: contactEmail.trim(),
      maxCapacity: maxCapacity,
      priceOfAdmission: priceOfAdmission,
      eventDate: eventDate.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      publicEvent: publicEvent, 
    };
    const eventCollection = await events();
    const updatedInfo = await eventCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: updatedEvent},
      {returnDocument: 'after'}
    );
    
    if (!updatedInfo) {
      throw `could not update event successfully`;
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
  
  }
  
}
export default exportedMethods;
