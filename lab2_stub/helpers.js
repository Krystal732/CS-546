/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

//from lecture 2 calculator example
export function checkIsArray(arr) {
    if (!arr){
        throw `${arr|| 'provided variable'} is not an array`;
    }
    if (!Array.isArray(arr)) {
      throw `${arr|| 'provided variable'} is not an array`;
    }
  }
  
export function checkIsNumber(val) {
    if (typeof val !== "number") {
      throw `${val || 'provided variable'} is not a number`;
    }
  
    if (isNaN(val)) {
      throw `${val || 'provided variable'} must be proper number`;
    }

    if(val === Infinity){
        throw `${val || 'provided variable'} must be proper number`;
    }
  }
  
export function checkIsString(s) {
    if (typeof s !== "string") {
      throw `${s|| 'provided variable'} is not a string`;
    }
  }

export function checkIsObject(obj){
    if (!obj){
        throw "Input is not supplied, is undefined, null, 0, false, '', or NaN";
    }
    if(Object.keys(obj).length === 0){
      throw `objects must have at least 1 element`
    }
    if (Array.isArray(obj)){
        throw 'Input must be an object, but an array was supplied';
    }
    //now that I made sure it's not an array, I can check to make sure it's an object using typeof
    if (typeof obj !== 'object'){
        throw 'Input must be an object!';
    } 
}
  
export function superSort(arr){
  let nums = []
  let strs = []
  for (let e of arr){
    if (typeof(e) === "number"){
      nums.push(e)
    }else{
      strs.push(e)
    }
  }
  return nums.sort((a, b) => a - b).concat(strs.sort())
}