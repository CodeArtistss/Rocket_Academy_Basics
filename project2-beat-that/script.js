// Generate 2 dice rolls for player 1
// > return user the 2 dice rolls
// > Allow player 1 to choose order of 2 dice rolls
// > return the player's choice

// 2nd version

var comparingCombineDiceRolls = function () {
  var max = Math.max.apply(null, playerScores);
  var winningPlayer = playerScores.indexOf(max);
  return winningPlayer;
};

var randomDiceRolls = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var diceRoll1 = 0;
var diceRoll2 = 0;

var rollState = true;
var playerNumber = 0;
var numPlayers = 2;
var playerScores = Array(numPlayers);
playerScores.fill(0);

var main = function (input) {
  // If supposed to roll
  if (rollState === true) {
    // If user gives non-empty input, return error msg
    if (input !== "") {
      return 'Please roll the dice by clicking "submit"';
    }

    // Do rolling of dice
    diceRoll1 = randomDiceRolls();
    diceRoll2 = randomDiceRolls();
    console.log(diceRoll1);
    console.log(diceRoll2);
    // if dice rolls are the same
    if (diceRoll1 === diceRoll2) {
      playerScores[playerNumber] = Number("" + diceRoll1 + diceRoll2);
      var userMsg = `It's a tie, your number is ${
        playerScores[playerNumber]
      }. <br> Player ${playerNumber + 1} your turn next. `;
      if (playerNumber < numPlayers - 1) {
        playerNumber += 1;
        return userMsg;
      }
      if (playerNumber === numPlayers - 1) {
        comparingCombineDiceRolls();
        var returnMsg = `Your number is ${playerScores[playerNumber]}.`;
        returnMsg += `<br> The winner is Player ${
          comparingCombineDiceRolls() + 1
        }.`;
        // Reset the player
        playerNumber = 0;
      }

      return returnMsg;
    }
    // Set rollState to inverse
    else {
      rollState = false;
    }

    var userMsg = `Hi Player ${playerNumber + 1}, you have rolled ${diceRoll1}
    for dice one and ${diceRoll2} for dice two.
    Choose the order of the dice by entering "1" or "2".`;
    return userMsg;
  } else {
    // If user gives incorrect input, return error msg
    if (input !== "1" && input !== "2") {
      return 'Please input either "1" or "2"';
    }

    // Do combination of dice numbers
    // playerScores looks like [0, 0, 0]
    if (input === "1")
      playerScores[playerNumber] = Number("" + diceRoll1 + diceRoll2);
    else playerScores[playerNumber] = Number("" + diceRoll2 + diceRoll1);

    //playerNumber += 1; // Same thing as playerNumber = playerNumber + 1

    var returnMsg = `You chose dice ${input} first, your number is ${playerScores[playerNumber]}.`;

    if (playerNumber < numPlayers - 1) {
      returnMsg += `<br> Player ${playerNumber + 2} your turn starts.`;

      playerNumber += 1;
    }
    // Else if this is the last player, then we show the winner and reset the playerNumber
    else {
      comparingCombineDiceRolls();
      returnMsg += `<br> The winner is Player ${
        comparingCombineDiceRolls() + 1
      }.`;
      // Reset the player
      playerNumber = 0;
    }
    // Reset the game
    rollState = true;
    return returnMsg;
  }
};

// Rewrite

// Player 1 clicks submit
// Roll two dice and show value
// Player 1 chooses dice order
// Player 2 clicks submit
// Roll two dice and show value
// Player 2 chooses dice order
// Evaluate higher combined score and output result

// Player 1 clicks submit to start the game
// Input valid player 1 submits
// if input is valid, generate 2 random dice rolls
// else return error messsage and ask for proper input
// if random dice rolls is a tie
// show Player 1 dice combination and prompt Player 2 to start
// else Show Player 1 dice rolls and ask for input for dice order
// Valid dice order input
// if input is valid, show number combination and prompt Player 2 start
// else error message and ask for proper input
// player 2 clicks submit to start game
// input validate
// if input is valid, generate 2 random dice rolls
// else return error messsage and ask for proper input
// if 2 dice rolls are the same compare dice results
// show the winner
// Show Player 2 dice rolls and ask for input for dice order
// Valid dice order input
// if input is valid, show number combination
// else error message and ask for proper input
// compare player 1 & 2 numbers
// show the winner

// States
// Dice Roll Mode
// Chooose Dice Order Mode
// Compare Score Mode

