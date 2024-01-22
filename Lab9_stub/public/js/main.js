//Here is where you will do all of the logic and processing for the palindrome and prime checking.

let myForm = document.getElementById('myForm');
let palindromeInput = document.getElementById("palindrome_input")
let myOl = document.getElementById('palindromes');
let error = document.getElementById('error');

if (myForm) {
    myForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let palindromeList = palindromeInput.value.trim().toLowerCase()
      if (palindromeList) {
        error.hidden = true;

        palindromeList = palindromeList.split(",")
        let boolList = []
        for(let word of palindromeList){
            //keep only alphanumeric chars
            word = word.replace(/[^a-z0-9]/g, '')
            //check palindrome
            let reversed = word.split('').reverse().join('')

            boolList.push(reversed === word)
            
        }

        //check prime
        let prime = true
        let num = boolList.length
        if (num <= 1){
            prime = false
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0){
            prime = false
          }
        }
        

        let li = document.createElement('li');
        li.innerHTML = JSON.stringify(boolList);
        if (prime){
            li.className = 'prime'
        }else[
            li.className = 'not-prime'
        ]
        myOl.appendChild(li);
        myForm.reset();

      } else {
        //error with p element on page with class "error"
        error.hidden = false;
      }
    });
  }


