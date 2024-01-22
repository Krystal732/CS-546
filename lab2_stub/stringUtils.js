/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import {checkIsArray, checkIsNumber, checkIsString} from './helpers.js'

export let emojiCounter = (message) => {
      //check string
      checkIsString(message)
      message = message.trim()
      if(message.length === 0){
            throw `string cannot be empty`
      }

      //iterate through string, when ":" start/end emoji, keep track of if started or not, also check if there is a non-space char to det if valid 

      let count = 0
      let started = false
      let valid = true
      let prev = ""

      for(let c of message){
            if(c == ":"){
                  if(started){ //if already started then end emoji
                        if(valid && prev !== ":"){
                              count++
                              started = false
                        }                       
                  }else{//not started, then start
                        started = true
                        valid = true
                  }
            }else{ //any other char
                  if (c == " "){ //if a space then invalid
                        valid = false
                  }
            }
            prev = c
      }  

      return count
};

export let sortStockPrices = (lastStocks, currStocks) => {
      //check string and trim
      checkIsString(lastStocks)
      lastStocks = lastStocks.trim()
      if(lastStocks.length === 0){
            throw `lastStocks cannot be empty`
      }

      checkIsString(currStocks)
      currStocks = currStocks.trim()
      if(currStocks.length === 0){
            throw `currStocks cannot be empty`
      }

      //split
      let last = lastStocks.toLowerCase().split("|").sort()
      let curr = currStocks.toLowerCase().split("|").sort()

      if(last.length !== curr.length){
            throw "last and curr must contain same number of stocks"
      }

      let stocks = []

      //keep an arr of ticks to check for repeats
      let names =[]
      //iterate through split
      for(let i=0; i<last.length; i++){
            let l = last[i].split(",")
            let c = curr[i].split(",")

            //only 2 things ticker,price
            if (l.length !== 2 || c.length !== 2){
            
                  throw "stocks must be in format stockTicker,stockPrice"
            }

            //matching ticks
            if(l[0].trim() !== c[0].trim()){
                  throw "stocks must be same in last and curr"
            }
            let tick = l[0]

            //check tick only contains a-z and are 1-5 chars long
            if( !(/^[a-z]*$/.test(tick)) || tick.length < 1 || tick.length > 5){
                  throw `${tick} must contain a-z and 1-5 chars long`
            }

            if(names.includes(tick)){
                  throw `${tick} appears more than once`
            }
            names.push(tick)

            //check price is valid string rep of number and only 2 decimals
            let currPrice = c[1]
            let lastPrice = l[1]
            // if(!(/^\d*\.\d{2}$/.test(currPrice)) || !(/^\d*\.\d{2}$/.test(lastPrice))){
            //       throw `all prices must be valid string rep of number`
            // }


            currPrice = parseFloat(currPrice)
            lastPrice = parseFloat(lastPrice)

            if(isNaN(currPrice) || !isFinite(currPrice) ||isNaN(lastPrice) || !isFinite(lastPrice) ){
                  throw ` stock prices must be valid numbers`
            }

            if(currPrice <= 0 || lastPrice <= 0){
                  throw `stock prices must be positive numbers`
            }
            
            let diff = (currPrice - lastPrice)/lastPrice * 100
            stocks.push({symbol:tick.toUpperCase(), price:parseFloat(currPrice), change:parseFloat(diff.toFixed(1))})
      }


      return stocks.sort((a, b) => b.change - a.change)

};


export let mashUp = (string1, string2) => {
      checkIsString(string1)
      string1 = string1.trim()
      if(string1.length < 4){
            throw `string1 must be at least 4 chars`
      }

      checkIsString(string2)
      string2 = string2.trim()
      if(string2.length < 4){
            throw `string2 must be at least 4 chars`
      }

      //first 4 of string2 + string1 after index 4
      let s1 = string2.substring(0, 4) + string1.substring(4)
      let s2 = string1.substring(0, 4) + string2.substring(4)

      return s1 + " " + s2
    
};
