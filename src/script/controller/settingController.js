let { remote } = require("electron");
const fs = require("fs");

const elements = require("./../elements");

const filePath = `${__dirname}/../../../data/appData.json`;

const appData = JSON.parse(fs.readFileSync(filePath));

const dataObject = {};

const settingShopDetail = () => {
  const shopName = elements.shopNameInput.value;
  const shopAddress = elements.shopAddressInput.value;
  const shopEmail = elements.shopEmailInput.value;
  const shopContactNo = elements.shopNumberInput.value;

  if (shopName && shopEmail && shopAddress && shopContactNo) {
    dataObject.shop_data = {};

    dataObject.shop_data.shopName = shopName;
    dataObject.shop_data.shopAddress = shopAddress;
    dataObject.shop_data.shopEmail = shopEmail;
    dataObject.shop_data.shopContactNo = shopContactNo;

    dataObject.appPassword = appData.appPassword;
    fs.writeFileSync(filePath, JSON.stringify(dataObject));
    console.log("saved Boom !!!");
  } else {
    console.log("errorrrr");
  }
};

const changePassword = () => {
  const oldPassword = elements.oldPasswordInput.value;

  const newPassword = elements.newPassInput.value;

  if (appData.appPassword === oldPassword) {
    dataObject.appPassword = newPassword;
    dataObject.shop_data = appData.shop_data;
    fs.writeFileSync(filePath, JSON.stringify(dataObject));
    console.log("password saved");
  } else {
    console.log(appData.appPassword);
    console.log(oldPassword);
    console.log(newPassword);
    console.log("password not matched");
  }
};

const setDefault = () => {
  elements.shopNameInput.value = appData.shop_data.shopName;
  elements.shopAddressInput.value = appData.shop_data.shopAddress;
  elements.shopEmailInput.value = appData.shop_data.shopEmail;
  elements.shopNumberInput.value = appData.shop_data.shopContactNo;
};

module.exports = {
  settingShopDetail,
  changePassword,
  setDefault,
};
