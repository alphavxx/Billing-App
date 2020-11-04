const fs = require("fs");

const displayInscreen = require("./../view/billView");
const elements = require("./../elements");

const productName = document.getElementById("itemName");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const discount = document.getElementById("discount");

const costumerName = document.getElementById("costumerName");
const costumerNumber = document.getElementById("costumerNumber");

const stockFilePath = `${__dirname}/../../../data/stockData.json`;
let stockData = JSON.parse(fs.readFileSync(stockFilePath));

const date = new Date();
const date_year = date.getFullYear();
const date_month = date.getMonth() + 1;
const date_date = date.getDate();

const state = {};
// state.bill_ID = parseInt(
//   `${date_year}${date_month < 10 ? "0" + date_month : date_month}${bill_id}`
// );
state.date = `${date_year}-${
  date_month < 10 ? "0" + date_month : date_month
}-${date_date}`;
state.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
state.costumer = {};
state.item_list = [];
state.total = {};

//controllers
const billDataWrite = () => {
  const billState = {};

  billState.item_name = productName.value || "item-name";
  billState.price = parseInt(price.value);
  billState.quantity = parseInt(quantity.value) || 1;
  billState.discount = parseInt(discount.value) || 0;

  const disAmount = (billState.price * billState.discount) / 100;
  billState.total = Math.round(
    (billState.price - disAmount) * billState.quantity
  );

  if (price.value !== "" && !isNaN(price.value) && price.value > 0) {
    stockData = JSON.parse(fs.readFileSync(stockFilePath));

    state.item_list.push(billState);
    displayInscreen(billState);

    //Manipulating the stock data
    const gotData = stockData.findIndex((el, index) => {
      if (
        el.stock_name === productName.value &&
        el.stock_price == parseInt(price.value)
      ) {
        return index;
      }
    });

    console.log(gotData);

    if (gotData > -1) {
      stockData[gotData].stock_quantity -= billState.quantity;

      elements.billStockError.style.display = "none";
    } else {
      elements.billStockError.style.display = "block";
    }

    state.total.price = 0;
    state.total.quantity = 0;

    state.item_list.forEach((el) => {
      state.total.price = state.total.price + el.total;
      state.total.quantity = state.total.quantity + el.quantity;
    });
    elements.totalAmount.textContent = state.total.price;
    elements.totalquantity.textContent = state.total.quantity;

    price.classList.remove("red-focus");
  } else {
    price.classList.toggle("red-focus");
  }
};

const storeData = () => {
  //Write in data file
  const FilePath = `${__dirname}/../../../data/productData.json`;
  const productData = JSON.parse(fs.readFileSync(FilePath));

  state.costumer.name = costumerName.value || "cash costumer";
  state.costumer.number = costumerNumber.value || "0000";

  // const newID = productData[productData.length - 1].bill_ID + 1;
  const newID = parseInt(
    `${date_year}${date_month < 10 ? "0" + date_month : date_month}${
      productData.length
    }`
  );
  const newBill = Object.assign({ bill_ID: newID }, state);

  productData.push(newBill);

  fs.writeFileSync(FilePath, JSON.stringify(productData));
  fs.writeFileSync(stockFilePath, JSON.stringify(stockData));

  return newBill;
};

module.exports = {
  addBill: billDataWrite,
  storeBill: storeData,
};

// const fs = require("fs");

// const date = new Date();
// const date_year = date.getFullYear();
// const date_month = date.getMonth();
// const date_date = date.getDate();

// const state = {};
// state.bill_ID = `${date_year}${date_month}${date_date}`;
// state.date = `${date_date}-${date_month}-${date_year}`;
// state.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// state.costumer = {};
// state.item_list = [];
// state.total = {};

// const billListBody = document.getElementById("table-bill-container");

// const costumerName = document.getElementById("costumerName");
// const costumerNumber = document.getElementById("costumerNumber");

// const productName = document.getElementById("itemName");
// const price = document.getElementById("price");
// const quantity = document.getElementById("quantity");
// const discount = document.getElementById("discount");

// const addbtn = document.getElementById("addbtn");
// const printBtn = document.getElementById("printBtn");

// const billDataWrite = () => {
//   state.item_list.product.name = productName.value || "item-name";
//   state.item_list.product.price = price.value;
//   state.item_list.product.quantity = quantity.value || 1;
//   state.item_list.product.discount = discount.value || 1;
//   state.item_list.product.total =
//     (price.value - (quantity.value / 100) * discount.value) * quantity.value;

//   console.log(state);
//   //   displayInscreen(state);

//   //Write in data file
//   const FilePath = `${__dirname}/../data/productData.json`;
//   const productData = JSON.parse(fs.readFileSync(FilePath));

//   const newID = productData[productData.length - 1].id + 1;
//   const newBill = Object.assign({ id: newID }, state.item_list);

//   productData.push(state);

//   fs.writeFileSync(FilePath, JSON.stringify(productData));
// };

// // garbage
