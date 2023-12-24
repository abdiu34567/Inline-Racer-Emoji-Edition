class Utils {

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomNumbers(numPlayers, min, max) {
    const randomNumbers = [];

    for (let i = 0; i < numPlayers; i++) {
      randomNumbers.push(this.generateRandomNumber(min, max));
    }

    return randomNumbers;
  }



  formatGameArea(gameArea) {
    return gameArea.map(row => row.join(' ')).join('\n');
  }


  getPlayersTemplate() {
    const playersWithEmoji = new Memory().getPlayers();

    var playersTemplate = '';

    playersWithEmoji.forEach(element => {
      const elem = element.split("##")
      const player = elem[0]
      const emoji = elem[1]

      playersTemplate += `👤 ${player} : ${emoji}\n`
    });


    return playersTemplate
  }





  generateValuesTemplate() {

    const arrayOfValues = this.generateRandomNumbers(5, 1, 15);

    var valueTemplate = '';

    const markup = {
      inline_keyboard: [[]],
    };

    const value = arrayOfValues[0];


    arrayOfValues.forEach((elem, index) => {
      const emojis = ["🌟", "➡️", "⬅️", "⬆️", "⬇️"]
      valueTemplate += `   ${emojis[index]} : ${elem} ${(!index) ? '*' : ''}\n`
      markup.inline_keyboard[0].push({
        text: value * elem,
        callback_data: emojis[index],
      })
    })

    CONFIG.markup = markup;

    return valueTemplate;
  }


  shuffleInlineKeyboard(inlineKeyboard) {
    // Assuming inlineKeyboard is an array with one row
    if (Array.isArray(inlineKeyboard) && inlineKeyboard.length === 1 && Array.isArray(inlineKeyboard[0])) {
      // Shuffle the inner array (inline keyboard row)
      for (let i = inlineKeyboard[0].length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [inlineKeyboard[0][i], inlineKeyboard[0][j]] = [inlineKeyboard[0][j], inlineKeyboard[0][i]];
      }
    }

    return inlineKeyboard;
  }




  findDeletedEmoji(originalString = '👋📺📷🚀', modifiedString = '👋📷🚀') {
    // Extract emojis from the original and modified strings
    const originalEmojis = originalString.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    const modifiedEmojis = modifiedString.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];

    // Find the deleted emoji
    const deletedEmojis = originalEmojis.filter(emoji => !modifiedEmojis.includes(emoji));
    return deletedEmojis;
  }



  searchCharacterInArray(array, character) {
    // Filter elements that contain the specified character
    const matchingElements = array.filter(element => element.includes(character));

    return matchingElements;
  }
}
