# Memory Game Project

## To-Do Later
* Bootstrap JS modal (with nice styling) instead of confirm popup.
* Use stored game statistics to display a player's record scores, etc.
* Make page responsive such that layout, text size, and card size change depending on the user's screen size for optimal UX.
* Additional custom styling (save for last).
    * Achieve a nice, slower card-flipping effect.
    * Hover effect (CSS) over cards. -- in progress
    * Special effect for matched cards.
    * Special effect for un-matched cards. -- in progress
    * Change style for removed star & add an effect for the removal.
    * Monospace font for the timer (so that it doesn't jump around).


## To-Do List
* ...

## Done

* Review and understand project starter documentation. -- done
* Ensure HTML has all necessary information in `<head>`. -- done
* Add `<script>` for jQuery. -- done
* Add section comments to HTML for ease of reading. -- done
* Functionality to handle clicks & revealing the hidden side of a card. -- done
* Matching logic & what happens in each case (incorrect vs. correct match). -- done
    * Locking the matched cards so that they can no longer be clicked nor trigger the click event listener. -- done
    * Preventing the event listener from firing on an already opened card. -- done
* Incrementing of move counter & adding it to the page. -- done
    * Star rating -- done
* Shuffle functionality -- done
* Timer: When the player starts a game, a displayed timer should also start. Timer stops once game is won. -- done
* Restart button: resets the game board (done), the timer (done), the game state (done), the star rating (done), and the move counter (done) -- done
* Winning condition & what happens when it is achieved. -- in progress
    * Congratulations Popup: -- in progress
        * When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. (Delay popup & ensure last 2 cards are flipped). -- done
        * It should also tell the user how much time it took to win the game, and what the star rating was. (separate the minutes from seconds) -- done
* Development strategy: plan project and break it down into smaller pieces. -- ongoing
* Refactoring -- done
* Pulling variables out of function scopes where appropriate, to avoid re-querying the DOM each time the function is run. -- done
* Verify correct choice of variable declaration keyword use (let vs const). -- done
* Review previous project list & project review for additional items. -- done
* If chose to hardcode an initial deck of cards, explain why. If not, add an initializer function in JS. -- done
* Add necessary comments to describe and document code. -- done
* Break-up long comments into multi-line comments. -- done
* Save game statistics for later use in a scoreboard & keeping track of personal records -- done
* Review project rubric for additional items. -- done

