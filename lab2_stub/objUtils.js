/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import {checkIsArray, checkIsNumber, checkIsString, checkIsObject} from './helpers.js'

export let solvePuzzles = (puzzles, pieces) => {
      checkIsArray(puzzles)
      checkIsObject(pieces)

      //check that pieces only has a b c d e
      let validKeys = ["a", "b", "c", "d", "e"]
      let piecesKeys = Object.keys(pieces)
      
      for(let p of piecesKeys){
            if(!validKeys.includes(p)){
                  throw `pieces must only have keys a b c d e`
            }
      }


      let complete = []
      //
      for (let puzz of puzzles){
            checkIsObject(puzz)
            //check if puzz keys are all valid 
            let puzzKeys = Object.keys(puzz).sort()
            for(let p of puzzKeys){
                  if(!validKeys.includes(p)){
                        throw `${puzz} must only have keys a b c d e`
                  }
            }
            //puzz MUST be missing at least 1 piece
            if (puzzKeys.length > 4){
                  throw `${puzz} must be missing at least 1 piece`
            }

            //and fill in any missing
            let incomplete = false
            for(let i =0; i < validKeys.length; i++){
                  //if missing from puzz, take from pieces
                  if (!(puzzKeys.includes( validKeys[i]))){
                        if(!piecesKeys.includes(validKeys[i])){
                              incomplete = true
                        }else{
                              puzz[validKeys[i]] = pieces[validKeys[i]]
                        }
                  }

            }

            if (!incomplete){
                  complete.push(puzz)
            }

      }
      return complete

};
export let evaluatePokerHand = (hand, communityCards) => {
      checkIsArray(hand)
      checkIsArray(communityCards)

      //hand has 2 cards
      if(hand.length !== 2){
            throw `hand must only have 2 cards`
      }

      //community cards has 3-5 cards
      if(communityCards.length < 3 || communityCards.length > 5){
            throw `community cards must have 3-5 cards`
      }


      //combine cards
      let cards = hand.concat(communityCards)
      let suits = ["hearts", "clubs", "diamonds", "spades"]
      let values = ["2", "3", "4","5","6","7","8","9","10", "J", "Q", "K", "A"]
      
      let suitCount = {}
      let valCount = {}

      for(let card of cards){
            //check valid card
            if(Object.keys(card).length !== 2 || !Object.keys(card).includes("suit") || !Object.keys(card).includes("value")){
                  throw`${card} must only contain suit and value`
            }
            if(!suits.includes(card["suit"].trim())){
                  throw `${card} must have valid suit`
            }
            if(!values.includes(card["value"].trim())){
                  throw `${card} must have valid value`
            }

            //add to dicts
            if (Object.keys(suitCount).includes(card["suit"].trim())){
                  suitCount[card["suit"].trim()].push(card["value"].trim())
            }
            else{
                  suitCount[card["suit"].trim()] = [card["value"].trim()]
            }
            valCount[card["value"].trim()] = (valCount[card["value"].trim()] || 0) + 1
      }

      //check for straight flush
      for(let s of Object.keys(suitCount)){
            //how to sort array based on order of other array https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
            suitCount[s].sort((a, b) => values.indexOf(a) - values.indexOf(b));

            if(suitCount[s].length > 4 && !("JQKA".includes(suitCount[s][0]))){ //if there is flush check for straight
                  //check for a2345 case
                  if(suitCount[s][0] === "2"){
                        if(suitCount[s].includes("3") && suitCount[s].includes("4") && suitCount[s].includes("5") && suitCount[s].includes("A")){
                              return "Straight Flush" //dont judge me...
                        }
                  }
                  //check if subarray of at least 5 exists
                  for(let i = 0; i <= suitCount[s].length - 5; i++){
                        let j =values.indexOf(suitCount[s][i])
                        let sub = values.slice(j, j+5)
                        //check if they equal
                        let test = true
                        for (let k =0; k < 5; k++){
                              if(sub[k] !== suitCount[s][i+k]){
                                    test = false
                              }
                        }
                        if(test){
                              return "Straight Flush"
                        }
                  }

            }
      }


      //check for 3 or 2 of kind
      if (Object.values(valCount).includes(3) || Object.values(valCount).includes(4)){
            return "Three of a Kind"
      }
      if (Object.values(valCount).includes(2)){
            return "Pair"
      }
      return "High Card"
      
};

export let combineObjects = (arr) => {
      checkIsArray(arr)
      if(arr.length < 2){
            throw `array must contain at least 2 objects`
      }
      //check all objects
      for(let obj of arr){
            checkIsObject(obj)
      }
      //iterate through keys of first obj, use array.every and includes to see if common to all, if yes, then iterate and add to result
      let common = {}
      for(let key of Object.keys(arr[0])){
            if(arr.every(x => Object.keys(x).includes(key))){ //if every obj includes this key
                  common[key] = []
                  for(let obj of arr){
                        common[key].push(obj[key])
                  }
            }
      }
      return common

};
