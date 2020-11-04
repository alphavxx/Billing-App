const fs = require("fs");
const elements = require("../elements");

const filePath = `${__dirname}/../../../data/appData.json`;

const setShopInfo = () => {
  const appData = JSON.parse(fs.readFileSync(filePath));

  elements.shopNameDisplay.textContent = appData.shop_data.shopName;
  elements.shopAddressDisplay.textContent = appData.shop_data.shopAddress;
  elements.shopMailIdDisplay.textContent = appData.shop_data.shopEmail;
  elements.shopNumberDisplay.textContent = appData.shop_data.shopContactNo;
};

module.exports = setShopInfo;
