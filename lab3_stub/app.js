/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import * as authors from "./authors.js";
import * as books from "./books.js";


// //getAuthorById(id)
try{
    const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c");
    console.log (authorData);
}catch(e){
    console.log (e);
}
    // Returns:
// {
//     id: '1871e6d7-551f-41cb-9a07-08240b86c95c',
//     first_name: 'Derward',
//     last_name: 'Ticic',
//     date_of_birth: '6/3/1932',
//     HometownCity: 'Garden Grove',
//     HometownState: 'CA',
//     books: ['4efdb199-5a0f-4410-bded-ce07990c6aa4']
//     }
try{
    const authorData = await authors.getAuthorById(-1); //throw error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getAuthorById("1871e6d7-551f9a07-08240b86c95c"); //authnor not found
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getAuthorById(); //err
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorData = await authors.getAuthorById(""); //err
    console.log (authorData);
}catch(e){
    console.log (e);
}


// //searchAuthorByName(searchTerm)
try{
    const authorData = await authors.searchAuthorByName("TOM"); //["Tommi Banasevich","Tommy Klemenz", "Loree Tomasutti", "Rianon Tomkins"]
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.searchAuthorByName("poobar"); //error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.searchAuthorByName("  "); //error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.searchAuthorByName(); //error
    console.log (authorData);
}catch(e){
    console.log (e);
}


//getBookNames(firstName, lastName )
try{
    const authorData = await authors.getBookNames("Prisca         ", "VakhonIN"); //["Good Thief, The", "Point, The"]
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getBookNames("i",123); // Throws Error 
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getBookNames(" ", " "); // Throws Error
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorData = await authors.getBookNames("Patrick", "Hill"); // Throws Error because there is no author Patrick Hill in authors.json
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorData =await authors.getBookNames("Perrine", "Greenough"); // Throws Error because while the author can be found, they have written no books
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData =await authors.getBookNames(); // Throws Error
    console.log (authorData);
}catch(e){
    console.log (e);
}




//youngestOldest()
try{
    const authorData =await authors.youngestOldest(); 
    console.log (authorData);
}catch(e){
    console.log (e);
}






//sameBirthday(month, day)
try{
    const authorData =await authors.sameBirthday(10,12); // Returns: ["Pancho Barradell", "Lauree Henriquet"]
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData =await authors.sameBirthday(9,31); // error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData =await authors.sameBirthday(13,31); // error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData =await authors.sameBirthday(2,30); // error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData =await authors.sameBirthday(9,31); // error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData =await authors.sameBirthday("9"); // error
    console.log (authorData);
}catch(e){
    console.log (e);
}










//getBookById(id)
try{
    const authorData = await books.getBookById("         99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"); 
    console.log (authorData);
}catch(e){
    console.log (e);
}
// // {   
// //     id: '99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e',   
// //     title: 'No habrá paz para los malvados',   
// //     genres: ['Art', 'Travel'],   
// //     publicationDate: '5/7/2018',   
// //     publisher: 'Avamm',   
// //     summary:   'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',   
// //     isbn: '520476104-7',   
// //     language: 'Finnish',   
// //     pageCount: 693,   
// //     price: 25.66,   
// //     format: ['E-Book', 'Hardcover', 'Paperback'],   
// //     authorId: 'f645d28a-670a-457a-b55f-a32876b8511d' 

// // }
try{
    const authorData = await books.getBookById("pooedb9e");  //ERR
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.getBookById("  ");  //ERR
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.getBookById(0);  //ERR
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.getBookById();  //ERR
    console.log (authorData);
}catch(e){
    console.log (e);
}


