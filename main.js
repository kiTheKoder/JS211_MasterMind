'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  //splits the user guess and solution into an array
  let hintArray = solution.split('');
  let guessArray = guess.split('');

  //holds value for hint
  let correctLocation = 0;

  //loops through each array
  for (let i=0; i < hintArray.length; i++) {
    for (let j=0; j < guessArray.length; j++) {

      //checks for equality at matching indexes of the array
      if (hintArray[i] === guessArray[i]) {
        correctLocation++;
        hintArray[i] = null;
      } 
    }
  }
  let correctSolution = 0

  // checks for correct letter not in correct location
  for (let i=0; i < hintArray.length; i++) {
    let loopedIndexes = hintArray.indexOf(guessArray[i]);
    if (loopedIndexes > -1) {
      correctSolution++;
      hintArray[loopedIndexes] = null;
    }
  }
  return correctLocation + '-' + correctSolution;
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  if (guess !== solution) {
    console.log(board.push("Try again! Here's a hint:" + generateHint(guess)));
 
  } else {
    return "You guessed it!";
  }

}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}