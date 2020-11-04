const fs = require("fs");
const elements = require("./../elements");
const stockView = require("./../view/stockView");

const state = {};

const FilePath = `${__dirname}/../../../data/stockData.json`;
let stockDataRaw = JSON.parse(fs.readFileSync(FilePath));

// sort the stock data by name
let stockData = stockDataRaw.sort(function (a, b) {
  var nameA = a.stock_name; // ignore upper and lowercase
  var nameB = b.stock_name; // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

const addStock = () => {
  const nameValue = elements.stockNameInput.value;
  const priceValue = parseInt(elements.stockPriceInput.value);
  const quantityValue = parseInt(elements.stockQuantityInput.value);

  const inputTest =
    nameValue !== "" &&
    priceValue !== "" &&
    quantityValue !== " " &&
    !isNaN(priceValue) &&
    !isNaN(quantityValue) &&
    priceValue > 0 &&
    quantityValue > -1;

  if (inputTest) {
    state.stock_price = priceValue;
    state.stock_quantity = quantityValue;
    state.stock_name = nameValue;

    stockData = JSON.parse(fs.readFileSync(FilePath));

    const gotData = stockData.findIndex((el, index) => {
      if (el.stock_name === nameValue && el.stock_price === priceValue) {
        return index;
      }
    });

    if (gotData > -1 && quantityValue > 0) {
      //to load the stock
      stockData[gotData].stock_quantity += quantityValue;
      fs.writeFileSync(FilePath, JSON.stringify(stockData));
    } else if (quantityValue === 0 && gotData !== -1) {
      // to delete the stock from stock list
      stockData.pop(gotData);
      fs.writeFileSync(FilePath, JSON.stringify(stockData));
    } else {
      // to add new stock
      stockData.push(state);
      fs.writeFileSync(FilePath, JSON.stringify(stockData));
    }

    elements.stockNameList.innerHTML = "";
    elements.stockQuantityList.innerHTML = "";
    elements.stockPriceList.innerHTML = "";

    stockData.forEach((element) => {
      stockView(element);
    });

    elements.stockErrorBox.style.display = "none";
  } else {
    elements.stockErrorBox.style.display = "block";
  }
};

const stockLoad = () => {
  stockData.forEach((element) => {
    stockView(element);
  });
};

module.exports = {
  addStock,
  stockLoad,
};

/*
 { "stock_price": 11, "stock_quantity": 11 },
  { "stock_price": 100, "stock_quantity": 2336 },
  { "stock_price": 1000, "stock_quantity": 150 },
  { "stock_price": 2500, "stock_quantity": 100 },
  { "stock_price": 11, "stock_quantity": 12 },
  { "stock_price": 200, "stock_quantity": 2000 }
*/

/*
   { "stock_price": 0, "stock_quantity": 0, "stock_name": "shirt" },
  { "stock_price": 100, "stock_quantity": 769, "stock_name": "T-shirt" },
  { "stock_price": 700, "stock_quantity": 29, "stock_name": "pant" },
  { "stock_price": 1000, "stock_quantity": 692, "stock_name": "shirt" },
  { "stock_price": 800, "stock_quantity": 10, "stock_name": "shirt" },
  { "stock_price": 899, "stock_quantity": 100, "stock_name": "shirt" },
  { "stock_price": 499, "stock_quantity": 80, "stock_name": "shirt" },
  { "stock_price": 1200, "stock_quantity": 100, "stock_name": "shirt" },
  { "stock_price": 500, "stock_quantity": 72, "stock_name": "shirt" },
  { "stock_price": 99999, "stock_quantity": 1, "stock_name": null }
*/
