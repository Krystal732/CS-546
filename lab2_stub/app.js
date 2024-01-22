/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import * as arrayUtils from './arrayUtils.js';
import * as stringUtils from './stringUtils.js';
import * as objUtils from './objUtils.js';


//mergeCommonElements(...args)
try{
    console.log(arrayUtils.mergeCommonElements(["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"])) // returns ["apple"]
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.mergeCommonElements([1, 2, 3], [], [4, 5, 6])) // throws error
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.mergeCommonElements([3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3,])) //returns [1, 3]

}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"])) //returns [-4, 3, 24, "abc"]

}
catch(e){
    console.log(e)
}try{
    console.log(arrayUtils.mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4, "10", "9" ], [3, ["62", 4], 1, 24, -4, "abc", "10", "9"])) //returns [-4, 3, 24, "10", "9", "abc"]

}
catch(e){
    console.log(e)
}try{
    console.log(arrayUtils.mergeCommonElements([5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0])) // returns [5, "banana"]

}
catch(e){
    console.log(e)
}try{
    console.log(arrayUtils.mergeCommonElements([4, [5, "apple"], 3], [3, 4, [5, "apple"]], [3, "apple", 6, 7])) // returns [3, "apple"]

}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.mergeCommonElements([1, 2, 3], "string", [4, 5, 6])) // throws an error
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.mergeCommonElements([], [4,5,6], [4])) // throws an error
}
catch(e){
    console.log(e)
}try{
    console.log(arrayUtils.mergeCommonElements([[" "]], [" ",4,5,6], [" ",4])) // [" "]
}
catch(e){
    console.log(e)
}








//findTriangles(array)
try{
    console.log(arrayUtils.findTriangles([[7,5,5], [2,4,3], [12,12,11]]))   // returns {'0': [12.5, 17, "isosceles"], '1': [2.90, 9, "scalene"], '2': [58.66,35, "isosceles"]}
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.findTriangles([[3,3,3], [3,3,4], [5,4,2]]) )  // returns {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]}
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.findTriangles([[5,Infinity,5]]))   // throws error
}
catch(e){
    console.log(e)
}




//stringMetrics(array)
try{
    console.log(arrayUtils.stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"])) //returns {vowels: 11, consonants: 19, longest: "seventeen", shortest: "hill", mean: 6, median:  5, mode: 5}

}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.stringMetrics(["john", "rob", "stark", "aegon"])) //returns {vowels: 6, consonants: 11, longest: ["aegon", "stark"], shortest: "rob", mean: 4.25, median:  4.5, mode: 5}
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.stringMetrics(["test", "          "])) //throw error
}
catch(e){
    console.log(e)
}
try{
    console.log(arrayUtils.stringMetrics(["at", "1"])) //returns {vowels: 6, consonants: 11, longest: ["aegon", "stark"], shortest: "rob", mean: 4.25, median:  4.5, mode: 5}
}
catch(e){
    console.log(e)
}






//emojiCounter(message)

try{
    console.log(stringUtils.emojiCounter("I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row.")); // Should return 7
}
catch(e){
    console.log(e)
}
try{
    console.log(stringUtils.emojiCounter("Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!")); // Should return 9
}
catch(e){
    console.log(e)
}
try{
    console.log(stringUtils.emojiCounter(":::(fire):fire:")); // Should return 1
}
catch(e){
    console.log(e)
}
try{
    console.log(stringUtils.emojiCounter("::")); // Should return 0
}
catch(e){
    console.log(e)
}
try{
    console.log(stringUtils.emojiCounter("             ")); // Throws error
}
catch(e){
    console.log(e)
}



//sortStockPrices(lastStocks, currStocks)

let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
try{
    console.log(stringUtils.sortStockPrices(lastStocks, currStocks)) // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}])
}
catch(e){
    console.log(e)
}
lastStocks = `GME,18.25|gme, 8.00|PFE, 34.00`;
currStocks = `gme, 7.75|GME, 18.80|pfe, 13.32`;

