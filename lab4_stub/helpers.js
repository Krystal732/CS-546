//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

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

