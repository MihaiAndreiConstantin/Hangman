let randomNr, words, wordToGuess, pickedWord, mistakes = 0, maxMistakes = 7, letterExist, lettersGuessed = 0
let cars = ["BMW", "AUDI", "VOLKSWAGEN", "MERCEDES", "FORD", "MAZDA", "JEEP", "SUZUKI", "SEAT"]
let animals = ["PISICA", "CAINE", "MAIMUTA", "GAINA", "PORC", "ELEFANT", "GIRAFA"]
let programingLanguages = ["JAVA", "JAVASCRIPT", "SQL", "PHP", "GO", "KOTLIN", "PYTHON", "RUBY", "MATLAB"]

function generateLevelButtons() {
    document.getElementById("level-start-buttons").innerHTML = 
`<center>
    <br>
    <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button type="button" class="btn btn-outline-success" onclick="setCategoryWord(1)">Cars</button>
        <button type="button" class="btn btn-outline-warning" onclick="setCategoryWord(2)">Animals</button>
        <button type="button" class="btn btn-outline-danger" onclick="setCategoryWord(3)">Programing Language</button>
    </div>
</center>`;
}

function setCategoryWord(x) {
    if(x == 1) {
        words = cars
    } else if (x == 2) {
        words = animals
    } else {
        words = programingLanguages
    }
    randomNumber()
    playngField()
}

function randomNumber() {
    randomNr = Math.floor(Math.random() * words.length)
}

function setWordToGuess() {
    pickedWord = words[randomNr].split("")
    wordToGuess = words[randomNr].split("")
    for (let i = 0; i < pickedWord.length; ++i) {
        wordToGuess[i] = "_" 
    }
    document.getElementById("word").innerHTML = wordToGuess
}
    
function score() {
    document.getElementById("score").innerHTML = "Mistakes: " + mistakes + " / " + maxMistakes
}

function generateLettersKeys() {
    for (let i = 65; i <= 90; ++i) {// A-65, Z-90
        let key = String.fromCharCode(i);
        document.getElementById("keys").innerHTML += '<button type="button" class="btn btn-outline-primary" onclick="chekLetter((\'' + key + '\'))">' + key + '</button>';
    }
}

function chekLetter(letter) {
    letterExist = false
    lettersGuessed = wordToGuess.length
    for (let i = 0; i < wordToGuess.length; ++i) {
        if (pickedWord[i] == letter) {
            wordToGuess[i] = letter
            letterExist = true
            updateWordToGuess()
        }
        if (wordToGuess[i] == "_") {
            --lettersGuessed;
        }
    }
    if (letterExist == false) {
        ++mistakes
        score()
        nextImage()
    }
    gameStatus()
}

function nextImage() {
    document.getElementById("img").innerHTML = '<img src="' + mistakes + '.jpg" class="rounded float-start" alt="' + mistakes +'.jpg">'
}

function updateWordToGuess() {
    document.getElementById("word").innerHTML = wordToGuess
}

function gameOver() {
    document.getElementById("img").innerHTML = '<img src="7.jpg" class="rounded float-start" alt="7.jpg">'
    document.getElementById("keys").innerHTML = "You are Dead!, press Reset for restarting the game, Good Luck next time!"
    document.getElementById("level-start-buttons").innerHTML = '<button type="button" class="btn btn-outline-primary" onclick="window.location.reload();">Reset</button>'
}

function winGame() {
    document.getElementById("img").innerHTML = '<img src="8.png" class="rounded float-start" alt="8.png">'
    document.getElementById("keys").innerHTML = "Good work, you won the game! Congratulations!"
    document.getElementById("level-start-buttons").innerHTML = '<button type="button" class="btn btn-outline-primary" onclick="window.location.reload();">Reset</button>'
}

function gameStatus() {
    if (mistakes == maxMistakes) {
        gameOver()
    } else if (lettersGuessed == wordToGuess.length) {
        winGame()
    }
}

function playngField() {
    setWordToGuess()
    score()
    generateLettersKeys()
    document.getElementById("level-start-buttons").innerHTML = ""
}