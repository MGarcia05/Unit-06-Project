// base variables

const qwerty = document.querySelector("#qwerty");
const phrase = document.getElementById("phrase");
const ulPhrase = phrase.querySelector("ul");
let missed = 0;
const scoreboard = document.getElementById("scoreboard");



// phrases array with 5 MCU quotes because why not?

const phrases = [
  "On Your Left",
  "I Am Iron Man",
  "I Am Groot",
  "We Have A Hulk",
  "I Can Do This All Day",
];


// removes overlay

const overlay = document.querySelector("#overlay");
overlay.addEventListener("click", (e) => {
  if (e.target.className === "btn__reset") {
    const resetButton = e.target;
    if (resetButton.className === "btn__reset") overlay.style.display = "none";
    if (resetButton.textContent.includes("again")) {
      resetGame();
    }
  }
});



// resets the game

function resetGame() {
  overlay.style.display = "none";
  ulPhrase.style.display = "";
  missed = 0;
  const phraseArray = getRandomPhraseAsArray(phrases);
  const ul = phrase.firstElementChild;
  ul.innerHTML = "";
  addPhraseToDisplay(phraseArray);
  overlay.removeChild(document.querySelector("h2:last-of-type"));
  const resetHearts = () => {
    const Hearts = scoreboard.querySelectorAll('img[src *= "lostHeart"]');
    for (eachHeart of Hearts) {
      eachHeart.src = eachHeart.src.replace("lostHeart", "liveHeart");
    }
  };
  const resetKeyboard = () => {
    const Keys = qwerty.querySelectorAll(".chosen");
    for (eachKey of Keys) {
      eachKey.className = "";
      eachKey.disabled = "";
    }
  };
  resetHearts();
  resetKeyboard();
}


// returns random phrase

function getRandomPhraseAsArray(arr) {
  const randomNb = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[randomNb].split("");
  return randomPhrase;
}


// adds the letters of a string to the display

function addPhraseToDisplay(arrayPhrase) {
  for (each of arrayPhrase) {
    let li = document.createElement("li");
    li.textContent = each;
    if (each !== " ") li.className = "letter";
    else li.className = "space";
    ulPhrase.appendChild(li);
  }
}

// checks if a letter is in the phrase

function checkLetter(button) {
  const phraseList = ulPhrase.children;
  let letter = null;
  for (eachLi of phraseList) {
    if (button.textContent.toLowerCase() === eachLi.textContent.toLowerCase()) {
      eachLi.className += " show";
      letter = button.textContent;
    }
  }
  return letter;
}


// lost heart function </3

function lostOneHeart() {
  const lostHeart = scoreboard.querySelector('img[src *= "liveHeart"]');
  lostHeart.src = lostHeart.src.replace("liveHeart", "lostHeart");
}


// checks if the game has been won or lost + buttons + "Play again" or "Try again" messages

function checkWin() {
  const letters = phrase.querySelectorAll(".letter");
  const guessedLetters = phrase.querySelectorAll(".show");
  if (letters.length === guessedLetters.length) return true;
  else return false;
}

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    function overlayMessage(state) {
      function userMessage(message) {
        const userMes = document.createElement("h2");
        userMes.textContent = message;
        overlay.insertBefore(userMes, overlay.lastElementChild.nextSibling);
      }
      overlay.className = state;
      ulPhrase.style.display = "none";
      if (state === "win")
        overlay.querySelector(".btn__reset").textContent = "Play again";
      else if (state === "lose")
        overlay.querySelector(".btn__reset").textContent = "Try again";
      overlay.style.display = "";
      userMessage(`You ${state}!`);
    }
    button = e.target;
    const letterFound = checkLetter(button);
    if (!letterFound) {
      missed++;
      lostOneHeart();
      button.className += " wrong";
    }
    button.className += " chosen";
    button.disabled = "true";
    if (checkWin()) {
      overlayMessage("win");
    } else if (missed === 5) {
      overlayMessage("lose");
    }
  }
});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