try{
    console.log(stringUtils.sortStockPrices(lastStocks, currStocks)) // throw error
}
catch(e){
    console.log(e)
}
lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,099202.121`;
currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
try{
    console.log(stringUtils.sortStockPrices(lastStocks, currStocks)) // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}])
}
catch(e){
    console.log(e)
}





//mashUp(string1, string2)
try{
    console.log(stringUtils.mashUp("Patrick", "Hill")); //Returns "Hillick Patr"
}
catch(e){
    console.log(e)
}
try{
    console.log(stringUtils.mashUp("helloooo", "world!")); //Returns "worloooo helld!"
}
catch(e){
    console.log(e)
}
try{
    console.log(stringUtils.mashUp("Patrick", "w      ")); //Throws error
}
catch(e){
    console.log(e)
}







//solvePuzzles(puzzles, pieces):


try{
    console.log(objUtils.solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: "hello"}], {a: 45, b: 60, c:-3, d: 88, e: 12})) //returns [{a: 23, b: 17, c:-3, d: 2, e:12}, {a:45, b: 17, c:-3, d: 3, e: “hello”} ]
}
catch(e){
    console.log(e)
}
try{
    console.log(objUtils.solvePuzzles([{b: "tree   ", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, e:200})) //returns [{a: “house”,b: “tree”, c: 50, d: “patrick”, e:200}]
}
catch(e){
    console.log(e)
}
try{
    console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], { b: "apple", c: 50, d: 100})) //returns error
}
catch(e){
    console.log(e)
}




//evaluatePokerHand(hand, communityCards)
let hand = [{suit: 'hearts', value: '2'}, {suit: 'hearts', value: '3'}];
let communityCards = [
  {suit: 'hearts', value: '4'},
  {suit: 'hearts', value: '5'},
  {suit: 'hearts', value: '6'}
];

try{
    console.log(objUtils. evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"

}
catch(e){
    console.log(e)
}
hand = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '5'}];
communityCards = [
  {suit: 'diamonds', value: '4'},
  {suit: 'spades', value: '5'},
  {suit: 'hearts', value: '2'},
  {suit: 'clubs', value: 'J'},
  {suit: 'diamonds', value: 'Q'}
];

try{
    console.log(objUtils.
        evaluatePokerHand(hand, communityCards)); // Returns "Three of a Kind"
}
catch(e){
    console.log(e)
}


hand = [{suit: 'hearts', value: '4'}, {suit: 'clubs', value: '9'}];
communityCards = [
  {suit: 'diamonds', value: '2'},
  {suit: 'spades', value: '5'},
  {suit: 'hearts', value: '6'},
  {suit: 'clubs', value: '7'},
  {suit: 'diamonds', value: '8'}
];

try{
    console.log(objUtils.
        evaluatePokerHand(hand, communityCards)); // Returns "High Card"
}
catch(e){
    console.log(e)
}

hand = [{suit: 'hearts', value: '2'}, {suit: 'hearts', value: '3'}];
communityCards = [
  {suit: 'hearts    ', value: '4'},
  {suit: 'hearts', value: '5'},
  {suit: 'hearts', value: 'A'}
];

try{
    console.log(objUtils. evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"
}
catch(e){
    console.log(e)
}

hand = [{suit: 'hearts', value: '2'}, {suit: 'hearts', value: '3'}];
communityCards = [
  {suit: 'hearts    ', value: '4'},
  {suit: 'hearts', value: '5'},
  {suit: 'heart', value: 'A'}
];

try{
    console.log(objUtils. evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"
}
catch(e){
    console.log(e)
}




//combineObjects(array)
try{
    console.log(objUtils.combineObjects(
        [  { a: 3, b: 7, c: 5 , d:7},
          { d: 4, e: 9, a:"apple" },
          { a: 8, d: 2 } ]
        ));
        
        //  Returns:
        // {
        //   a: [3, "apple", 8]  
        //   d: [7,4,2]
        // } 
}
catch(e){
    console.log(e)
}
try{
    console.log(objUtils.combineObjects(
        [  { j: true, ba: 7, c: 5 , d:7},
          { j: 90, e: 9, a:"apple" },
          { j: 15, dd: 2 } ]
        ));
        
        //  Returns:
        // {
        //   j: [True, 90, 15]  
        // }
        // 
        
}
catch(e){
    console.log(e)
}
try{
    console.log(objUtils.

        combineObjects(
            [  { k: true, ba: 7, c: 5 , d:7},
              { j: 90, e: 9, a:"apple" },
              { j: 15, dd: 2 } ]
            ))  ;
            
            //  Returns:
            // {}
            // 
        
        
}
catch(e){
    console.log(e)
}
    
try{
    console.log(objUtils.

        combineObjects(
            [  { k: true, ba: 7, c: 5 , d:7},
              { j: 90, e: 9, a:"apple" },
              {} ]
            ))  ;
            
            // throw error
            
        
        
}
catch(e){
    console.log(e)
}
    
