function starter(ctx) {

  ctx.replyWithChatAction("typing");

  new Memory().clearMemory()

  const game = new racingGame()
  const gameArea = game.startGame()

  const template = new Utils().formatGameArea(gameArea)

  ctx.replyWithHtml(`<pre>${template}</pre>`,
    { reply_markup: keyboards })

  //save Game Area
  new Memory().setGameArea(gameArea)
  // setGameArea(gameArea)
}



function addPlayer(ctx) {

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(500)

    ctx.replyWithChatAction("typing");

    const username = getPlayer(ctx)

    const game = new racingGame()
    const gameArea = game.joinGame(username)
    if (!gameArea) { return }

    //remove <join> reply_Markup
    const players = getPlayersTemplate()
    if (players && players.length == 4) {

      const template = new Template();
      const started = template.started(gameArea)

      const markup = CONFIG.markup.inline_keyboard;
      const shuffleMarkup = new Utils().shuffleInlineKeyboard(markup)

      ctx.replyWithEditedMessage(started, {
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: shuffleMarkup },
      });

    } else {
      const template = gameTemplate(gameArea)
      ctx.replyWithEditedMessage(`<pre>${template}</pre>`,
        {
          parse_mode: "HTML",
          reply_markup: keyboards
        })

    }

    //save Game area and players for the next round
    setGameArea(gameArea)

  } catch (err) { console.log(ctx.sendMessage({ chat_id: '1173180004', text: err })) }

}


function moveCar(ctx) {


  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(500)

    if (!isPlayerRegistered(ctx)) { return }

    ctx.replyWithChatAction("typing");

    const memory = new Memory();
    const gameAreaExist = memory.getGameArea();

    if (!gameAreaExist) { return }

    const game = new racingGame();
    const gameArea = game.moveCar(getDirection(ctx))

    const template = new Template();

    const utils = new Utils();

    const toStringGameArea = JSON.stringify(gameArea)
    const emoji = utils.findDeletedEmoji("😎🤬🤭🥶", toStringGameArea);

    if (emoji.length > 0) {
      const players = memory.getPlayers();
      const winnerInfo = utils.searchCharacterInArray(players, emoji)
      const winner = winnerInfo[0].split("##")[0]

      const winnerTemplate = template.winner(gameArea, winner)
      ctx.replyWithEditedMessage(winnerTemplate, {
        parse_mode: "HTML",
        // reply_markup: shuffleMarkup,
      });

      return memory.clearMemory()

    }

    const playerTemplate = template.started(gameArea)

    const markup = CONFIG.markup.inline_keyboard;
    const shuffleMarkup = utils.shuffleInlineKeyboard(markup)

    ctx.replyWithEditedMessage(playerTemplate, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: shuffleMarkup },
    });

    setGameArea(gameArea)

  } catch (err) { console.log(ctx.sendMessage({ chat_id: '1173180004', text: err })) }
}



function getDirection(ctx) {
  return ctx.message.data;
}

//Get Winner username if possible,
//unless get the first name only
function getPlayer(ctx) {
  const username = (ctx.from.username) ? '@' + ctx.from.username : ''
  const first_name = ctx.from.first_name
  return username || first_name;
}


function isPlayerRegistered(ctx) {
  const player = getPlayer(ctx);
  const cbkData = ctx.message.message.text;
  if (cbkData.includes(player)) { return true }

  return false
}
