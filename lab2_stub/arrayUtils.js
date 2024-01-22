/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import {checkIsArray, checkIsNumber, checkIsString, superSort} from './helpers.js'
export let mergeCommonElements = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  //check at least 2 arrays
  if (args.length < 2){ 
    throw `${args|| 'provided array'} does not have at least 2 arrays`;
  }
  //check if inputs are arrays, not empty, (flatten) each element is either num or string
  for (let a of args){
    checkIsArray(a);
    if (a.length == 0){
      throw `${a || 'provided variable'} arrays must contain at least 1 element`;
    }
    let f = a.flat(Infinity);
    //iterate through and check if elements are either number or strings
    for (let e of f){
      if (((typeof e !== "number"||isNaN(e)) && (typeof e !== "string"))){
        throw `${e || 'provided variable'} must be a string or number`
      }
    }
  }
  //compare elements of curr array w next and filter to find common elements
  let result = []
  let firstArg = args[0].flat(Infinity)
  for(let ele of firstArg){
    if(args.every(x => x.flat(Infinity).includes(ele))){ //if every array has the element
      result.push(ele)
    }
}
  //remove repeated elements
  result = result.filter((e, i) => result.indexOf(e) === i)
  //sort
  return superSort(result);
};
export let findTriangles = (arr) => {
  //check array of arrays
  checkIsArray(arr);
  if(!arr){
    throw`array must be 2d array`
  }
  let triangles = {}
  for (let i =0; i<arr.length; i++){
    checkIsArray(arr[i]);
    //subarray only len of 3
    if (arr[i].length !== 3){
      throw `${arr[i]} must contain 3 numbers`
    }
    //subarray contains only positive numbers 
    for(let e of arr[i]){
      checkIsNumber(e);
      if(e <= 0){
        throw `${e} must be a positive number`
      }
    }
    //check if valid triangle (sum of 2 sides greater than other side)
    if (arr[i][0] + arr[i][1] <= arr[i][2] || arr[i][0] + arr[i][2] <= arr[i][1] || arr[i][1] + arr[i][3] <= arr[i][0]) {
      throw `${arr[i]} must be valid triangle`
    }

    //perim, area from hw1
    let perimeter = arr[i][0] + arr[i][1] +arr[i][2] ;
    let s = perimeter/2
    let area = Math.sqrt(s*(s-arr[i][0])*(s-arr[i][1])*(s-arr[i][2]));

    //equilateral, isoceles or scalene
    if(arr[i][0] === arr[i][1] && arr[i][0] === arr[i][2]){
      triangles[i] = [parseFloat(area.toFixed(2)), perimeter, "equilateral"]    
    }
    else if(arr[i][0] === arr[i][1] || arr[i][0] === arr[i][2] || arr[i][1] === arr[i][2]){
      triangles[i] = [parseFloat(area.toFixed(2)), perimeter, "isosceles"]    
    }else{
      triangles[i] = [parseFloat(area.toFixed(2)), perimeter, "scalene"]    
    }
  }
  return triangles

};


export let stringMetrics = (arr) => {
  //check num of args
  // if (arguments.length !== 1){
  //   throw `1 argument required`
  // }
  //check proper arr
  checkIsArray(arr);
  if (arr.length < 2){
    throw `array must contain at least 2 strings`;
  }
  //store array of lengths for mean, med
  let lengths = []

  //dict of lengths for mode
  let lengthsDict = {}

  let dict = {vowels:0, consonants:0, longest:[], shortest:[], mean:0, median:0, mode:[]}
  for (let s of arr){
    //check proper string
    checkIsString(s)
    //trim
    s = s.trim()
    //check not empty
    if(s.length === 0){
      throw `No strings with just empty spaces are valid`;
    }

    //vowel/constanants
    let lowerS = s.toLowerCase();
    for (let c of lowerS){
      if (c === 'a'||c === 'e' || c === 'i' || c === 'o' || c === 'u'){
        dict["vowels"]++
      }
      else if ("bcdfghjklmnpqrstvwxyz".includes(c)){
        dict["consonants"]++
      }
    }

    //longest or shortest check
    if (s.length > Math.max(...lengths)){
      dict["longest"] = [s]
    }
    else if (s.length === Math.max(...lengths)){
      dict["longest"].push(s)
    }
    if (s.length < Math.min(...lengths)){
      dict["shortest"] = [s]
    }
    else if(s.length === Math.min(...lengths)){
      dict["shortest"].push(s)
    }


    //add to array of lengths and dict
    lengths.push(s.length)
    //https://stackoverflow.com/questions/18690814/how-to-increment-an-object-property-value-if-it-exists-else-set-the-initial-val
    //looked up how to add to dict or increment value :P
    lengthsDict[s.length] = (lengthsDict[s.length] || 0) +1

  }

  lengths = lengths.sort()

  //mean
  let sum = lengths.reduce((sum, n) => sum + n)
  dict["mean"] = sum/(lengths.length)

  //median
  let mid = Math.floor(lengths.length/2)
  if(lengths.length % 2 !== 0){ //odd length
    dict["median"] = lengths[mid]
  }else{ //even
    dict["median"] = ((lengths[mid] + lengths[mid-1]))/2
  }

  //mode
  //iterate through lengths dict to find max
  //check if no mode 
  let currMax = 1
  for(let l in lengthsDict){
    if(lengthsDict[l] > currMax){
      currMax = lengthsDict[l]
      dict["mode"] = [parseFloat(l)]
    }
    else if(lengthsDict[l] === currMax && currMax!= 1){
      dict["mode"].push(parseFloat(l))
    }
  }
  //if only 1 mode, dont put in array, if 0 make null
  if(dict["mode"].length === 1){
    dict["mode"] = dict["mode"][0]
  }
  else if(dict["mode"].length === 0){
    dict["mode"] = null
  }else{
    dict["mode"].sort()
  }


  
  //remove repeats 
  dict["longest"]=dict["longest"].filter((e, i) => dict["longest"].indexOf(e) === i)
  dict["shortest"]=dict["shortest"].filter((e, i) => dict["shortest"].indexOf(e) === i)


  //if only 1, dont put in array
  if(dict["longest"].length === 1){
    dict["longest"] = dict["longest"][0]
  }else{
    dict["longest"].sort()
  }
  if(dict["shortest"].length === 1){
    dict["shortest"] = dict["shortest"][0]
  }else{
    dict["shortest"].sort()
  }

  return dict
};
