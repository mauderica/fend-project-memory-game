$(function() {
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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
    } else {
        console.log(`There are still ${winCheck} unmatched cards left. Keep up the good work!`);
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
        // Increment the move counter and display it on the page (create separate function for this to call here)
        // ...
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