const customTitlebar = require("custom-electron-titlebar");

const elements = require("./script/elements");
const adminAuthoController = require("./script/controller/adminAutho");
const searchState = require("./script/view/autoSuggest");
const billController = require("./script/controller/billController");
const stockController = require("./script/controller/stockController");
const backupData = require("./script/controller/exportDatasettings");
const historyController = require("./script/controller/historyController");
const printerController = require("./script/controller/printBill");
const settingsController = require("./script/controller/settingController");
const displaySetScreen = require("./script/controller/shopInfoScreen");
const sortController = require("./script/controller/sortController");
const timeController = require("./script/controller/time");
const deleteData = require("./script/controller/deleteBillData");

new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex("#444"),
});

//MAIN

displaySetScreen();

setInterval(timeController, 1000);

stockController.stockLoad();

historyController();

sortController.sortDropList();

settingsController.setDefault();

deleteData();

//EVENT

// Bill event
addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  billController.addBill();

  elements.itemName.value = "";
  elements.price.value = "";
  elements.quantity.value = "";
  elements.discount.value = "";
});

elements.itemName.addEventListener("input", () =>
  searchState(elements.itemName.value)
);

printBtn.addEventListener("click", (e) => {
  const data = billController.storeBill();
  printerController(data);
  historyController();
});

//Admin Autho EVENT
elements.adminAuthoBtn.addEventListener("click", (e) => {
  adminAuthoController();
  elements.adminAuthoInput.value = "";
});

//For history screen
elements.adminAuthoBtnHS.addEventListener("click", (e) => {
  adminAuthoController();
  elements.adminAuthoInputHS.value = "";
});

//Stock event
elements.stockAddBtn.addEventListener("click", (e) => {
  stockController.addStock();
  elements.stockNameInput.value = "";
  elements.stockPriceInput.value = "";
  elements.stockQuantityInput.value = "";
});

//Sort event
elements.sortButton.addEventListener("click", (e) => {
  e.preventDefault();
  sortController.sortDataPrice();
});

// Settings event
elements.settingsSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  settingsController.settingShopDetail();
});

elements.settingsChangeBtn.addEventListener("click", (e) => {
  settingsController.changePassword();
  elements.oldPasswordInput.value = "";
  elements.newPassInput.value = "";
});

elements.settingsExportBtn.addEventListener("click", (e) => {
  backupData();
});
