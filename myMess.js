// checkGuess function

// function checkGuess () {
//     let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
//     let guessString = ''
//     let rightGuess = Array.from(rightGuessString)
    

//     for (const val of currentGuess) {
//         guessString += val
//         //console.log(val, 'log 1')
        
//     }
//     //console.log(rightGuess, 'log 2')


//     if (guessString.length != 5) {
//         toastr.error("Not enough letters!")
//         return
//     }

//     if (!WORDS.includes(guessString)) {
//         toastr.error("Word not in list!")
//         return
//     }

    
    
//     // for (let i = 0; i < 5; i++) {
//     //     let letterColor = ''
//     //     let letterColor2 = '' //change a color from yellow to gray
//     //     let box = row.children[i]
//     //     let x = -1
//     //     let changeBox = row.children[x] // change a color from yellow to gray
//     //     let letter = currentGuess[i]
        
        
//     //     //console.log(rightGuess, currentGuess)
        
//     //     let letterPosition = rightGuess.indexOf(currentGuess[i])
//     //     // is letter in the correct guess
//     //     if (letterPosition === -1) {
//     //         letterColor = 'grey'
//     //     }else if(currentGuess[i]===rightGuess[i]){
//     //         //shade green
//     //         letterColor = 'green'
//     //         for(let j = 0; j<5; j++){
//     //             if(currentGuess[i] === rightGuess[j] && i !== j && currentGuess[j] !== rightGuess[j]){
//     //                 //shade one letter back to gray
//     //                 letterColor2 = 'gray'
//     //                 x = j
//     //             }
//     //         }
            
//     //     }else if(rightGuess.includes(currentGuess[i])){
//     //         letterColor = 'yellow'
//     //     }                
//     //     }
//     //     }
        

    
//     for (let i = 0; i < 5; i++) {
//         let letterColor = ''
//         let box = row.children[i]
//         let letter = currentGuess[i]
        
//         let letterPosition = rightGuess.indexOf(currentGuess[i])
//         // is letter in the correct guess
//         if (letterPosition === -1) {
//             letterColor = 'grey'
//         } else {
//             // now, letter is definitely in word
//             // if letter index and right guess index are the same
//             // letter is in the right position 
//             if (currentGuess[i] === rightGuess[i]) {
//                 // shade green 
//                 letterColor = 'green'
//             } 
//             if (rightGuess.includes(currentGuess[i]) && currentGuess[i] !== rightGuess[i]){
//                 // shade box yellow
//                 letterColor = 'yellow'
//             }

//             rightGuess[letterPosition] = "#"
//         }

//         let delay = 250 * i
//         setTimeout(()=> {
//             //flip box
//             animateCSS(box, 'flipInX')
//             //shade box
//             box.style.backgroundColor = letterColor
//             changeBox.style.backgroundColor = letterColor2 // change previously found letter to gray
//             shadeKeyBoard(letter, letterColor)
//         }, delay)
    

//     if (guessString === rightGuessString) {
//         toastr.success("You guessed right! Game over!")
//         guessesRemaining = 0
//         //return
        
//     } else {
//         guessesRemaining -= 1;
//         currentGuess = [];
//         nextLetter = 0;

//         if (guessesRemaining === 0) {
//             toastr.error("You've run out of guesses! Game over!")
//             toastr.info(`The right word was: "${rightGuessString}"`)
//         }
//     }


// checkGuess function

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    }

    let letterColors = []  // change 1
    for (let i = 0; i < 5; i++) {
        rightGuess.includes(currentGuess[i]) ? letterColors[i] = 'yellow' : letterColors[i] = 'gray'
        
        if(rightGuess[i] === currentGuess[i]){
            letterColors[i] = 'green'
            let x = letterColors.indexOf('yellow')
            letterColors[x] = 'gray'
        }
        
    }   
    //  loop 
    for(let j = 0; j<5; j++){
        let box = row.children[j]//change 2
            let delay = 250 // change 4 delete i
            setTimeout(()=> {
                //flip box
                animateCSS(box, 'flipInX')
                //shade box
                box.style.backgroundColor = letterColors[j] // change 3
                shadeKeyBoard(letter, letterColors[j])
        }, delay)
    }


    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
        
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}
