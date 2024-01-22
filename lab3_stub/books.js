//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import {getAuthors, checkAndTrimString, getBooks, checkIsNumber} from "./helpers.js";
import {getAuthorById} from "./authors.js"

export const getBookById = async (id) => {
    let data = await getBooks()
    id = checkAndTrimString(id)
    //find matching id
    let match = data.find((e) => e["id"] === id)
    //if no match throw error
    if(typeof(match) === "undefined"){
        throw `Book not found`
    }
    return match
};

export const getAuthorName = async (bookId) => {
    bookId = checkAndTrimString(bookId)

    let book = await getBookById(bookId)
    let author = await getAuthorById(book["authorId"])

    return author["first_name"] + " " + author["last_name"]
 };

export const sameGenre = async (genre) => {
    let data = await getBooks()
    genre = checkAndTrimString(genre)

    let matches = data.filter((e) => e["genres"].includes(genre))
    if(matches.length === 0){
        throw `No books with the genre ${genre}`
    }

    return matches
};

export const priceRange = async (min, max) => {
    let data = await getBooks()

    checkIsNumber(min)
    checkIsNumber(max)

    if(min < 0){
        throw `min must be positive number`
    }
    if(max < min){
        throw `max must be greater than min`
    }

    let matches = data.filter((e) => e["price"] >= min && e["price"] <= max)
    if(matches.length === 0){
        throw `No books within that price range`
    }
    return matches
};



export const getAllBooksWithAuthorName = async () => {
    let data = await getBooks();

    for (let i = 0; i < data.length; i++) {
        const authorName = await getAuthorName(data[i]["id"]);
        data[i]["author"] = authorName;
        delete data[i]["authorId"];
        // console.log(data[i]);
    }
    return data;
};
