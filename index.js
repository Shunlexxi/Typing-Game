// array of quotes
const quotes = [
	'I am a fighter! Give me the strength for the fight and the heart to keep fighting.',
	'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
	'There is nothing more deceptive than an obvious fact.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'I never make exceptions. An exception disproves the rule.',
	'What one man can invent another can discover.',
	'Nothing clears up a case so much as stating it to another person.',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
	'Not making a decision is a big damn decision.'
];

// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// default value for startTime (will be set on start)
let startTime = Date.now();

// grab UI items
const quoteElement = document.getElementById('quote');
const typedValueElement = document.getElementById('typed-value');
let popUp = document.getElementById('popup');
const exit = document.getElementById('exit');
const score = document.getElementById('score');

// Closes modal When the user clicks X
exit.onclick = function close(){
	popUp.style.display = "none";
}

//TODO
// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(e) {
// 	if (e.target == popUp) {
// 	  popUp.style.display = "none";
// 	  console.log('close popup?')
// 	}
//   }

// Start event
document.getElementById('start').addEventListener('click', function () {
	// get a quote
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

	// Clear the textbox
	typedValueElement.value = '';
	// Enabling typedValueElement
	typedValueElement.disabled = false;
	// set focus
	typedValueElement.focus();

	// Start the timer
	startTime = new Date().getTime();
});

// input 
typedValueElement.addEventListener('input', (e) => {
	// Get the current word
	const currentWord = words[wordIndex];
	// get the current value
	const typedValue = typedValueElement.value;

	//if word is correct & it is the last in sentence 
	if (typedValue === currentWord && wordIndex === words.length - 1) {
		// end of quote
		// Display success
		const elapsedTime = new Date().getTime() - startTime;
		const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
		
		//removing focus and blurring typeValueElement
		typedValueElement.blur();
		typedValueElement.disabled = true;
		
		// saving score
		score.innerText = message;
		
		//displaying popUp (score)
		popUp.style.display = "block";	
	}
	
	// if word is correct but not last word in sentence 
	else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// end of word
		// clear the typedValueElement for the new word
		typedValueElement.value = '';
		// move to the next word
		wordIndex++;
		// reset the class name for all elements in quote
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		// highlight the new word
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} 

	// if currently correct
	else if (currentWord.startsWith(typedValue)) {
		// highlight the next word
		typedValueElement.className = '';
	} 
	
	// else - incorrect word
	else {
		// error state
		typedValueElement.className = 'error';
	}
});
