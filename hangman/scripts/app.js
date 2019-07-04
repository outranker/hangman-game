const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game1

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () => {
     puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 9)
    render()
}
const button = document.querySelector('#reset')
button.addEventListener('click', startGame)

startGame()

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
