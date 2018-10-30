//define global variables for JS

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var alreadyGuessed = "";
var currentWord = "";
var placeholderArray = [];

//keep the JS from running before the HTML has rendered

$(document).ready(function() {

    //create array of words to be guessed

    var words = ["saints", "eagles", "chargers", "patriots", "cardinals", "texans", "dolphins", "packers", "broncos", "seahawks"];

    //----
    //----

    //start game function: set variables to zero and randomly select word from array

    function startGame() {
        alreadyGuessed= "";
        placeholderArray = [];
        guessesRemaining = 15;
        currentWord = words[Math.floor(words.length * Math.random())];
        console.log(currentWord);
        for (let i = 0; i < currentWord.length; i++) {
            placeholderArray.push("_ ");                
        }
    }

    //call start game function

    startGame();

    //initialize onkeyup function
    //program listens for key to be pressed

    document.onkeyup = function(event) {

        $("#current-display").text("Current Word: ");
        $("#directions").text("");

        var userGuess = event.key.toLowerCase();

        //if key pressed is from a-z, then run the for loop

        if(event.keyCode>=65 && event.keyCode<=90) {

            //add user guess to list of keys pressed

            alreadyGuessed += userGuess;
            guessesRemaining--;

            //update placholder if player guesses the correct letter

            for (let i = 0; i < currentWord.length; i++) {
                if (userGuess===currentWord[i]) {
                    placeholderArray[i]=userGuess;
                }   
            }

            //convert placeholder from an array to a string

            var placeholderString = placeholderArray.join("");

            //check to see if the correct word was guessed
            //if so, update wins, if not, update lossess
            //restart game

            if (placeholderString === currentWord && guessesRemaining > 1) {
                wins++;
                guessesRemaining = 11;
                alreadyGuessed = "";
                startGame();
            }
            else if (guessesRemaining < 1) {
                losses++;
                guessesRemaining = 11;
                alreadyGuessed = "";
                startGame();
            }

            //relay information to DOM using jQuery

            $("#placeholder-array").empty();

            for (let i = 0; i < placeholderArray.length; i++) {
                $("#placeholder-array").append(placeholderArray[i]);
            }

            $("#already-guessed").text("Letters already guessed: " + alreadyGuessed);
            $("#guesses-remaining").text("Guesses remaining: " + guessesRemaining);

            $("#wins").text("Wins: " + wins)
            $("#losses").text("Losses: " + losses)
        }
    }
});