//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
import axios from 'axios';

export async function getAuthors(){
    try {
        let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
        return data // this will be the array of author objects
    } catch (e) {
        if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
        else if (e.response)
          throw `Error: ${e.response.status}: ${e.response.statusText}`;
        else throw `Error: ${e}`;
      }
  }


  export function checkAndTrimString(s) {
    if (typeof s !== "string") {
      throw `${s|| 'provided variable'} is not a string`;
    }
    s = s.trim()
    if(s.length === 0){
        throw `String must not be empty`
    }
    return s
  }

  export async function getBooks(){
    try {
        let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
        return data // this will be the array of author objects
    } catch (e) {
        if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
        else if (e.response)
          throw `Error: ${e.response.status}: ${e.response.statusText}`;
        else throw `Error: ${e}`;
      }
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
  