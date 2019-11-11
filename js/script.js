/**
 * Treehouse FSJS Techdegree:
 * project 1 - A Random Quote Generator
 *
 * For assistance:
 *  Check the "Project Resources" section of the project instructions
 *  Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat
 */

// ----------------------------------------------------------------------------
// Global Variables
// ----------------------------------------------------------------------------

// Create references to all primary elements on the page.
const elements = {
  btn: document.querySelector('#load-quote'),
  quote: document.querySelector('.quote'),
  source: document.querySelector('.source'),
};

// Quotes array
const quotes = [
  {
    quote: 'Happiness is not something you postpone for the future; it is something you design for the present.',
    source: 'Tim Roth',
    citation: '',
    year: null,
  },
  {
    quote: 'I hated every minute of training, but I said, Don\'t quit. Suffer now and live the rest of your life as a champion.',
    source: 'Muhammad Ali',
    citation: '',
    year: null,
  },
  {
    quote: 'Start by doing what\'s necessary; then do what\'s possible; and suddenly you are doing the impossible.',
    source: 'Francis of Assisi',
    citation: '',
    year: null,
  },
  {
    quote: 'Put your heart, mind, and soul into even your smallest acts. This is the secret of success.',
    source: 'Swami Sivananda',
    citation: '',
    year: 1887,
  },
  {
    quote: 'No act of kindness, no matter how small, is ever wasted.',
    source: 'Aesop',
    citation: '',
    year: null,
  },
  {
    quote: 'Try to be a rainbow in someone\'s cloud.',
    source: 'Maya Angelou',
    citation: '',
    year: null,
  },
  {
    quote: 'You must do the things you think you cannot do.',
    source: 'Eleanor Roosevelt',
    citation: 'Speech',
    year: 1960,
  },
  {
    quote: 'Well I\'ve said it before and I\'ll say it again — America\'s best days are yet to come. Our proudest moments are yet to be. Our most glorious achievements are just ahead.',
    source: 'Ronald Reagan',
    citation: 'Speech',
    year: 1992,
  },
  {
    quote: 'There is nothing impossible to him who will try.',
    source: 'Alexander the Great',
    citation: '',
    year: null,
  },
];

// Color palette which ranomily loads a background color of the quote.
const colors = [
  '#044141',
  '#09696D',
  '#13979D',
  '#48B0B3',
  '#F5B755',
  '#E4913F',
];

// Timer to manage when adding ability to automatically change quotes out.
let timer = null;
const timerDuration = 6000;

// Variable to keep record of the last quote loaded.
// Prevents consecutive loads of same quote.
let previousQuoteIndex = null;

// Variable to keep record of the last color used.
// Prevents consecutive use of the same color.
let previousColorIndex = null;

// Randomize Quote Selection
const getRandomQuote = function() {
  const randomIndex = getRandomIndex(previousQuoteIndex, quotes.length);
  previousQuoteIndex = randomIndex;
  return quotes[randomIndex];
};

const getRandomColor = function() {
  const randomIndex = getRandomIndex(previousColorIndex, colors.length);
  previousColorIndex = randomIndex;
  return colors[randomIndex];
}

// Return a random array index that is capped by the max argument passed.
const getRandomIndex = function(currentIndex, max) {
  let index = null;
  do {
    index = Math.floor(Math.random() * max);
  } while (index === currentIndex);

  // Return the new random index
  return index;
};

// Update Quote Display
const printQuote = function() {
  const randomQuote = getRandomQuote();
  const randomColor = getRandomColor();

  // Cancel any running timeouts that had been set.
  // Used to stop timeout after a user click event.
  window.clearTimeout(timer);

  // Quote Source
  elements.quote.textContent = randomQuote.quote;
  elements.source.textContent = randomQuote.source ? randomQuote.source : 'anonymous';

  // Quote Citation
  if (randomQuote.citation) {
    const citation = document.createElement('span');
    citation.classList.add('citation');
    citation.textContent = randomQuote.citation;
    elements.source.append(citation);
  }

  // Quote Year
  if (randomQuote.year) {
    const year = document.createElement('span');
    year.classList.add('year');
    year.textContent = randomQuote.year;
    elements.source.append(year);
  }

  // Alter the body background color to our randomized choice.
  document.body.style.backgroundColor = randomColor;

  // Automatically change this quote out after the `timerDuration` expires.
  timer = window.setTimeout(printQuote, timerDuration);
};

// Initialize application
if (elements.quote && elements.source && elements.btn) {
  // Change quote out when btn is pressed.
  elements.btn.addEventListener('click', printQuote, false);

  // Load the first quote.
  printQuote();
}
