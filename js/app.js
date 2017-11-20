$(function() {

// List (array) that holds all of the cards:
let cardDeck = [
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


// FUNCTION to shuffle the list of cards (from http://stackoverflow.com/a/2450976)
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


// FUNCTION that sets the card deck (initially & when the user selects 'restart'):
function deckSetter() {
    const shuffledDeck = shuffle(cardDeck);
    $('.deck').empty();
    $('.deck').append(...shuffledDeck);
}


// FUNCTION CALL to set the initial card deck (since the index.html only contains blank cards initially):
deckSetter();


// FUNCTION that starts a count-up-timer:
let timerId;

function startTimer() {
    // The below code for a count-up-timer is from
    // https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
    var sec = 0;
    function pad(val) { 
        return val > 9 ? val : "0" + val;
    }
    // Store the setInterval function call's ID in a variable for later use in stopping the timer
    timerId = setInterval(function() {
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}


// FUNCTION that stops the count-up-timer:
function stopTimer() {
    clearInterval(timerId);
}

// FUNCTION to reset the game:
function gameReset() {
    // Reset the timer to zero:
    $('#minutes, #seconds').text('00');
    // Reset the card deck:
    deckSetter();
    // Reset the score panel:
    moveCount = 0;
    scoreUpdater();
    // Reset the game state:
    gameActive = false;
}

// EVENT LISTENER for the 'restart' being clicked:
$('.restart').click(function() {
    console.log('The "restart" button has been clicked.');
    stopTimer();
    gameReset();
});


// FUNCTION to display a card's symbol:
function cardDisplayer(card) {
    $(card).addClass('open show');
}


// FUNCTION to add a card to an array containing un-matched open cards:
const openCards = []; // can/should this be placed inside the openCardLister function? diagram it out...

function openCardLister(card) {
    openCards.push(card);
    // console.log(`This is the openCards array now: ${openCards}`);
}


// FUNCTION to display the winning message and get user input:
function winMessage(minutes, seconds, score) {
    const playAgain = confirm(`CONGRATULATIONS! YOU WON!
    Win time = ${minutes}:${seconds}    Star rating = ${score}
    Would you like to play again?`);
    if (playAgain) {
        gameReset();
    } else {
        // Set the game state to inactive/ended:
        gameActive = false;
        console.log(`The game has ended. The gameActive variable is set to: ${gameActive}.`);
    }
}

// FUNCTION to check for the winning condition:
function winChecker() {
    // For a win, all <li> elements with class "card" need to also have the class "match"
    const unmatchedCards = $('li.card:not(.match)').length;
    if (unmatchedCards === 0) {
        // Stop the timer:
        stopTimer();
        // Get the minutes & seconds values at win-time:
        const winTimeMin = $('#minutes').text();
        const winTimeSec = $('#seconds').text();
        console.log(`Time to win was ${winTimeMin} minutes, ${winTimeSec} seconds.`);
        // Get the star rating at win-time:
        const starRating = $('.stars >> i.fa-star').length;
        // TODO: display a message with the final score (put this functionality in another function that you call from this one)
        console.log('YOU WIN, YAAAY!');
        setTimeout(function(){
            winMessage(winTimeMin, winTimeSec, starRating);
        }, 1000);
    } else {
        console.log(`There are still ${unmatchedCards} unmatched cards left. Keep up the good work!`);
    }
}


// FUNCTION to display the updated moveCount & star rating to the page:
let moveCount = 0;

function scoreUpdater() {
    // FUNCTION to display the move count to the page:
    function displayMove() {
        $('.moves').text(`${moveCount}`);
    }
    // FUNCTION to remove stars:
    function starRemover() {
        $('.fa-star').last().toggleClass('fa-star fa-star-o');
    }
    // FUNCTION to add stars:
    function starAdder() {
        $('.stars >> i').attr('class', 'fa fa-star');
    }
    // Display the updated count & star rating in the score panel:
    switch (moveCount) {
        case 0: // This case is used when the restart button is clicked
            displayMove();
            $('.moves').siblings('span').text(' Moves');
            starAdder();
            break;
        case 1:
            displayMove();
            $('.moves').siblings('span').text(' Move');
            break;
        case 2:
            displayMove();
            $('.moves').siblings('span').text(' Moves');
            break;
        case 15:
        case 20:
        case 25:
            starRemover();
        default:
            displayMove();
    }
}


// Capture the game state in a variable and initialize it:
let gameActive = false;

// EVENT LISTENER for a card being clicked (only to be fired if the card is unmatched and has not already been opened):
$('.deck').on('click', '.card:not(.show)', function () {
    // console.log(`A card with this child element has been clicked: ${$(this).html()}.`);
    // Capture the game state as 'started' by setting the variable & start the timer by...
    if(!gameActive) {
        // Trigger the timer to start when the user clicks the very first card:
        startTimer();
        gameActive = true;
        console.log(`The game has begun! The game is active: ${gameActive}. The timer will start now.`);
    }
    cardDisplayer(this);
    openCardLister(this);
    // If the list of un-matched open cards has two cards, check to see if they match:
    if (openCards.length > 1) {
        // Increment the move count and update the score-panel display:
        moveCount++;
        scoreUpdater();
        // Get the symbol of card1 (which is stored in its child's class):
        const card1 = openCards[0];
        const card2 = openCards[1];
        const card1Symbol = $(card1).children().attr('class');
        console.log(`Card1's symbol is: ${card1Symbol}`);
        // Check whether card2 child has the same class as card1 child:
        const isMatch = $(card2).children().hasClass(card1Symbol);
        if(isMatch) {
            // Lock the cards in open position and change their color/style (create separate function for this to call here)
            // Empty the openCards array
            // (Before factoring the below out into a function, card1 and card2 will need to be placed in an outer scope)
            console.log('The cards match, yay!');
            $(card1).toggleClass('open match');
            $(card2).toggleClass('open match');
            openCards.splice(0);
            // Check for winning condition:
            winChecker();
        } else {
            // remove the cards from the openCards list and hide the card's symbol (create separate function for this to call here)
            // (Before factoring the below out into a function, card1 and card2 will need to be placed in an outer scope)
            console.log('The cards do not match, boohoo');
            $(card1).addClass('noMatch');
            $(card2).addClass('noMatch');
            setTimeout(function(){
                $(card1).toggleClass('open show noMatch');
                $(card2).toggleClass('open show noMatch');
            }, 1000); // standard format for ease of reading?
            openCards.splice(0);
        }
    } else {
        console.log (`There is currently only ${openCards.length} unmatched card open.`);
    }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
});