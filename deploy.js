//run this function by clicking run button on apps script editor
function SettingWebHook() {
  // find from bot father
  let botToken = "your_bot_token";

  //you will found the url after you deploy your code
  let webhookUrl = "your_web_app_url";
  Bot.setWebHook(botToken, { url: webhookUrl });
}

//run this function by clicking run button and selecting deletingWebHook function
function deletingWebHook() {
  let botToken = "your_bot_token";
  Bot.deleteWebhook(botToken);
}
