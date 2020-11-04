const fs = require("fs");
const elements = require("./../elements");

const filePath = `${__dirname}/../../../data/appData.json`;

const checkPassword = () => {
  const appData = JSON.parse(fs.readFileSync(filePath));

  const password = appData.appPassword;
  const inputPasswordSS = elements.adminAuthoInput.value;
  const inputPasswordHS = elements.adminAuthoInputHS.value;

  if (inputPasswordSS) {
    if (password === inputPasswordSS) {
      elements.adminAuthoContainer.style.display = "none";
      elements.stockContainer.style.display = "flex";
      elements.wrongingPassword.style.display = "none";
    } else {
      elements.wrongingPassword.style.display = "block";
    }
  }

  if (inputPasswordHS) {
    if (password === inputPasswordHS) {
      elements.adminAuthoContainerHS.style.display = "none";
      elements.historyContainer.style.display = "block";
      elements.wrongingPasswordHS.style.display = "none";
    } else {
      elements.wrongingPasswordHS.style.display = "block";
    }
  }
};
module.exports = checkPassword;
