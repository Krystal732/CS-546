// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
// import {loginValidation, userValidation} from '../../helpers.js'
let registerForm = document.getElementById('registration-form');
let loginForm = document.getElementById('login-form')

let firstNameInput = document.getElementById('firstNameInput')
let lastNameInput = document.getElementById('lastNameInput')
let emailAddressInput = document.getElementById('emailAddressInput')
let passwordInput = document.getElementById('passwordInput')
let confirmPasswordInput = document.getElementById('confirmPasswordInput')
let roleInput = document.getElementById('roleInput')
let error = document.getElementById('error');

function checkAndTrimString(s, varName) {
    if (typeof s !== "string") {
      throw `${varName || 'provided variable'} is not a string`;
    }
    s = s.trim()
    if(s.length === 0){
        throw `String must not be empty`
    }
    return s
}

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {

        try{
            // await userValidation(firstNameInput,
            //     lastNameInput,
            //     emailAddressInput,
            //     passwordInput,
            //     roleInput)
            //firstName
            let firstName = checkAndTrimString(firstNameInput.value, "firstName")
            if(/[\s\d]/.test(firstName) || firstName.length < 2 || firstName.length > 25){ //has space or numbers or less than 2 or greater than 25
                throw `lastName, ${firstName}, must be valid`
            }
            //lastName
            let lastName = checkAndTrimString(lastNameInput.value, "lastName")
            if(/[\s\d]/.test(lastName) || lastName.length < 2 || lastName.length > 25){ //has space or numbers or less than 2 or greater than 25
                throw `lastName, ${lastName}, must be valid`
            }

            //emailAddress
            let emailAddress = checkAndTrimString(emailAddressInput.value, "email").toLowerCase()
            //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
            if(!emailAddress.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )){
                throw `email, ${emailAddress}, must be valid`
              }


            //password
            let password = checkAndTrimString(passwordInput.value, "password")
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

            if(password !== confirmPasswordInput.value.trim()){
                throw `password Input and confirm password input do not match`
            }

            //role
            let role = checkAndTrimString(roleInput.value, "role").toLowerCase()
            if (role !== "admin" && role !== "user"){
                throw `role, ${role} must be either admin or user`
            }

            
            // registerForm.reset()

        }
        catch(e){
            console.log(e)
            event.preventDefault(); //check 
            error.hidden = false;

        }

    
    })
}
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        try{
            // console.log(emailAddressInput.value)

            //emailAddress
            let emailAddress = checkAndTrimString(emailAddressInput.value, "email").toLowerCase()
            //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
            if(!emailAddress.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )){
                throw `email, ${emailAddress}, must be valid`
              }

            //password
            let password = checkAndTrimString(passwordInput.value, "password")
            if(/\s/.test(password) || password.length < 8){
                throw `password must be at least 8 chars`
            }
            if(!/[A-Z]/.test(password)){
                throw `password must have at least 1 uppercase`
            }
            if(!/\d/.test(password)){
                throw `password, must have at least 1 number`
            }
            if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)){
                throw `password must have at least 1 special character`
            }
            // loginForm.reset()
        }catch(e){
            // console.log(e)
            event.preventDefault();

            error.hidden = false;

        }
    })
}