const fs = require("fs");
const elements = require("./../elements");
const priceDropdown = require("./../view/sortView");
const historyView = require("./../view/historyView");

const FilePath = `${__dirname}/../../../data/productData.json`;
const stockFilePath = `${__dirname}/../../../data/stockData.json`;
let stockData = JSON.parse(fs.readFileSync(stockFilePath));
let billData = JSON.parse(fs.readFileSync(FilePath));

const sortDropList = () => {
  const dropList = elements.priceSortDropDown;
  //Stock price to drop down list
  if (dropList !== "" && dropList.value !== "none") {
    elements.priceSortDropDown.innerHTML = "";
  }
  stockData.forEach((data) => {
    priceDropdown(data.stock_price);
  });
};

const sortDataPrice = () => {
  const e = elements.priceSortDropDown;
  const date_start = elements.InputDateStart.value;
  const date_end = elements.InputDateEnd.value;
  const result = e.options[e.selectedIndex].value;
  const bill_price = [];
  const sortedData = [];
  let dateSortedData = [];

  // to seperate the bill-item-list from the whole productData.json file
  const newData = billData.map((data) => {
    let x = {
      date: data.date,
      item_list: data.item_list,
    };
    return x;
  });

  // to convert the every array to single array with date
  newData.forEach((data) => {
    data.item_list.forEach((innerdata) => {
      let x = {
        date: data.date,
        innerdata,
      };
      bill_price.push(x);
    });
  });

  //to find the start date and end date index
  const startIndex = bill_price.findIndex((data) => {
    return date_start == data.date;
  });
  const endIndex = bill_price.findIndex((data) => {
    return date_end == data.date;
  });

  //to get the sorted date array
  if (date_start || date_end) {
    for (
      let i = startIndex == -1 ? startIndex + 1 : startIndex;
      i < endIndex + 1;
      i++
    ) {
      dateSortedData.push(bill_price[i]);
    }
  } else {
    bill_price.forEach((pricefit) => {
      if (pricefit === undefined) {
        return 0;
      }
      if (pricefit.innerdata.price == result) {
        sortedData.push(pricefit);
      } else {
        return 0;
      }
    });
  }

  // to get the get the dated and with the given price
  if (!(result == "none")) {
    if (date_start || date_end) {
      dateSortedData.forEach((pricefit) => {
        if (pricefit === undefined) {
          return 0;
        }
        if (pricefit.innerdata.price == result) {
          sortedData.push(pricefit);
        } else {
          return 0;
        }
      });
    }
  }

  elements.historyListContainer.innerHTML = "";
  if (result == "none") {
    //to get and bill data from the selected date
    dateSortedData.forEach((el) => {
      historyView(el.innerdata, el.date);
    });
  } else {
    // to get a particular priced data from selected date
    sortedData.forEach((el) => {
      historyView(el.innerdata, el.date);
    });
  }
};

module.exports = {
  sortDropList,
  sortDataPrice,
};
