
let maxmiss = 7;
let mistakes = 0; 
var html = '';
var c;
let aux, letter_to_guess, fields, level, countguessedletters = 1
let animals =["PISICA", "CAINE", "MAIMUTA", "GAINA", "PORC", "ELEFANT", "GIRAFA"]
let cars = ["BMW", "AUDI", "VOLKSWAGEN", "MERCEDES", "FORD", "MAZDA", "JEEP", "SUZUKI", "SEAT"]
let progr = ["JAVA", "JAVASCRIPT", "SQL", "PHP", "GO", "KOTLIN", "PYTHON", "RUBY", "MATLAB"]

function startGame() {
  document.getElementById("start").innerHTML += `
  <center>
    <br>
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-success" onclick="setLevel(1)">Cars</button>
      <button type="button" class="btn btn-outline-warning" onclick="setLevel(2)">Animals</button>
      <button type="button" class="btn btn-outline-danger" onclick="setLevel(3)">Progr.Language</button>
    </div>
  </center>
  `;
}

function setLevel(x) {
  level = x;
  console.log(level);
  if(level == 1) {
    aux = cars
  } else if (level == 2) {
    aux = animals
  } else {
    aux = progr
  }
  document.getElementById("start").innerHTML = ""
  gameScreen()
}

function gameScreen() {
  let j = Math.floor(Math.random() * aux.length)
  for (var i = 65; 90 >= i; i++) {// A-65, Z-90
    c = String.fromCharCode(i);
    html += '<button type="button" class="btn btn-outline-primary" onclick="setLetter(\'' + c + '\')">' + c + '</button>';
  }
  document.getElementById('keyboard').innerHTML = html;
  document.getElementById("score").innerHTML = "Mistakes: " + mistakes + " / " + maxmiss
  letter_to_guess = aux[j].split("")
  fields = aux[j].split("")
  for(let k = 0; k < letter_to_guess.length; ++k) {
    fields[k] = "_"
  }
  document.getElementById("word").innerHTML = fields
}

function setLetter(letter) {
  document.getElementById('showletter').innerHTML += letter + " ";
  ceckLetter(letter)
  ceckWin()
}

function ceckWin() {
  countguessedletters = 0
  for(let i = 0; i < letter_to_guess.length; ++i) {
    if(fields[i] == "_") {
      ++countguessedletters
    } 
  }
  if(countguessedletters == 0) {
    document.getElementById("keyboard").innerHTML = "✔️You won the game!✔️"
    document.getElementById("showletter").innerHTML = '<button type="button" class="btn btn-outline-primary" onclick="window.location.reload();">Reset</button>'
    document.getElementById("img").innerHTML = '<img src="8.png" class="rounded float-start" alt="8.png">';
  }
}

function ceckLetter(x) {
  let flag = 0
  for(let i = 0; i < letter_to_guess.length; ++i) {
    if (letter_to_guess[i] == x) {
      fields[i] = x
      flag = 1  
    }  
    document.getElementById("word").innerHTML = fields
  }
  if(flag == 0) {
    ++mistakes;
    document.getElementById("score").innerHTML = "Mistaks: " + mistakes + " / " + maxmiss
    document.getElementById("img").innerHTML = '<img src="' + mistakes + '.jpg" class="rounded float-start" alt="' + mistakes +'.jpg">';
  }
  if(mistakes == 7) {
    document.getElementById("keyboard").innerHTML = "‼️Game Over🤦🏾‍♂️‼️"
    document.getElementById("showletter").innerHTML = '<button type="button" class="btn btn-outline-primary" onclick="window.location.reload();">Reset</button>'
  }
}
