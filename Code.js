function doPost(e) {
    const token = '6790888094:AAGo4rjQLbjOUBi-AJZ2xcDUPS7tsNVB838';
    const bot = new Bot.Telesun(token, e);

    // bot.Use(ctx => console.log(ctx.from))

    bot.Command(/start@InlineRacer_Emoji_edition_bot/, starter)

    bot.Action('join', addPlayer)

    bot.Action(['➡️', '⬅️', '⬆️', '⬇️'], moveCar)
}


