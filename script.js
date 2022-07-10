const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const lengthcal = RANDOM_QUOTE_API_URL;
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const wpm = document.getElementById('wpm')
quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((spanforchracter, index) => {
    const character = arrayValue[index]
    if (character == null) {
      spanforchracter.classList.remove('correct')
      spanforchracter.classList.remove('incorrect')
      correct = false
    } else if (character === spanforchracter.innerText) {
      spanforchracter.classList.add('correct')
      spanforchracter.classList.remove('incorrect')
    } else {
      spanforchracter.classList.remove('correct')
      spanforchracter.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) {

    wpm.innerText = ('wpm=' + wpmcal())

    renderNewQuote()
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

function countWords(lengthcal) {
  const arr = lengthcal.split(' ');

  return arr.filter(word => word !== '').length;
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const spanforchracter = document.createElement('span')
    spanforchracter.innerText = character
    quoteDisplayElement.appendChild(spanforchracter)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
function wpmcal() {
  return (getTimerTime() / countWords(lengthcal))
}
renderNewQuote()
