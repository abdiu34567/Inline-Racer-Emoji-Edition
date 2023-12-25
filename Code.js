function doPost(e) {
  const token = "your_bot_token";
  const bot = new Bot.Telesun(token, e);

  // bot.Use(ctx => console.log(ctx.from))

  bot.Command(/start@InlineRacer_Emoji_edition_bot/, starter);

  bot.Action("join", addPlayer);

  bot.Action(["➡️", "⬅️", "⬆️", "⬇️"], moveCar);
}
