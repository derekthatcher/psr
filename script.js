/************************************************************
 paper scissors rock program
 Version 1.2
 Change the gameState varible to alter the game.
 For another language the subtitle, and scores text will also need to be changed. Also replacement subtitle in display Message function
************************************************************/
//variables
/*let gameState = [
  "paper covers rock",
  "scissors cuts paper",
  "rock crushes scissors"
];
let language = {wins: "winitanga", draws: "haupārua", loses: "hinga", choice: "hanga he whiriwhiri"};
let language = {wins: "wins", draws: "draws", loses: "loses", choice: "make a choice"};
*/
let gameState = ["pepa hipoki toka", "kutikuti matu pepa", "toka ka whakapakaru kutikuti"];
let language = {wins: "winitanga", draws: "haupārua", loses: "hinga", choice: "hanga he whiriwhiri"};

/************************************************************
 alternet games
 "paper covers rock","scissors cuts paper","rock crushes scissors"
  "pepa hipoki toka", "kutikuti matu pepa", "toka ka whakapakaru kutikuti"
  'Paper covers Rock','Rock crushes Lizard','Scissors cuts Paper','Lizard poisons Spock','Spock smashes Scissors','Scissors decapitates Lizard','Lizard eats Paper','Paper disproves Spock','Spock vaporizes Rock','Rock crushes Scissors'
************************************************************/

// variables bound to HTML elements for easy reference
let wins = document.querySelector("#wins");
let loses = document.querySelector("#loses");
let draws = document.querySelector("#draws");
let buttons = document.querySelector("#buttons");
let title = document.querySelector("#title");
let subtitle = document.querySelector("#subtitle");


/* function to place the buttons and set the title */
function placeButtonsAndTitle() {
  for (let i = 0; i < gameState.length; i++) {
    let name = gameState[i].split(" ")[0];
    // test if name has been used already
    if(!title.innerHTML.includes(name)){
      buttons.innerHTML += "<button id='" + name + "'>" + name + "</button>";
      title.innerHTML += name + " ";
    }
  }
}

// translate anything on page as needed, uses language opject definitions. Would be awesome to have translations as hover.
function translate(){
  subtitle.innerHTML = language["choice"];
  document.querySelector("#win").innerHTML = language["wins"] + ": ";
  document.querySelector("#draw").innerHTML = language["draws"] + ": ";
  document.querySelector("#lose").innerHTML = language["loses"] + ": ";
}

placeButtonsAndTitle();
translate();

buttons.addEventListener("click", playerClicksButton);

// function that is called when a button is clicked
function playerClicksButton(e) {
  const isButton = event.target.nodeName === "BUTTON";
  if (!isButton) {
    return;
  }
  let computerChoice = gameState[
    Math.floor(Math.random() * gameState.length)
  ].split(" ")[0];
  findWinner(computerChoice, e.target.id);
}

// function to decide on winner and check for draw
function findWinner(player, computer) {
  // test if equal, then draw
  if (player == computer) {
    draws.innerHTML = parseInt(draws.innerHTML) + 1;
    displayMessage(language["draws"]);
  } else {
    // loop through phrases in gameState and search
    for (let i = 0; i < gameState.length; i++) {
      let phrase = gameState[i];
      // if phrase contains both choices
      if (phrase.includes(player) && phrase.includes(computer)) {
        // if players choice is the first word then they win
        displayMessage(phrase);
        if (phrase.split(" ")[0] == player) {
          wins.innerHTML = parseInt(wins.innerHTML) + 1;
        } // otherwise they lose
        else {
          loses.innerHTML = parseInt(loses.innerHTML) + 1;
        } //end if
      } //end if
    } // end for
  } //end if
} // end function

function displayMessage(message) {
    // message will display for n milliseconds then revert
  let n = 1500;
  subtitle.innerHTML = message;
  setTimeout(function() {
    subtitle.innerHTML = language["choice"];
  }, n);
}
