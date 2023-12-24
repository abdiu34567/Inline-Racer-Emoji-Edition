class racingGame {

  constructor() {
    this.maxPlayers = 4;
    this.playerEmojis = ['😎', '🤬', '🤭', '🥶']
    this.car = '🚗';
  }


  gameArea() {
    return getGameArea() || [
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖'],
      ['➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖', '➖']
    ];

  }


  players() { return getPlayersTemplate() || [] }

  startGame() {
    const gameArea = this.gameArea()

    // Place the car in the last index of one of the arrays
    var randomArrayIndex = Math.floor(Math.random() * gameArea.length);

    gameArea[randomArrayIndex][10] = this.car;

    return gameArea
  }

  joinGame(playerId) {
    const gameArea = this.gameArea()
    const player = this.players();

    // const matcher = new Utils().searchCharacterInArray(player,playerId)
    // if(matcher.length > 0){ return}

    // Check if the maximum number of players has been reached
    if (player.length < this.maxPlayers) {
      // Choose a random array index that doesn't already have a player
      var availableArrayIndices = [...Array(gameArea.length).keys()].filter(index => !this.isPlayerInArray(index));

      if (availableArrayIndices.length > 0) {
        var randomArrayIndex = availableArrayIndices[Math.floor(Math.random() * availableArrayIndices.length)];

        const emoji = this.playerEmojis[player.length]
        // Place the player emoji at the first index of the chosen array
        gameArea[randomArrayIndex][0] = emoji;

        // Add the player to the players array
        player.push(playerId + "##" + emoji);
        setPlayersTemplate(player)

        // Inform the player that they have joined
        Logger.log('Player ' + playerId + ' has joined the game.');

        return gameArea;
      } else {
        // Inform the player that all arrays are occupied
        Logger.log('All arrays are occupied. Cannot join.');
      }
    } else {
      // Inform the player that the game is full
      Logger.log('The game is full. Cannot join.');
    }
  }

  isPlayerInArray(arrayIndex) {
    const gameArea = this.gameArea()
    // Check if there is a player in the given array index
    for (var i = 0; i < gameArea[arrayIndex].length; i++) {
      if (this.playerEmojis.includes(gameArea[arrayIndex][i])) {
        return true;
      }
    }
    return false;
  }

  moveCar(direction) {
    // Find the car's current position
    var carPosition = this.findCarPosition();
    const gameArea = this.gameArea()

    // Update the game state based on the direction
    switch (direction) {
      case '➡️':
        // Move the car to the right within the same array
        if (carPosition[1] < 11) {
          gameArea[carPosition[0]][carPosition[1] + 1] = this.car;
          gameArea[carPosition[0]][carPosition[1]] = ' ';
        }
        break;
      case '⬅️':
        // Move the car to the left within the same array
        if (carPosition[1] > 0) {
          gameArea[carPosition[0]][carPosition[1] - 1] = this.car;
          gameArea[carPosition[0]][carPosition[1]] = ' ';
        }
        break;
      case '⬆️':
        // Move the car up to the previous array at the same index
        if (carPosition[0] > 0) {
          gameArea[carPosition[0] - 1][carPosition[1]] = this.car;
          gameArea[carPosition[0]][carPosition[1]] = ' ';
        }
        break;
      case '⬇️':
        // Move the car down to the next array at the same index
        if (carPosition[0] < 8) {
          gameArea[carPosition[0] + 1][carPosition[1]] = this.car;
          gameArea[carPosition[0]][carPosition[1]] = ' ';
        }
        break;
    }

    return gameArea;
    // Print the updated game state
    // this.printGameState();
  }

  findCarPosition() {
    const gameArea = this.gameArea()
    // Find the car's current position in the game area
    for (var i = 0; i < gameArea.length; i++) {
      for (var j = 0; j < gameArea[i].length; j++) {
        if (gameArea[i][j] === this.car) {
          return [i, j];
        }
      }
    }
    return [-1, -1]; // Car not found
  }
};

