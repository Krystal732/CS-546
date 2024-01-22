//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';
import validator from 'validator';
import validateDate from 'validate-date'
import {events} from './config/mongoCollections.js';


export function checkAndTrimString(s, varName) {
    if (typeof s !== "string") {
      throw `${varName || 'provided variable'} is not a string`;
    }
    s = s.trim()
    if(s.length === 0){
        throw `String must not be empty`
    }
    return s
}

  
export function checkIsNumber(val) {
    if (typeof val !== "number") {
        throw `${val || 'provided variable'} is not a number`;
    }

    if (isNaN(val)) {
        throw `${val || 'provided variable'} must be proper number`;
    }

    if(val === Infinity || val === -Infinity){
        throw `${val || 'provided variable'} must be proper number`;
    }
}
  
export function checkIsObject(obj){
    if (!obj){
        throw "Input is not supplied, is undefined, null, 0, false, '', or NaN";
    }
    if(Object.keys(obj).length === 0){
    throw `objects must have at least 1 element`
    }
    if (Array.isArray(obj)){
        throw 'Input must be an object, but an array was supplied';
    }
    //now that I made sure it's not an array, I can check to make sure it's an object using typeof
    if (typeof obj !== 'object'){
        throw 'Input must be an object!';
    } 
}


export function checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
}

export function create_validation(eventName,
    eventDescription,
    eventLocation,
    contactEmail,
    maxCapacity,
    priceOfAdmission,
    eventDate,
    startTime,
    endTime,
    publicEvent){

    //eventName 
    eventName = checkAndTrimString(eventName, "eventName")
    if(eventName.length < 5){
        throw `${eventName} must be at least 5 chars`
    }
    //eventDescription
    // console.log(eventName, eventDescription)
    eventDescription = checkAndTrimString(eventDescription, "eventDescription")
    if(eventDescription.length < 25){
        throw `${eventDescription} must be at least 25 chars`
    }
    //eventLocation
    checkIsObject(eventLocation)
    if(!eventLocation.hasOwnProperty("streetAddress") || !eventLocation.hasOwnProperty("city") || !eventLocation.hasOwnProperty("state") || !eventLocation.hasOwnProperty("zip")){
        throw `eventLocation must have proper methods`
    }
    eventLocation.streetAddress = checkAndTrimString(eventLocation.streetAddress, "street addy")
    eventLocation.city = checkAndTrimString(eventLocation.city, "city")
    eventLocation.state = checkAndTrimString(eventLocation.state, "state").toUpperCase()
    eventLocation.zip = checkAndTrimString(eventLocation.zip, "zip")

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
    contactEmail = checkAndTrimString(contactEmail, "email")
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
    eventDate = checkAndTrimString(eventDate, "date")
    if(validateDate(eventDate) === "Invalid Date" || eventDate.length !== 10){
        throw `${eventDate} must be a valid day in the format MM/DD/YYYY`
    }
    if(new Date(eventDate) < new Date()){ //check in future 
        throw `${eventDate} must be in the future`
    }
    //startTime
    startTime = checkAndTrimString(startTime, "start time")
    let validTime = /^(1[0-2]|[1-9]):[0-5][0-9] (AM|PM)$/
    if(!validTime.test(startTime)){
        throw `${startTime} must be in 12hr AM/PM format`
    }
    //endTime
    endTime = checkAndTrimString(endTime, "endtime")
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
    return {eventName,
        eventDescription,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent}

}

export async function  attendee_validation(eventId, firstName, lastName, emailAddress){
    //eventID
    eventId = checkId(eventId, "eventId")
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
    if (event === null) throw 'No event with that id';
  
    //firstName
    firstName = checkAndTrimString(firstName, "firstname")
  
    //lastName
    lastName = checkAndTrimString(lastName, "lastname")
  
    //emailAddress
    emailAddress = checkAndTrimString(emailAddress, "email")
    if(!validator.isEmail(emailAddress)){
        throw `${emailAddress} is not a valid email`
    }
    let prefix = emailAddress.split("@")[0]
    if (!/^[a-zA-Z0-9._-]+$/.test(prefix)){
        throw `${emailAddress} is not a valid email`
    }
    if(event.attendees.some((a) => a.emailAddress.toLowerCase() === emailAddress.toLowerCase())){
      throw `Attendee with email address ${emailAddress} already exists`
    }
  
    //check #of attendees
    if(event.totalNumberOfAttendees === event.maxCapacity){
      throw `Event is already full`
    }
    return {eventId, firstName, lastName, emailAddress}
}