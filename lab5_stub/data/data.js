/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/
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

function checkAndTrimString(s) {
    if (typeof s !== "string") {
      throw `${s|| 'provided variable'} is not a string`;
    }
    s = s.trim()
    if(s.length === 0){
        throw `String must not be empty`
    }
    return s
}

  

export const getBookById = async (id) => {
    let data = await getBooks()
    id = checkAndTrimString(id)
    //find matching id
    let match = data.find((e) => e["id"] === id)
    console.log(match)
    //if no match throw error
    if(typeof(match) === "undefined"){
        throw `Book not found`
    }
    return match
};

export const getAuthorById = async (id) => {
    let data = await getAuthors()
    id = checkAndTrimString(id)
    //find matching id
    let match = data.find((e) => e["id"] === id)
    //if no match throw error
    if(typeof(match) === "undefined"){
        throw `Author not found`
    }
    return match

};