export const questionOne = (arr) => {
  if (!arr){
    return [0, true]
  }
  // Implement question 1 here
  let count = 0;
  //iterate through strings in arr, iter through chars and check 
  //make all strs lowercase
  for (let s of arr){
    s = s.toLowerCase();
    for (let c of s){
      if (c === 'a'||c === 'e' || c === 'i' || c === 'o' || c === 'u'){
        count++;
      }
    }
  }
  return [count, count % 2 === 0]; //return result
};
// console.log(questionOne(["Hello", "good", "weather", "today"]));




export const questionTwo = (obj1, obj2) => {
  // Implement question 2 here
  let uncommon = [];
  //get keys of objs and iterate through one and try to find in other
  //if match then rem, if not then add to uncommon
  let x = Object.keys(obj1);
  let y = Object.keys(obj2);

  for (let k of x){
    if (!(y.includes(k))){
      uncommon.push(k);
    }
    else{
      y.splice(y.indexOf(k), 1)
    }
    
  }

  return uncommon.concat(y).sort(); //return result
};

// console.log(questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })) // returns ["a","b","c","d","e","f"])



export const questionThree = (arr) => {
  // Implement question 3 here
  //for i in len of arr, add to dict index:[area, perimeter]
  //use Heron's Formula to find area https://www.cuemath.com/measurement/area-of-triangle-with-3-sides/
  let triangles = {};
  for (let i =0; i<arr.length; i++){
    let perimeter = arr[i][0] + arr[i][1] +arr[i][2] ;
    let s = perimeter/2
    let area = Math.sqrt(s*(s-arr[i][0])*(s-arr[i][1])*(s-arr[i][2]));

    triangles[i] = [parseFloat(area.toFixed(2)), perimeter]
  }
  return triangles; //return result
};

// console.log(questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]))



export const questionFour = (string) => {
  // Implement question 4 here
  //split string, slice string at index len/2 and change order
  let arr = string.split(',');
  for (let i =0; i<arr.length; i++){
    let s = arr[i]
    let m = Math.round(s.length/2)
    let n = (s.length)-m
    // console.log(s.length, m, n)
    let front = s.substr(0,m);
    let end = s.substr(-n, n)
    arr[i] = end.concat(front)
  }
  return arr; //return result
};

// console.log(questionFour('joseph,ball,square,pencil'))

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Krystal',
  lastName: 'Hong',
  studentId: '10464295'
};