//Variables
// Current Player
// Player Score
// Number of Players
//  2 random dice rolls

//Game Modes
// var rollDiceMode = "Roll Dice Mode";
// var chooseDiceMode = "Choose Dice Order Mode";
// var compareScoresMode = "Compare Scores Mode";

// var currentPlayer = 1;
// var currentPlayerRolls = [];
// var allPlayersScore = [];
// var numPlayers = 2;

// Set Game Mode
// var gameMode = rollDiceMode;

// Helper function to generate single dice roll
// var rollRandomDiceRoll = function () {
//   return Number(Math.ceil(Math.random() * 6));
// };

// Helper function to generate both dice roll and return to user
// var rollBothDice = function () {
//   currentPlayerRolls = [rollRandomDiceRoll(), rollRandomDiceRoll()];
//   if (currentPlayerRolls[0] === currentPlayerRolls[1]) {
//     let playerScore = Number(
//       `${currentPlayerRolls[0]}${currentPlayerRolls[1]}`
//     );
//     allPlayersScore.push(playerScore);
//     currentPlayerRolls = [];
//     gameMode = rollDiceMode;
//     currentPlayer += 1;
//     return `Player ${
//       currentPlayer - 1
//     }, your number is ${playerScore}. <br> Player ${currentPlayer}, your turn starts!`;
//   } else {
//     return `Hi Player ${currentPlayer}, you rolled ${currentPlayerRolls[0]} for dice one
//   and ${currentPlayerRolls[1]} for dice two
//   <br> Please Choose the order of the dice by entering "1" or "2".`;
//   }
// };

// var getPlayerScore = function (input) {
//   let playerScore = 0;
//   check if input == 1, then add the numbers in current order of array
//   if (input === "1") {
//     playerScore = Number(`${currentPlayerRolls[0]}${currentPlayerRolls[1]}`);
//     console.log(playerScore);
//   }
//   check if input == 2, then add the numbers in reverse order of array
//   else if (input === "2") {
//     playerScore = Number(`${currentPlayerRolls[1]}${currentPlayerRolls[0]}`);
//     console.log(playerScore);
//   }
//   record player score to all player score array
//   allPlayersScore.push(playerScore);
//   currentPlayerRolls = [];

//   return player dice comnbination to player
//   return `Hello Player ${currentPlayer}, your number is ${playerScore}.`;
// };

// var determineWinner = function () {
//   let max = Math.max.apply(allPlayersScore);
//   let winningPlayer = allPlayersScore.indexOf(max);
//   console.log(winningPlayer);
//   return winningPlayer;
// };

// Helper function to generate single dice roll
// var resetGame = function () {
//   currentPlayer = 1;
//   currentPlayerRolls = [];
//   allPlayersScore = [];
//   numPlayers = 2;
// };

// var main = function (input) {
//   let result = "";
//   check if game mode is roll dice mode
//   if (gameMode === rollDiceMode) {
//     input validation
//     if (input !== "") {
//       return 'Please roll the dice by clicking "submit"';
//       run roll 2 dice function and return messsage to current player
//     } else {
//       change game mode to choose dice combination
//       gameMode = chooseDiceMode;
//       result = rollBothDice();
//       console.log(currentPlayerRolls);
//     }
//     return result;
//   } else if (gameMode === chooseDiceMode)
//     if (input !== "1" && input !== "2") {
//       input validate
//       return 'Please input either "1" or "2".';
//       else get player to choose dice order
//     } else {
//       console.log(currentPlayerRolls);
//       result = getPlayerScore(input);
//       gameMode = rollDiceMode;
//       return result;

//       if it is not the last player we go back to roll dice mode again
//       if (currentPlayer < numPlayers) {
//         gameMode = rollDiceMode;
//         currentPlayer += 1;
//         result += `<br> Player ${currentPlayer}, your turn starts! Press submit to roll your dice!`;
//         last player and we compare player scores to determine the winner
//       } else if (currentPlayer === numPlayers) {
//         gameMode = "Compare Scores Mode";
//         let theWinningPlayer = determineWinner();
//         result = `Player ${currentPlayer}, your number is ${
//           allPlayersScore[currentPlayer - 1]
//         }
//         <br> Player ${currentPlayer + 1}, your number is ${
//           allPlayersScore[currentPlayer]
//         }.
//         <br> The winner is ${theWinningPlayer + 1}.`;
//         resetGame();
//       }
//     }

//   return result;
// };
