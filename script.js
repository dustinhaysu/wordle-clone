import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random()* WORDS.length)]
console.log(rightGuessString)

//game board

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++){
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j<5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}
initBoard()

//user input

document.addEventListener("keyup", (e) => {
    let pressedKey = String(e.key)

    if (pressedKey === "new game") {
        location.reload()
        return
    }

    if (guessesRemaining === 0) {
        return
    }

    
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }
    

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

//insertLetter function

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1 

}

// deleteLetter function

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ''
    box.classList.remove("filled=box")
    currentGuess.pop()
    nextLetter -= 1
}

// checkGuess function
// changed from original design to create a letterColors array and letters array
// after the arrays are built we loop though animation and timeOut to score currentGuess array
// see ====original code=== for differences

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
// changed variables to arrays
    let letterColors = []  
    let letters = []

    //set backgroung color on all currentGuess elements to gray
    currentGuess.forEach((__, index )=>letterColors[index] = 'gray' )

    //push currentGuess array to letters array
    // find all direct matches and color green
    // change right guess array to '#' to avoid further matching
    for (let i = 0; i < 5; i++) {
        letters.push(currentGuess[i])
        if(rightGuess[i] === currentGuess[i]){
            letterColors[i] = 'green'
            rightGuess[i] = '#'
        } 
    }

    //anything left over should be an indirect match and once match is found rightGuess is reassigned to '#' to avoid further matching 
    for(let k = 0; k<5; k++){
        if(rightGuess.includes(currentGuess[k]) && letterColors[k] !== 'green' ){
            letterColors[k] = 'yellow'
            let x = rightGuess.indexOf(currentGuess[k])
            rightGuess[x] = '#'
        } 
    }   
    //  loop arrays letters and letterColors through async method setTimeout()
    for(let j = 0; j<5; j++){
        let box = row.children[j]//change 2
            let delay = 250 * j // change 4 delete i
            setTimeout(()=> {
                //flip box
                animateCSS(box, 'flipInX')
                //shade box
                box.style.backgroundColor = letterColors[j] // change 3
                shadeKeyBoard(letters[j], letterColors[j])
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



//==================================original code==========================================================
// function checkGuess () {
//     let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
//     let guessString = ''
//     let rightGuess = Array.from(rightGuessString)

//     for (const val of currentGuess) {
//         guessString += val
//     }

//     if (guessString.length != 5) {
//         toastr.error("Not enough letters!")
//         return
//     }

//     if (!WORDS.includes(guessString)) {
//         toastr.error("Word not in list!")
//         return
//     }

    
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

//             //rightGuess[letterPosition] = "#"
//         }

//         let delay = 250 * i
//         setTimeout(()=> {
//             //flip box
//             animateCSS(box, 'flipInX')
//             //shade box
//             box.style.backgroundColor = letterColor
//             shadeKeyBoard(letter, letterColor)
//         }, delay)
//     }

//     if (guessString === rightGuessString) {
//         toastr.success("You guessed right! Game over!")
//         guessesRemaining = 0
//         return
        
//     } else {
//         guessesRemaining -= 1;
//         currentGuess = [];
//         nextLetter = 0;

//         if (guessesRemaining === 0) {
//             toastr.error("You've run out of guesses! Game over!")
//             toastr.info(`The right word was: "${rightGuessString}"`)
//         }
//     }
// }
//====================================original code==================================================

// shadeKeyboard function

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }
            if (oldColor === 'yellow' && color !== 'green') {
                return
            }
            elem.style.backgroundColor = color
            break
        }
    }
}

// How to add notifications 
// go to the above h1 in freeCodeCamp tutorial and finish section !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// How to Make the On-screen Keyboard Generate Input

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

// how to add animation

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

