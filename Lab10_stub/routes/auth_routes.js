//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import {loginValidation, userValidation} from '../helpers.js'
import {registerUser, loginUser} from '../data/users.js'

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('register')
    }catch(e){
      res.status(500).json({error: e});
    }

  })
  .post(async (req, res) => {
    //code here for POST
    let user = req.body
    // console.log(user)
    try{ //check req.body
      if(!user.firstNameInput || !user.lastNameInput || !user.emailAddressInput || !user.passwordInput || !user.confirmPasswordInput || !user.roleInput){
        throw `Missing parameters`
      }
      await userValidation(user.firstNameInput,
        user.lastNameInput,
        user.emailAddressInput,
        user.passwordInput,
        user.roleInput)
      if(user.passwordInput !== user.confirmPasswordInput){
        throw `Password Input and Confirm Password Input do not match`
      }
    }catch(e){
      // console.log("error:",e)
      return res.status(400).render('register', {error:e})
    }
    try{
      let complete = await registerUser(user.firstNameInput,
        user.lastNameInput,
        user.emailAddressInput,
        user.passwordInput,
        user.roleInput)
      if (complete){
        res.redirect('/login')
      }
      else{
        res.status(500).json({error: "Internal Server Error"})
      }
    }catch(e){
      res.status(400).render('register', {error:e})
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    // console.log("LOGGING IN")
    try{
      res.render('login')
    }catch(e){
      res.status(500).json({error: e});
    }

  })
  .post(async (req, res) => {
    //code here for POST
    let user = req.body
    // console.log("user:", user)
    try{
      if(!user.emailAddressInput || !user.passwordInput){
        throw `Missing parameters`
      }
      let [emailAddress, password] = loginValidation(user.emailAddressInput, user.passwordInput)
      // res.cookie("AuthState")
      req.session.user = await loginUser(emailAddress, password)
      if(req.session.user.role === "admin"){
        res.redirect('/admin')
      }
      if(req.session.user.role === "user"){
        res.redirect('/protected')
      }
    }catch(e){
      res.status(400).render('login', {error: e})
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  try{
    // console.log("PROTECTED:", req.session.user)
    res.render('protected', {firstName:req.session.user.firstName, lastName:req.session.user.lastName, currentTime:new Date().toUTCString(), role:req.session.user.role})
  }catch(e){
    res.status(500).json({error:e})
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  try{
    res.render('admin', {firstName:req.session.user.firstName, lastName:req.session.user.lastName, currentTime:new Date().toUTCString()})
  }catch(e){
    res.status(500).json({error:e})
  }
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  try{
    res.status(403).render('error')
  }catch(e){
    res.status(403).json({error:e})
  }
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  try{
    res.clearCookie('AuthState');
    // req.session('destroy')
    res.render('logout')
  }catch(e){
    res.status(500).json({error:e})
  }
});
export default router;
