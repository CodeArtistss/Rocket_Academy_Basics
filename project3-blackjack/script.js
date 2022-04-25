// create deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (var i = 0; i < suits.length; i += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[i];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === 1) {
        cardName = "ace";
      } else if (cardName === 11) {
        cardName = "jack";
      } else if (cardName === 12) {
        cardName = "queen";
      } else if (cardName === 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

///// code written after helper functions provided //////
// Game Modes
var dealCardsMode = "deals cards mode";
var hitORStandMode = "Hit or Stand";
var compareCardMode = "compare card mode";
var gameOver = false;

// create shuffled deck
var shuffledDeck = shuffleCards(makeDeck());

// Global Variables
var playerHand = [];
var computerHand = [];
var currentGameMode = dealCardsMode;
const dealerHitThreshold = 16;
var hitFlag = false;
var standFlag = false;
var buttonFlag = false;

// Helper function to pop card from deck and push into player or computer hand array
var dealCardToHand = function (hand) {
  hand.push(shuffledDeck.pop());
};

// Calculate total sum of player or computer's cards
var calculateHandValue = function (handArray) {
  let totalHandValue = 0;
  let aceCounter = 0;

  for (let index = 0; index < handArray.length; index += 1) {
    let currCard = handArray[index];
    if (
      currCard.name === "king" ||
      currCard.name === "queen" ||
      currCard.name === "jack"
    ) {
      totalHandValue += 10;
    } else if (currCard.name === "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter += 1;
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
  }
  for (let arrayIndex = 0; arrayIndex < aceCounter; arrayIndex += 1) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
  }
  return totalHandValue;
};

var convertHandCardsToMsg = function (hand) {
  let cards = "";
  for (let index = 0; index < hand.length; index += 1) {
    cards += " , " + hand[index].name;
  }
  return cards;
};

var displayCard = function () {
  // Construct an output string to communicate which cards were drawn
  var myOutputValue = `Computer has
    ${convertHandCardsToMsg(computerHand)}
     with sum of  
    ${calculateHandValue(computerHand)}. 
    <br> Player has 
    ${convertHandCardsToMsg(playerHand)}
     with sum of 
     ${calculateHandValue(playerHand)}`;

  // Return the fully-constructed output string
  return myOutputValue;
};

// Passing blackjack conditions to be checked for true or false later
var verifyBlackJack = function (hand) {
  return calculateHandValue(hand) === 21 && hand.length === 2;
};

// reset game function to set game settings back to default
var resetGame = function () {
  currentGameMode = dealCardsMode;
  //gameOver = false;
  playerHand = [];
  computerHand = [];
  if (buttonFlag == true) {
    let submitButton = document.getElementById("submit-button");
    submitButton.style.display = "inline";
    let hit = document.getElementById("hitButton");
    if (hit.parentNode) {
      hit.parentNode.removeChild(hit);
    }
    let stand = document.getElementById("standButton");
    if (stand.parentNode) {
      stand.parentNode.removeChild(stand);
    }
    buttonFlag = false;
  }
};

var hitFunction = function () {
  hitFlag = true;
  dealCardToHand(playerHand);
  var result = main();

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  console.log("Hello! 123");
};

var standFunction = function () {
  standFlag = true;
  hitFlag = false;
  console.log("Hi, testing!");
  var result = main();

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
};

// var createButton = function (buttonText, buttonFunction, getID) {
//   let buttonContainer = document.getElementById(getID);
//   let makeButton = document.createElement("button");
//   makeButton.innerHTML = buttonText;
//   makeButton.addEventListener("click", buttonFunction);
//   buttonContainer.appendChild(makeButton);
// };

var createButton = function (inputObj) {
  let buttonContainer = document.getElementById(inputObj.elementID);
  let makeButton = document.createElement("button");
  makeButton.id = inputObj.newID;
  makeButton.innerHTML = inputObj.buttonText;
  makeButton.addEventListener("click", inputObj.buttonFunction);
  buttonContainer.appendChild(makeButton);
};

var readTextToSpeech = function (text) {
  let readMsg = new SpeechSynthesisUtterance(text);
  readMsg.volume = 0.5;
  window.speechSynthesis.speak(readMsg);
};

var main = function (input) {
  // var hitButtonObj = {
  //   buttonText: "Hit",
  //   buttonFunction: testFunction,
  //   elementID: "button-container"
  // };

  // createButton("Hit", testFunction, "button-container");
  //createButton("Stand", testFunction2, "button-container");

  // game is over reset the game to default settings
  // if (gameOver === true) {
  //   resetGame();
  //   return `The game is over. Please refresh to play again.`;
  // }
  // deal 2 cards to player and Computer
  if (currentGameMode === dealCardsMode) {
    // deal 1st card each to player and computer
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // deal 2nd card each to player and compute
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    console.log(calculateHandValue(playerHand));
    console.log(calculateHandValue(computerHand));
    // //playerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "clubs", rank: 10 }
    // ];
  }
  // check for blackjack win
  if (
    verifyBlackJack(playerHand) === true &&
    verifyBlackJack(computerHand) === false
  ) {
    let winMsg =
      displayCard() +
      `<br> Player got a blackjack win! Please deal to play again!`;
    readTextToSpeech("Player got a blackjack win!");
    //gameOver = true;
    resetGame();
    return winMsg;
  }
  if (
    verifyBlackJack(computerHand) === true &&
    verifyBlackJack(playerHand) === false
  ) {
    var winMsg =
      displayCard() +
      `<br> Dealer got a blackjack win! Please deal to play again!`;
    readTextToSpeech("Dealer got a blackjack win!");
    //gameOver = true;
    resetGame();
    return winMsg;
  }
  if (
    verifyBlackJack(playerHand) === true &&
    verifyBlackJack(computerHand) === true
  ) {
    //gameOver = true;
    resetGame();
    return displayCard() + `<br> It's a blackjack tie!`;
  }
  // Hit or Stand to add cards
  if (currentGameMode === hitORStandMode) {
    if (hitFlag === true) {
      if (calculateHandValue(playerHand) > 21) {
        let winMsg =
          displayCard() +
          `<br> Player has bust and lost. Dealer won! <br> Please deal to play again!`;
        readTextToSpeech("Player has bust and lost. Dealer won!");
        console.log("here");
        //gameOver = true;
        resetGame();
        return winMsg;
      }
      return `${displayCard()} <br> Choose hit or stand.`;
    }
    if (standFlag === true) {
      currentGameMode = compareCardMode;
    }
  }
  // determine winner through higher hand sum
  if (currentGameMode === compareCardMode) {
    while (calculateHandValue(computerHand) <= dealerHitThreshold) {
      dealCardToHand(computerHand);
    }
    if (calculateHandValue(computerHand) > 21) {
      let winMsg =
        displayCard() +
        `<br> Dealer has bust and lost. Player won! <br> Please deal to play again!`;
      readTextToSpeech("Dealer has bust and lost. Player won!");
      //gameOver = true;
      resetGame();
      return winMsg;
    }
    // player wins if player hand > computer hand
    if (calculateHandValue(playerHand) > calculateHandValue(computerHand)) {
      let winMsg =
        displayCard() + `<br> Player has won! Please deal to play again!`;
      readTextToSpeech("Player has won!");
      //gameOver = true;
      resetGame();
      return winMsg;
    }
    // Computer wins if computer hand > player hand
    if (calculateHandValue(computerHand) > calculateHandValue(playerHand)) {
      let winMsg =
        displayCard() + `<br> Dealer has won! Please deal to play again!`;
      readTextToSpeech("Dealer has won!");
      //gameOver = true;
      resetGame();
      return winMsg;
    }
    // Tie if both computer and player hands are equal
    if (calculateHandValue(playerHand) === calculateHandValue(computerHand)) {
      let tieMsg =
        displayCard() + `<br> It's a tie! Please deal to play again!`;
      readTextToSpeech("It's a tie!");
      //gameOver = true;
      resetGame();
      return tieMsg;
    }
  }
  // switch game modes to Hit or Stand & ask for player input
  currentGameMode = hitORStandMode;
  if (currentGameMode == hitORStandMode && buttonFlag == false) {
    buttonFlag = true;
    let submitButton = document.getElementById("submit-button");
    submitButton.style.display = "none";
    createButton({
      buttonText: "Hit",
      buttonFunction: hitFunction,
      elementID: "button-container",
      newID: "hitButton"
    });
    createButton({
      buttonText: "Stand",
      buttonFunction: standFunction,
      elementID: "button-container",
      newID: "standButton"
    });
  }
  return displayCard() + `<br> Please input either "hit" or "stand".`;
};

// Read text function //
// var msg = new SpeechSynthesisUtterance();
//       msg.text = input.value
//       msg.lang = "zh-HK"
//       window.speechSynthesis.speak(msg);

// make deck
// shuffle deck
// pop 2 cards to computer and player respectively
// check for blackjack win
// if no blackjack, return card values to player (of player and computer)
// player chooses to hit or stand
// if hit, pop a new card > evaluate total sum > check if player bust >  if not bust > player chooses to hit or stand
// if stand, compare cards and determine winner
