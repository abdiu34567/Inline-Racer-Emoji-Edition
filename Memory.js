function setPlayersTemplate(playerTemp) {
  const player = JSON.stringify(playerTemp)
  PropertiesService.getScriptProperties().setProperty("player", player)
}

function getPlayersTemplate() {
  const string = PropertiesService.getScriptProperties().getProperty("player")
  return JSON.parse(string)
}

function setGameArea(gameArea) {
  const area = JSON.stringify(gameArea)
  PropertiesService.getScriptProperties().setProperty("game", area)
}

function getGameArea() {
  const string = PropertiesService.getScriptProperties().getProperty("game")
  return JSON.parse(string)
}

/////
class Memory {
  setPlayers(playerTemp) {
    const player = JSON.stringify(playerTemp)
    PropertiesService.getScriptProperties().setProperty("player", player)
  }

  getPlayers() {
    const string = PropertiesService.getScriptProperties().getProperty("player")
    return JSON.parse(string)
  }

  setGameArea(gameArea) {
    const area = JSON.stringify(gameArea)
    PropertiesService.getScriptProperties().setProperty("game", area)
  }

  getGameArea() {
    const string = PropertiesService.getScriptProperties().getProperty("game")
    return JSON.parse(string)
  }

  clearMemory() {
    PropertiesService.getScriptProperties().deleteAllProperties()
  }
}