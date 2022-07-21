const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new__quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]; to get local quote

    // to display random value from api to our design using #ID

    // check if author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unkown';
    } else {
        authorText.textContent = quote.author;
    }

    // check Quote Length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long__quote');
    } else {
        quoteText.classList.remove('long__quote');

    }

    // Set Quote, Hide loader


    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes () {

    loading();

    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}


// Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
// newQuote();
getQuotes ();

  
 