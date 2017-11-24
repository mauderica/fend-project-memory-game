$(function() {

// List (array) that holds all of the cards
const cardDeck = [
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>'
];


// Shuffle the list of cards (from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// Set the card deck
const $deck = $('.deck');

function deckSetter() {
    const shuffledDeck = shuffle(cardDeck);
    $deck.empty();
    $deck.append(...shuffledDeck);
}


// Set the initial card deck upon page load
deckSetter();
/* Note: The index.html contains a set of blank cards initially, so that the user sees
a card deck when opening the page, even if the JavaScript were to take time to load
and initialize the deck of cards with symbols. */


// Start the count-up-timer
let timerId;
const $seconds = $('#seconds');
const $minutes = $('#minutes');

function startTimer() {
    // The below code for a count-up-timer is from:
    // https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
    var sec = 0;
    function pad(val) { 
        return val > 9 ? val : "0" + val;
    }
    // Store the setInterval function call's ID in a variable
    // for later use in stopping the timer
    timerId = setInterval(function() {
        $seconds.html(pad(++sec%60));
        $minutes.html(pad(parseInt(sec/60,10)));
    }, 1000);
}


// Stop the timer
function stopTimer() {
    clearInterval(timerId);
}


// Reset the timer to zero
function resetTimer(...times) {
    for (const $time of times) {
        $time.text('00');
    }
}


// Reset the game
function gameReset() {
    // Reset the timer to zero:
    resetTimer($seconds, $minutes);
    // Reset the card deck:
    deckSetter();
    // Reset the score panel:
    moveCount = 0
    scoreUpdater(moveCount);
    // Reset the game state:
    gameActive = false;
}


// Upon the restart 'button' being clicked, reset the game
$('.restart').click(function() {
    stopTimer();
    gameReset();
});


// Display the winning message and get user input for replay
function winMessage(minutes, seconds, score) {
    const playAgain = confirm(`CONGRATULATIONS! YOU WON!
    Win time = ${minutes}:${seconds}    Star rating = ${score}
    Would you like to play again?`);
    if (playAgain) {
        gameReset();
    } else {
        // Set the game state to inactive/ended:
        gameActive = false;
    }
}


// Check for the winning condition
function winChecker() {
    // Determine if there are any cards left without the class "match"
    const unmatchedCards = $('li.card:not(.match)').length;
    if (unmatchedCards === 0) {
        stopTimer();
        // Get the minutes & seconds values at win-time:
        const winTimeMin = $minutes.text();
        const winTimeSec = $seconds.text();
        // Get the star rating at win-time:
        const starRating = $('.stars >> i.fa-star').length;
        // Display the congratulations popup with final score
        setTimeout(function(){
            winMessage(winTimeMin, winTimeSec, starRating);
        }, 1000);
    } else {
        console.log(`There are still ${unmatchedCards} unmatched cards left. Keep up the good work!`);
    }
}


// Display the updated move count & star rating to the page
let moveCount = 0;
const $moveNum = $('.moves');
const $moveWord = $moveNum.siblings('span');

function scoreUpdater(_moveCount) {
    // Display the move count to the page
    function displayMove() {
        $moveNum.text(_moveCount);
    }
    // Remove a star from the page
    function starRemover() {
        $('.fa-star').last().toggleClass('fa-star fa-star-o');
    }
    // Add stars to the page
    function starAdder() {
        $('.stars >> i').attr('class', 'fa fa-star');
    }
    
    switch (_moveCount) {
        case 0: // This case is used when the restart button is clicked
            displayMove();
            // Set the word 'move' to plural
            $moveWord.text(' Moves');
            starAdder();
            break;
        case 1:
            displayMove();
            // Set the word 'move' to singular
            $moveWord.text(' Move');
            break;
        case 2:
            displayMove();
            // Set the word 'move' to plural
            $moveWord.text(' Moves');
            break;
        // At 15, 20, and 25 moves - remove one star
        case 15:
        case 20:
        case 25:
            starRemover();
        default:
            displayMove();
    }
}


// Show the cards as "not matching" then hide their symbols
function noMatch(...cards) {
    for (const card of cards) {
        $(card).addClass('noMatch');
        setTimeout(function(){
            $(card).toggleClass('open show noMatch');
        }, 1000);
    }
}


// Lock the matched cards in open position
function cardMatcher(...cards) {
    for (const card of cards) {
        $(card).toggleClass('open match');
    }
}


// Empty an array
function emptyArray(array) {
    array.splice(0);
}


// Check if two cards match
function matchChecker(_card1, _card2) {
    // Get the symbol of card1
    const card1Symbol = $(_card1).children().attr('class');
    // Check whether card2 has the same symbol as card1
    const isMatch = $(_card2).children().hasClass(card1Symbol);
    if(isMatch) {
        // Lock the matched cards
        cardMatcher(_card1, _card2);
        // Empty the array containing un-matched open cards
        emptyArray(openCards);
        // Check for winning condition
        winChecker();
    } else {
        // Show the cards as "not matching" then hide their symbols
        noMatch(_card1, _card2);
        // Empty the array containing un-matched open cards
        emptyArray(openCards);
    }
}


// Display a card's symbol
function cardDisplayer(card) {
    $(card).addClass('open show');
}


// Add card to an array containing un-matched open cards
const openCards = [];

function openCardLister(card) {
    openCards.push(card);
}


// Store the game state in a variable and initialize it:
let gameActive = false;


// Upon a card being clicked, display it and check for a match
// Note: only to be fired if the card is unmatched and unopened
$deck.on('click', '.card:not(.show)', function () {
    if(!gameActive) {
        // Trigger the timer to start when the user clicks the very first card
        startTimer();
        // Set the game state to 'active'
        gameActive = true;
    }
    cardDisplayer(this);
    openCardLister(this);
    // If the list of un-matched open cards has two cards...
    if (openCards.length > 1) {
        // Increment the move count and update the score-panel display
        scoreUpdater(++moveCount);
        // Check if the two open cards match
        const card1 = openCards[0];
        const card2 = openCards[1];
        matchChecker(card1, card2);
    }
});

});