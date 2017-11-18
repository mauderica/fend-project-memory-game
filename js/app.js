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


// FUNCTION count-up-timer (from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript)
// TODO: trigger the timer to start when the user clicks the very first card
/*
var sec = 0;
function pad(val) { 
    return val > 9 ? val : "0" + val;
}
const timer = setInterval(function() {
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
}, 1000);
*/


// EVENT LISTENER for the 'restart' being clicked:
$('.restart').click(function() {
    console.log('The "restart" button has been clicked.');
    deckSetter();
    moveCount = 0;
    scoreUpdater();
});


// FUNCTION to display a card's symbol:
function cardDisplayer(card) {
    $(card).addClass('open show');
}


// FUNCTION to add a card to an array containing un-matched open cards:
const openCards = []; // can/should this be placed inside the openCardLister function? diagram it out...

function openCardLister(card) {
    openCards.push(card);
    console.log(`This is the openCards array now: ${openCards}`);
}


// FUNCTION to check for the winning condition:
function winChecker() {
    // For a win, all <li> elements with class "card" need to also have the class "match"
    const winCheck = $('li.card:not(.match)').length;
    if (winCheck === 0) {
        // display a message with the final score (put this functionality in another function that you call from this one)
        console.log('YOU WIN, YAAAY!');
        // Stop the timer and get the minutes & seconds values at win-time:
        // clearInterval(timer);
        let winTime = $('.timer').text();
        console.log(`Time to win was ${winTime}.`);
    } else {
        console.log(`There are still ${winCheck} unmatched cards left. Keep up the good work!`);
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
        case 10:
        case 15:
        case 20:
            starRemover();
        default:
            displayMove();
    }
}


// EVENT LISTENER for a card being clicked (only to be fired if the card is unmatched and has not already been opened):
$('.deck').on('click', '.card:not(.show)', function () {
    console.log(`A card with this child element has been clicked: ${$(this).html()}.`);
    cardDisplayer(this);
    openCardLister(this);
    // If the list of un-matched open cards already has another card, check to see if the two cards match:
    if (openCards.length > 1) {
        const card1 = openCards[0];
        const card2 = openCards[1];
        // Get the symbol of card1 (which is stored in its child's class):
        const card1Symbol = $(card1).children().attr('class');
        console.log(`Card1's symbol is: ${card1Symbol}`);
        // Check whether card2 child has the same class as card1 child:
        const isMatch = $(card2).children().hasClass(card1Symbol);
        if(isMatch) {
            // Lock the cards in open position and change their color/style (create separate function for this to call here)
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
            openCards.splice(0);
            $(card1).addClass('noMatch');
            $(card2).addClass('noMatch');
            window.setTimeout(function(){
                $(card1).toggleClass('open show noMatch');
                $(card2).toggleClass('open show noMatch');
            }, 1000); // standard format for ease of reading?
        }
        // Increment the move count and display it on the page:
        moveCount++;
        scoreUpdater();
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