// import axios, md5
import axios from 'axios';
import md5 from 'blueimp-md5' //you will need to install this module;
const publickey = 'f72518dcbb3ffff41e5122d4b3831677';
const privatekey = 'aaa0cb0f48760aa44491fac5f8fdfb9285d0f948';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = 'ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

// https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE
// https://gateway.marvel.com:443/v1/public/characters/:id

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  try {
    let { data } = await axios.get(baseUrl + '?nameStartsWith=' + name +'&limit=15&'+ url)
    return data 
} catch (e) {
    if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
    else if (e.response)
      throw `Error: ${e.response.status}: ${e.response.statusText}`;
    else throw `Error: ${e}`;
  }
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  try {
    let { data } = await axios.get(baseUrl +"/" + id + '?' + url)
    // console.log(baseUrl +"/" + id + '?' + url)
    // console.log(data)
    return data 
  
} catch (e) {
    if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
    else if (e.response)
      return [e.response.status, e.response.statusText]
      // throw `Error: ${e.response.status}: ${e.response.statusText}`;
    else throw `Error: ${e}`;
  }
};
