import {events} from './mongoCollections.js';
import {ObjectId} from 'mongodb';
import validator from 'validator';
import validateDate from 'validate-date'
import {checkAndTrimString, checkIsNumber, checkIsObject} from "./helpers.js";

const exportedMethods = {
    async create(eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent){
        //eventName 
        eventName = checkAndTrimString(eventName)
        if(eventName.length < 5){
            throw `${eventName} must be at least 5 chars`
        }
        //eventDescription
        eventDescription = checkAndTrimString(eventDescription)
        if(eventDescription.length < 25){
            throw `${eventDescription} must be at least 25 chars`
        }
        //eventLocation
        checkIsObject(eventLocation)
        if(!eventLocation.hasOwnProperty("streetAddress") || !eventLocation.hasOwnProperty("city") || !eventLocation.hasOwnProperty("state") || !eventLocation.hasOwnProperty("zip")){
            throw `eventLocation must have proper methods`
        }
        eventLocation.streetAddress = checkAndTrimString(eventLocation.streetAddress)
        eventLocation.city = checkAndTrimString(eventLocation.city)
        eventLocation.state = checkAndTrimString(eventLocation.state).toUpperCase()
        eventLocation.zip = checkAndTrimString(eventLocation.zip)

        if(eventLocation.streetAddress.length < 3){
            throw `eventLocation.streetAddress must be at least 3 chars`
        }
        if(eventLocation.city.length < 3){
            throw `eventLocation.city must be at least 3 chars`
        }
        if(eventLocation.state.length !== 2){
            throw `eventLocation.state must be 2 chars`
        }
        if(eventLocation.zip.length !== 5 || !(/^[0-9]*$/.test(eventLocation.zip)) ){
            throw `eventLocation.zip must contain 5 numbers`
        }
        
        //contactEmail
        contactEmail = checkAndTrimString(contactEmail)
        if(!validator.isEmail(contactEmail)){
            throw `${contactEmail} is not a valid email`
        }
        let prefix = contactEmail.split("@")[0]
        if (!/^[a-zA-Z0-9._-]+$/.test(prefix)){
            throw `${contactEmail} is not a valid email`
        }
        //maxCapacity
        if(!validator.isInt(maxCapacity.toString())){
            throw `${maxCapacity} must be a whole number`
        }
        if(maxCapacity <= 0){
            throw `maxCapacity must be a positive number`
        }
        //priceofAdmission
        checkIsNumber(priceOfAdmission)
        if(!priceOfAdmission < 0 || !/^(0|\d+(\.\d{1,2})?)$/.test(priceOfAdmission)){
            throw `priceofAdmission must be a positive whole number, positve 2 decimal float, or 0`
        }

        //eventDate
        eventDate = checkAndTrimString(eventDate)
        if(validateDate(eventDate) === "Invalid Date" || eventDate.length !== 10){
            throw `${eventDate} must be a valid day in the format MM/DD/YYYY`
        }
        if(new Date(eventDate) < new Date()){ //check in future 
            throw `${eventDate} must be in the future`
        }
        //startTime
        startTime = checkAndTrimString(startTime).toUpperCase()
        let validTime = /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/
        if(!validTime.test(startTime)){
            throw `${startTime} must be in 12hr AM/PM format`
        }
        //endTime
        endTime = checkAndTrimString(endTime).toUpperCase()
        if(!validTime.test(endTime)){
            throw `${endTime} must be in 12hr AM/PM format`
        }
        let start = startTime[startTime.length-2]
        let end = endTime[endTime.length-2]
        let startH = parseInt(startTime.substring(0,2))
        let endH = parseInt(endTime.substring(0,2))
        let startM = parseInt(startTime.substring(3,5))
        let endM = parseInt(endTime.substring(3,5))
        //compare with todays time
        let today = new Date();
        let startHTemp = startH
        if(new Date(eventDate) === today ){
            if(start === "P") {
                if (startH < 12) {
                    startHTemp += 12; // Convert to 24-hour format
                }
            } else if (startHTemp === 12 && start === "A") {
                startHTemp = 0; // Midnight
            }
            if (!(startHTemp > today.getHours() || (startHTemp === today.getHours() && startM > today.getMinutes()))) {
                throw `event is today and must start later than current time`
            } 
            
        }
        

        if(start === "P" &&  end === "A"){ //start pm, end am
            throw `startTime: ${startTime} must be before endTime: ${endTime}`
        }
        else if(start === end){//start and end both am or pm
            if( startH > endH){ //start hours later than end hours
                throw `startTime: ${startTime} must be before endTime: ${endTime}`
            }
            else if( (startH === endH) && startM + 30 > endM){ //hours equal, check if end is 30min later
                throw `startTime: ${startTime} must be before endTime: ${endTime}`
            }
            else if((startH+1 === endH) && startM > 30 && (startM + 30)%60 > endM){ //1hr diff check 30 min later
                throw `startTime: ${startTime} must be before endTime: ${endTime}`
            }
        }
        else if(start === "A" && end === "P"){ //start am, end pm, check 30 min
            let mod = (startM + 30)%60
            if(startH === 11 && endH === 12 &&  mod > endM && startM > 30){ //check case of 11am and 12 pm 30 min diff
                throw `startTime: ${startTime} must be before endTime: ${endTime}`
            }
        }
        //publicEvent
        if(typeof publicEvent !== 'boolean'){
            throw `${publicEvent} must be boolean`
        }



        //creation time
        let newEvent = 
        {
            eventName: eventName,
            description: eventDescription,
            eventLocation: {streetAddress: eventLocation.streetAddress, city: eventLocation.city, state: eventLocation.state, zip:eventLocation.zip},
            contactEmail: contactEmail,
            maxCapacity: maxCapacity,
            priceOfAdmission: priceOfAdmission,
            eventDate: eventDate,
            startTime: startTime,
            endTime: endTime,
            publicEvent: publicEvent
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
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    for (const event of eventList) {
        event._id = event._id.toString();
      }
    return eventList;
  }, 
  async get(id) {
    id = checkAndTrimString(id)
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: new ObjectId(id)});
    if (event === null) throw 'No event with that id';
    event._id = event._id.toString();
    return event;
  },
  async remove(id) {
    id = checkAndTrimString(id)
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const eventCollection = await events();
    const deletionInfo = await eventCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });
    if (!deletionInfo) {
      throw `Could not delete event with id of ${id}`;
    }
    return {eventName: deletionInfo.eventName, deleted: true}
  },    
  async rename(id, newEventName){
    id = checkAndTrimString(id)
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    newEventName = checkAndTrimString(newEventName)
    if(newEventName.length < 5){
        throw `${newEventName} must be at least 5 chars`
    }
    //check if same name
    const eventCollection = await events();
    const existingEvent = await eventCollection.findOne(
        { _id: new ObjectId(id) }
    );

    if (!existingEvent) {
      throw 'Could not find the event';
    }
  
    if (existingEvent.eventName === newEventName) {
      throw 'New event name is the same as the current event name';
    }
  //update
    const updatedEvent = {
        eventName: newEventName,
      };
      const updatedInfo = await eventCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: updatedEvent},
        {returnDocument: 'after'}
      );
      
      if (!updatedInfo) {
        throw 'could not update event successfully';
      }
      updatedInfo._id = updatedInfo._id.toString();
      return updatedInfo;
    }

}
export default exportedMethods;
