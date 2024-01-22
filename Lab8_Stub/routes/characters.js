//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import  {searchCharacterByName, searchCharacterById} from '../data/characters.js';


router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home', {title : "Marvel Character Finder"});
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  try {
    let charName = req.body.searchCharacterByName.trim()
    if(charName.length === 0){
      res.status(400).render('error', {title : "Error", status : "400", message : "Character name can not be empty"})
    }else{
      let characters = await searchCharacterByName(charName)
      res.render('characterSearchResults', {title : "Marvel Characters Found", name : charName, characters : characters.data.results});
    }
    
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  try{
    let character = await searchCharacterById(req.params.id)
    if(character.length === 2){
      res.status(404).render('error', {title : "Error", status : character[0], message : character[1]})
    }else{
      res.render('characterById', {title : character.data.results[0].name, name : character.data.results[0].name, image : character.data.results[0].thumbnail.path + "/portrait_uncanny.jpg", description : character.data.results[0].description, comics : character.data.results[0].comics.items})
    }
  }catch(e){
    res.status(500).json({error: e});
  }
});

//export router
export default router;