//getAuthorName(bookId)
try{
    const authorData = await books.getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e         "); //"Brooke Adcock"
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.getAuthorName(-1); // Throws Error 
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.getAuthorName('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Book not found Error
    console.log (authorData);
}catch(e){
    console.log (e);
}


//sameGenre(genre)
try{
    const authorData = await books.sameGenre("Memoir         ");
    console.log (authorData);
}catch(e){
    console.log (e);
}
// [   
// //     {     
// //       id: '4c96d4d1-07bb-4b9f-a0c8-7dcd6db08919',     
// //       title: 'Evil Dead, The',     
// //       genres: ['Fiction', 'Dystopian', 'Memoir'],     
// //       publicationDate: '11/6/1905',     
// //       publisher: 'Nlounge',     
// //       summary:   'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',     
// //       isbn: '655529672-0',     
// //       language: 'Fijian',     
// //       pageCount: 608,     
// //       price: 15.47,     
// //       format: ['Hardcover', 'Paperback'],     
// //       authorId: 'ff58ae27-6e52-4231-8ae5-daa957eebac3'   
// //     },   
// //     {     
// //       id: 'd29f81b9-0959-4294-af5a-2182dc2cc1c5',     
// //       title: 'How to Succeed in Business Without Really Trying',     
// //       genres: ['Memoir', 'Families & Relationships'],     
// //       publicationDate: '4/20/1969',     
// //       publisher: 'Livetube',     
// //       summary:   'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',     
// //       isbn: '305091194-8',     
// //       language: 'Moldovan',     
// //       pageCount: 22,     
// //       price: 15.79,     
// //       format: ['Paperback'],     
// //       authorId: '170e2509-cc12-461b-997e-cae0e1e1fc79'   
// //     },   
// //     {     
// //       id: '8807d3d1-c148-4989-8298-fcffd9be14a6',     
// //       title: 'Fire-Eater (Tulennielijä)',     
// //       genres: ['Memoir', 'Gothic', 'Romance'],     
// //       publicationDate: '1/9/1943',     
// //       publisher: 'Riffpath',     
// //       summary:   'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',     
// //       isbn: '827138859-2',     
// //       language: 'Catalan',     
// //       pageCount: 203,     
// //       price: 27.38,     
// //       format: ['Paperback', 'E-Book'],     
// //       authorId: '8db08c4b-7983-4518-9a33-bef0994d925d'   
// //     },   


try{
    const authorData = await books.sameGenre("poopy");
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.sameGenre();
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorData = await books.sameGenre(false);
    console.log (authorData);
}catch(e){
    console.log (e);
}


//priceRange(min, max)

try{
    const authorData = await books.priceRange(5.99, 30);
    console.log (authorData);
}catch(e){
    console.log (e);
}
// // [   
// //     {     
// //       id: '519c733a-6a5d-451f-927d-0e860b5d1e3d',     
// //       title: 'Prime Suspect 3',     
// //       genres: ['Science Fiction'],     
// //       publicationDate: '3/22/1959',     
// //       publisher: 'Skilith',     
// //       summary:   'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',     
// //       isbn: '445798791-3',     
// //       language: 'Tetum',     
// //       pageCount: 960,     
// //       price: 18.35,     
// //       format: ['Paperback'],     
// //       authorId: '3f8bf018-4b09-4f9d-8206-e079ad314a46'   
// //     },   
// //     {     
// //       id: '40913fde-1113-47d7-a4d1-56ccf09ef08e',     
// //       title: 'Bambou',     
// //       genres: ['Guide / How-to'],     
// //       publicationDate: '4/16/1981',     
// //       publisher: 'Voomm',     
// //       summary:   'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',     
// //       isbn: '339021328-7',     
// //       language: 'Guaraní',     
// //       pageCount: 127,     
// //       price: 7.83,     
// //       format: ['E-Book'],     
// //       authorId: '2ddfc0e1-93ef-4ec2-ae77-7d5525305473'   
// //     },   
// //     {     
// //       id: 'cf4c4706-304a-4a90-a0b5-29f8721b439b',     
// //       title: 'Assassination of a High School President',     
// //       genres: ['Personal Development', 'Bildungsroman', 'Art', 'Romance', 'Dystopian'],     
// //       publicationDate: '7/28/1945',     
// //       publisher: 'Zoozzy',     
// //       summary:   'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',     
// //       isbn: '336246300-2',     
// //       language: 'Mongolian',     
// //       pageCount: 50,     
// //       price: 12.28,     
// //       format: ['Hardcover', 'Paperback', 'E-Book'],     
// //       authorId: '6ff250c1-ddaa-4abc-aeb2-8884a9f49a71'   
// //     },   
// //     {     
// //       id: 'f3eabffa-0ea9-48e2-b25d-2711c91a035e',     
// //       title: 'Next Karate Kid, The',     
// //       genres: ['Bildungsroman'],     
// //       publicationDate: '6/20/1929',     
// //       publisher: 'Centizu',     
// //       summary:   'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',     
// //       isbn: '104100623-3',     
// //       language: 'Tajik',     
// //       pageCount: 618,     
// //       price: 13.63,     
// //       format: ['Hardcover', 'E-Book'],     
// //       authorId: 'd8d43bcb-285b-492b-a3eb-d599563b6e8e'   
// //     },   
// //     {     
// //       id: '04e55bc9-0c7a-47a6-a403-52eabf25c6ef',     
// //       title: 'Shattered Image',     
// //       genres: ['Mystery'],     
// //       publicationDate: '5/30/2004',     
// //       publisher: 'Tekfly',     
// //       summary:   'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',     
// //       isbn: '214788141-4',     
// //       language: 'Ndebele',     
// //       pageCount: 439,     
// //       price: 15.91,     
// //       format: ['Paperback', 'Hardcover'],     
// //       authorId: 'cd66289a-dd71-4130-b2bc-19723cf0fa08'   
// //     }, 
// //   ]; 

try{
    const authorData = await books.priceRange("foo", 12); // Throws Error
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.priceRange(0, -3); // Throws Error:
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await books.priceRange(-5, 3); // Throws Error:
    console.log (authorData);
}catch(e){
    console.log (e);
}








  
// getAllBooksWithAuthorName()
try{
    const authorData = await books.getAllBooksWithAuthorName(); 
    console.log (authorData);
}catch(e){
    console.log (e);
}
// [
//     {     
//       id: '519c733a-6a5d-451f-927d-0e860b5d1e3d',     
//       title: 'Prime Suspect 3',     
//       genres: ['Science Fiction'],     
//       publicationDate: '3/22/1959',     
//       publisher: 'Skilith',     
//       summary:   'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',     
//       isbn: '445798791-3',     
//       language: 'Tetum',     
//       pageCount: 960,     
//       price: 18.35,     
//       format: ['Paperback'],     
//       author: 'Pris Osmond'   
//     },   
//     {     
//       id: 'fe64fc98-95ff-4d47-bac8-93c755b85c95',     
//       title: 'White Hunter, Black Heart',     
//       genres: ['Travel', 'Personal Development'],     
//       publicationDate: '4/23/1938',     
//       publisher: 'Podcat',     
//       summary:   'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',     
//       isbn: '068799766-6',     
//       language: 'New Zealand Sign Language',     
//       pageCount: 442,     
//       price: 56.84,     
//       format: ['Hardcover', 'Paperback', 'E-Book'],     
//       author: 'Marve Grinham'   
//     },   