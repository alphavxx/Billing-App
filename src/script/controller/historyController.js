const fs = require("fs");
const historyView = require("./../view/historyView");

const FilePath = `${__dirname}/../../../data/productData.json`;
let billData = JSON.parse(fs.readFileSync(FilePath));

// const e = elements.priceSortDropDown;
// const result = e.options[e.selectedIndex].value;
// const productData = billData.map((element) => {
//   return element.item_list;
// });

const renderList = () => {
  billData.forEach((data) => {
    const exportData = [];
    exportData.push(data.item_list);

    exportData.forEach((element) => {
      element.forEach((el) => {
        historyView(el, data.date);
      });
    });
  });

  // //Stock price to drop down list
  // stockData.forEach((data) => {
  //   priceDropdown(data.stock_price);
  //   console.log(result);
  // });

  // productData.forEach((element) => {
  //   element.forEach((el) => {
  //     historyView(el);
  //   });
  // });
};

module.exports = renderList;
