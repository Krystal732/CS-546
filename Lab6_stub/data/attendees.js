// This data file should export all functions using the ES6 standard as shown in the lecture code
import {checkId, checkAndTrimString, attendee_validation} from '../helpers.js'
import {events} from '../config/mongoCollections.js';
import validator from 'validator';
import {ObjectId} from 'mongodb';


const exportedMethods = {
    async createAttendee(eventId, firstName, lastName, emailAddress){
    //Implement Code here
    await attendee_validation(eventId, firstName, lastName, emailAddress)
  
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
    if (event === null) throw 'No event with that id';
  
    //add attendee
    let newAttendee = {_id: new ObjectId(), firstName: firstName.trim(), lastName: lastName.trim(), emailAddress: emailAddress.trim()}
    event.attendees.push(newAttendee)
    event.totalNumberOfAttendees += 1

    const updatedEvent = {
      attendees: event.attendees,
      totalNumberOfAttendees: event.totalNumberOfAttendees
    };
    const updatedInfo = await eventCollection.findOneAndUpdate(
      {_id: new ObjectId(eventId)},
      {$set: updatedEvent},
      {returnDocument: 'after'}
    );
    
    if (!updatedInfo) {
      throw 'could not update event successfully';
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
      
  },
  
  async getAllAttendees(eventId) {
    //Implement Code here
    eventId = checkId(eventId, "eventId")
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
    if (event === null) throw `No event with that id`;
    return event.attendees
  
  },
  
  async getAttendee(attendeeId){
    //Implement Code here
    attendeeId = checkId(attendeeId, "attendeeId")
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    let attendee = undefined
    // console.log(attendeeId)
    for (let event of eventList) {
      attendee = event.attendees.find((a) => a._id.equals(new ObjectId(attendeeId)));
      // console.log(attendee)
      if(attendee !== undefined){
        return attendee
      }

    }
    throw `No attendee with this attendeeId`
    

  
  },
  
  async removeAttendee(attendeeId){
    //Implement Code here
    attendeeId = checkId(attendeeId, "attendeeId")
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    for(let event of eventList){
      let attendeeIndex = event.attendees.findIndex((a) => a._id.equals(new ObjectId(attendeeId)))
      if(attendeeIndex !== -1) {
        event.attendees.splice(attendeeIndex, 1)
        event.totalNumberOfAttendees -= 1;
  
        // update event
        await eventCollection.updateOne(
          {_id: event._id},
          {$set: {attendees: event.attendees, totalNumberOfAttendees: event.totalNumberOfAttendees}}
        );
  
        return event;
      }
    }
  
  }
  
}
export default exportedMethods;

