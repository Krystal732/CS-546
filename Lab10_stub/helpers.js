//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import validator from 'validator';
import {users} from './config/mongoCollections.js'

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
export const userValidation = async(  
    firstName,
    lastName,
    emailAddress,
    password,
    role) => {
    //firstName
    firstName = checkAndTrimString(firstName, "firstName")
    if(/[\s\d]/.test(firstName) || firstName.length < 2 || firstName.length > 25){ //has space or numbers or less than 2 or greater than 25
        throw `lastName, ${firstName}, must be valid`
    }
    //lastName
    lastName = checkAndTrimString(lastName, "lastName")
    if(/[\s\d]/.test(lastName) || lastName.length < 2 || lastName.length > 25){ //has space or numbers or less than 2 or greater than 25
        throw `lastName, ${lastName}, must be valid`
    }

    //emailAddress
    emailAddress = checkAndTrimString(emailAddress, "email").toLowerCase()
    if(!validator.isEmail(emailAddress)){
        throw `${emailAddress} is not a valid email`
    }
    let prefix = emailAddress.split("@")[0]
    if (!/^[a-zA-Z0-9._-]+$/.test(prefix)){
        throw `${emailAddress} is not a valid email`
    }
    const userCollection = await users()
    if(await userCollection.findOne({emailAddress: emailAddress})){
        throw `there is already a user with the email address ${emailAddress}`
    }
    
    //password
    password = checkAndTrimString(password, "password")
    if(/\s/.test(password) || password.length < 8){
        throw `password must be at least 8 chars`
    }
    if(!/[A-Z]/.test(password)){
        throw `password must have at least 1 uppercase`
    }
    if(!/\d/.test(password)){
        throw `password must have at least 1 nunmber`
    }
    if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)){
        throw `password must have at least 1 special character`
    }

    //role
    role = checkAndTrimString(role, "role").toLowerCase()
    if (role !== "admin" && role !== "user"){
        throw `role, ${role} must be either admin or user`
    }

    return {firstName: firstName,
    lastName: lastName,  
    emailAddress: emailAddress, 
    password: password,
    role: role}
}

export function loginValidation(emailAddress, password){
    //emailAddress
    emailAddress = checkAndTrimString(emailAddress, "email").toLowerCase()
    if(!validator.isEmail(emailAddress)){
        throw `${emailAddress} is not a valid email`
    }
    let prefix = emailAddress.split("@")[0]
    if (!/^[a-zA-Z0-9._-]+$/.test(prefix)){
        throw `${emailAddress} is not a valid email`
    }
    //password
    password = checkAndTrimString(password, "password")
    if(/\s/.test(password) || password.length < 8){
        throw `password must be at least 8 chars`
    }
    if(!/[A-Z]/.test(password)){
        throw `password must have at least 1 uppercase`
    }
    if(!/\d/.test(password)){
        throw `password must have at least 1 number`
    }
    if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)){
        throw `password must have at least 1 special character`
    }
    return [emailAddress, password]
}