//all quotes
const quotes = [
    'I am a fighter! Give me the strength for the fight and the heart to keeping fighting.',
    'There is nothing more deceptive than an obvious fact.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.'
];


//storing list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// starting time
let startTime = Date.now();

//page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


// start button
const start = document.getElementById('start');

start.addEventListener('click', () => {

    // get a quote; randomly
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    
    // Put the quote into an array of words
    words = quote.split(' ');
    
    // reset the word index for tracking
    wordIndex = 0;
    
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});

    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    
    // Clear any prior messages
    messageElement.innerText = '';
    
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    
    // set focus
    typedValueElement.focus();
    
    // set the event handler
    // Start the timer
    startTime = new Date().getTime();
});