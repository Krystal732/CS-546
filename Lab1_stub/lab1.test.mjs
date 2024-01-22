import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

//QUESTION 1
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])) // returns then outputs: [9, false]
console.log(lab1.questionOne(["qwsd", "plkj", "wft", "m"])) // returns then outputs: [0, true]
console.log(lab1.questionOne(["Hello"])) // returns then outputs: [2, true]
console.log(lab1.questionOne(["ding ding ding dong dong dong", "pop pop pop", "risky risky"])) // returns then outputs: [11, false]
console.log(lab1.questionOne(["123234", "ooooo", "OIIIiiiOuu"])) // returns then outputs: [15, false]

//QUESTION 2
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })) // returns and then outputs: ["a","b","c","d","e","f"]
console.log(lab1.questionTwo({ a: 1, h: 0}, { d: true, e: 4,})) // returns and then outputs: ["a","d", "e", "h"]
console.log(lab1.questionTwo({ f: 1, g: 46 }, { d: 3, 1: "test"})) // returns and then outputs: ['1', "d","f", "g"]
console.log(lab1.questionTwo({ a: 3}, { a:"fancy"})) // returns and then outputs: []
console.log(lab1.questionTwo({g: 46 }, { true: 3, e: 4, "yes": 5, g: 2 })) // returns and then outputs: ['e', 'true', 'yes']

//QUESTION 3
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]))  // returns {'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]}
console.log(lab1.questionThree([[3,5,4]]))  // returns {'0': [6, 12]}
console.log(lab1.questionThree([[3,3,3], [2,1,1]]))  // returns {'0': [3.9, 9], '1': [0,4]}
console.log(lab1.questionThree([[5,4,2], [1,4,3]]))  // returns {'0': [3.8, 11], '1': [0,8]}
console.log(lab1.questionThree([[12, 13, 15]]))  // returns {'0': [74.83, 40]}

//QUESTION 4
console.log(lab1.questionFour('joseph,ball,square,pencil'));  //should return and then log ['ephjos', 'llba', 'aresqu', 'cilpen'] 
console.log(lab1.questionFour('krystal,hong'));  //should return and then log ['talkrys', 'ngho'] 
console.log(lab1.questionFour('twice'));  //should return and then log ['cetwi'] 
console.log(lab1.questionFour('test,123456,abcdefg'));  //should return and then log [ 'stte', '456123', 'efgabcd' ]
console.log(lab1.questionFour('a'));  //should return and then log ['a'] 













