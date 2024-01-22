//import mongo collections, bcrypt and implement the following data functions
import {users} from '../config/mongoCollections.js'
import bcrypt from 'bcryptjs';
import {loginValidation, userValidation} from '../helpers.js'



export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  let newUser = await userValidation(firstName,
    lastName,
    emailAddress,
    password,
    role)

  let saltRounds = 16

  const hash = await bcrypt.hash(password, saltRounds);
  newUser.password = hash
  
  const userCollection = await users()
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw `Could not register user`;
  }
  return {insertedUser: true}
};

export const loginUser = async (emailAddress, password) => {
  [emailAddress, password] = loginValidation(emailAddress, password)
  //find email
  const userCollection = await users()
  const user = await userCollection.findOne({emailAddress: emailAddress});
  if(user === null){
    throw `Either the email address or password is invalid`
  }

  //check hashed passowrd
  if(!(await bcrypt.compare( password, user.password))){
    throw `Either the email address or password is invalid`
  }
  return {firstName:user.firstName, lastName:user.lastName, emailAddress:user.emailAddress, role:user.role}
};
