//run this function by clicking run button on apps script editor
function SettingWebHook() {
  // find from bot father
  let botToken = "6790888094:AAGo4rjQLbjOUBi-AJZ2xcDUPS7tsNVB838";

  //you will found the url after you deploy your code
  let webhookUrl =
    "https://script.google.com/macros/s/AKfycbzspPnDcb6OmgRJMiNEM_d3PTOS9VelYqVK1vwyngHpClQN8fpElyOv6BBmWWZj-9iz/exec";
  Bot.setWebHook(botToken, { url: webhookUrl });
}

//run this function by clicking run button and selecting deletingWebHook function
function deletingWebHook() {
  let botToken = "6790888094:AAGo4rjQLbjOUBi-AJZ2xcDUPS7tsNVB838";
  Bot.deleteWebhook(botToken);
}
