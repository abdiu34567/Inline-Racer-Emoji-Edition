function formatGameArea(gameArea) {
  return gameArea.map(row => row.join(' ')).join('\n');
}

let keyboards = {
  inline_keyboard: [
    [
      {
        text: "✅ Join",
        callback_data: "join",
      },
    ]
  ],
};


class Template {
  begin(gameArea) { return formatGameArea(gameArea) }

  start(gameArea) {
    const game = formatGameArea(gameArea)
    const template = `Processing..., Please Wait.\n\n` +
      `<pre>${game}</pre>`;

    return template;
  }


  started(gameArea) {
    const game = formatGameArea(gameArea)


    const utils = new Utils();
    const playersTemplate = utils.getPlayersTemplate();
    const valueTemplate = utils.generateValuesTemplate();

    const template = `🎲 Game Started.\n\n` +
      `<b>${playersTemplate}</b>\n` +
      `<b>${valueTemplate}</b>\n` +
      `<pre>${game}</pre>`;

    return template;
  }


  winner(gameArea, winner) {
    const game = formatGameArea(gameArea)

    const utils = new Utils();
    const playersTemplate = utils.getPlayersTemplate();
    const valueTemplate = utils.generateValuesTemplate();

    const template = `🎲 <b>Game Ended.\n\n` +
      `${playersTemplate}</b>\n` +
      `<b>${valueTemplate}</b>\n` +
      `<b>    🏆 ${winner}</b>\n\n` +
      `<pre>${game}</pre>`;

    return template;
  }


}