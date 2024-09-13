// Variables iniciales
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 1;
const maxAttempts = 10;
let previousGuesses = [];
let resultsTable = [1][5];

// Elementos de la interfaz
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submitGuess');
const feedback = document.getElementById('feedback');
const remaining = document.getElementById('remaining');
const previousGuessesDisplay = document.getElementById('previousGuesses');
const restartButton = document.getElementById('restart');
const results = document.getElementById('results-container');

// Función para verificar el número ingresado
function checkGuess() {
  const guess = Number(guessInput.value);
  
  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = 'Por favor, ingresa un número válido entre 1 y 100.';
    return;
  }

  previousGuesses.push(guess);
  previousGuessesDisplay.textContent = previousGuesses.join(', ');

  if (guess === randomNumber) {
    feedback.textContent = '¡Felicidades! Adivinaste el número correcto.';
    endGame();
  } else if (attempts < maxAttempts) {
    feedback.textContent = guess < randomNumber ? 'El número es mayor.' : 'El número es menor.';
    attempts++;
    remaining.textContent = maxAttempts - attempts + 1;
  } else {
    feedback.textContent = `Has agotado tus intentos. El número correcto era ${randomNumber}.`;
    endGame();
  }

  guessInput.value = '';
}

function tableResults() {
  const guess = Number(guessInput.value);
  let alternNumber = 0;

  if(checkGuess === endGame && guess === randomNumber) {
    for(let i=0; i<1; i++) {
      for(let j=0; j<5; j++) {
        /*1.cuando no hay ningún valor en la tabla
        2. cuando ya existen valores y se comparan entre estos*/
        if(resultsTable[1][1] === null) {
          resultsTable[1][1] = guess;
        } else if (guess > resultsTable[i][j]) {
          resultsTable[i][j] = alternNumber;
          resultsTable[i][j] = guess;
          resultsTable[i][j++] = alternNumber;
        }

      }
    }
  }
}

// Función para finalizar el juego
function endGame() {
  guessInput.disabled = true;
  submitButton.disabled = true;
  restartButton.style.display = 'block';
}

// Función para reiniciar el juego
function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 1;
  previousGuesses = [];
  guessInput.disabled = false;
  submitButton.disabled = false;
  feedback.textContent = '';
  remaining.textContent = maxAttempts;
  previousGuessesDisplay.textContent = '';
  guessInput.value = '';
  restartButton.style.display = 'none';
}

// Eventos
submitButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', restartGame);
