//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import {getAuthors, checkAndTrimString,checkIsNumber} from "./helpers.js";
import{getBookById} from "./books.js"



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
export const searchAuthorByName = async (searchTerm) => {
    let data = await getAuthors()
    searchTerm = checkAndTrimString(searchTerm).toLowerCase()
    //filter for entries with searchterm in first or last name
    let matches = data.filter((e) => e["first_name"].toLowerCase().includes(searchTerm) || e["last_name"].toLowerCase().includes(searchTerm))
    if(matches.length === 0){
        throw `No author with ${searchTerm}`
    }
    let names = matches.map((obj) => obj["first_name"] + " " + obj["last_name"])
    //sort by last name
    return names.sort((a,b) =>{
        let aLast = a.split(" ")[1].toLowerCase();
        let bLast = b.split(" ")[1].toLowerCase();
        return aLast.localeCompare(bLast);
        }
    )
    
};




export const getBookNames = async (firstName, lastName) => {
    let data = await getAuthors()
    firstName = checkAndTrimString(firstName)
    lastName = checkAndTrimString(lastName)

    //find the author
    let match = data.find((e) => e["first_name"].toLowerCase() === firstName.toLowerCase() && e["last_name"].toLowerCase() === lastName.toLowerCase())
    //if no match throw error
    if(typeof(match) === "undefined"){
        throw `Author not found`
    }
    //if no books, error
    if(match["books"].length === 0 ){
        throw `Author has not written any books`
    }

    let bookNames = []
    for (let i = 0; i < match["books"].length; i++) {
        let b = await getBookById(match["books"][i]);
        bookNames.push(b["title"])
    }

    return bookNames.sort((a,b) =>{
        return a.toLowerCase().localeCompare(b.toLowerCase())
    })
};

export const youngestOldest = async () => {
    let data = await getAuthors()

    //store current youngest and oldest bdays
    let young = [-Infinity, -Infinity, -Infinity]
    let old = [Infinity, Infinity, Infinity]

    let result = {youngest:[], oldest:[]}

    data.map(author => {
        let bday = author["date_of_birth"].split("/")
        bday = bday.map(s => parseInt(s))
        //finding oldest
        if (bday[2] < old[2]){ //smaller year
            old = bday
            result["oldest"] = [author["first_name"] + " " + author["last_name"]]
        }
        else if (bday[2] === old[2]){ //same year
            if(bday[0] < old[0]){ //same year but smaller month
                old = bday
                result["oldest"] = [author["first_name"] + " " + author["last_name"]]
            }
            else if (bday[0] === old[0]){ //same year and same month
                if(bday[1] < old[1]){ //same year, same month, smaller day
                    old = bday
                    result["oldest"] = [author["first_name"] + " " + author["last_name"]]
                }
                else if(bday[1] === old[1]){ //same bday
                    result["oldest"].push(author["first_name"] + " " + author["last_name"])
                }
            }
            
        }


        //finding youngest
        else if (bday[2] > young[2]){ //larger year
            young = bday
            result["youngest"] = [author["first_name"] + " " + author["last_name"]]
        }
        else if (bday[2] === young[2]){ //same year
            if(bday[0] > young[0]){ //same year but larger month
                young = bday
                result["youngest"] = [author["first_name"] + " " + author["last_name"]]
            }
            else if (bday[0] === young[0]){ //same year and same month
                if(bday[1] > young[1]){ //same year, same month, larger day
                    young = bday
                    result["youngest"] = [author["first_name"] + " " + author["last_name"]]
                }
                else if(bday[1] === young[1]){ //same bday
                    result["youngest"].push(author["first_name"] + " " + author["last_name"])
                    console.log(author["date_of_birth"])
                }
            }
            
        }
    })
    // console.log(old)
    // console.log(young)

    if (result["youngest"].length === 1){
        result["youngest"] = result["youngest"][0]
    }
    if (result["oldest"].length === 1){
        result["oldest"] = result["oldest"][0]
    }

    return result
};


export const sameBirthday = async (month, day) => {
    let data = await getAuthors()
    checkIsNumber(month)
    checkIsNumber(day)
    
    if (month < 1 || month > 12){
        throw `month must be 1-12`
    }

    let thirty1 = [1,3,5,7,8,10,12]
    
    //if in a month w 31 days
    if (thirty1.includes(month)){
        if (day <= 0 || day > 31){
            throw `day must be 1-31`
        }
    }
    else if (month === 2){ //feburary
        if(day <= 0 || day > 28){
            throw `day must be 1-28`
        }
    }else{ //month with 30 days
        if(day <= 0 || day > 30){
            throw `day must be 1-30`
        }
    }

    let matches = data.filter((e) => {
        let bday = e["date_of_birth"]
        let m = bday.split("/")[0]
        let d = bday.split("/")[1]
        return (month === parseInt(m) && day === parseInt(d))
    })
    if(matches.length < 2){
        throw `No 2 authors with that birthday`
    }

    let names = matches.map((obj) => obj["first_name"] + " " + obj["last_name"])


    return names
};
