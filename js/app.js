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
    console.log(`This is the openCards array: ${openCards}`);
}

// EVENT LISTENER for a card being clicked:
$('.deck').on('click', '.card', function () {
    console.log(`A card with this child element has been clicked: ${$(this).html()}.`);
    cardDisplayer(this);
    openCardLister(this);
    // If the list of un-matched open cards already has another card, check to see if the two cards match:
    if (openCards.length > 1) {
        const card1 = $(openCards[0]).children();
        const card2 = $(openCards[1]).children();
        // Get the symbol of card1 (which is stored in its child's class):
        const card1Symbol = $(card1).attr('class');
        console.log(`Card1's symbol is: ${card1Symbol}`);
        // Check whether card2 has the same class as card1:
        const isMatch = $(card2).hasClass(card1Symbol);
        if(isMatch) {
            // lock the cards in open position and change their color/style (create separate function for this to call here)
            console.log('The cards match, yay!');
        } else {
            // remove the cards from the openCards list and hide the card's symbol (create separate function for this to call here)
            console.log('The cards do not match, boohoo');
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