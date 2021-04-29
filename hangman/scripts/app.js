const puzzleEl = document.querySelector("#puzzle");
const guessesEl = document.querySelector("#guesses");
const defs = document.querySelector("#translation");
const loader = document.querySelector("#loading");
let game1;
function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
function hideLoading() {
  loader.classList.remove("display");
}
window.addEventListener("keypress", (e) => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  render();
});

const render = () => {
  puzzleEl.innerHTML = "";
  guessesEl.textContent = game1.statusMessage;

  game1.puzzle.split("").forEach((letter) => {
    letterEl = document.createElement("span");
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

const startGame = async () => {
  displayLoading();
  defs.textContent = "";
  const puzzle = await getPuzzle("2");

  const puzzleWords = puzzle.split(" ");

  for (let i = 0; i < puzzleWords.length; i++) {
    const response = await getDefinition(puzzleWords[i]);
    if (response?.code === 500) {
      let defTemp = document.createElement("i");
      defTemp.textContent = `${i + 1}. Error getting the definition for the ${
        i === 0 ? "first" : "second"
      } word`;
      defs.appendChild(defTemp);
    } else {
      let defTemp = document.createElement("p");
      defTemp.textContent = `${i + 1}. ${
        response.type === "oxford"
          ? response.data.result[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0]
          : response.result.data[0].meanings[0].definitions[0].definition
      }`;
      defs.appendChild(defTemp);
    }
  }
  hideLoading();
  game1 = new Hangman(puzzle, 9);
  render();
};
const button = document.querySelector("#reset");
button.addEventListener("click", startGame);

startGame();

// getPuzzle('2').then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log(`Error: ${err}`)
// })

// const countryCode = 'UZ'

// getCountry(countryCode).then((country) => {
//     console.log(country.name)
// }).catch((err) => {
//     console.log(`Errorrr: ${err}`)
// })

// getLocation().then((data) => {
//     return getCountry(data.country)
// }).then((deets) => {
//     console.log(deets.name)
// }).catch((err) => {
//     console.log(`Error in promise: ${err}`)
// })
