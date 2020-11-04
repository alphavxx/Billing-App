const fs = require("fs");

const FilePath = `${__dirname}/../../../data/productData.json`;
let billData = JSON.parse(fs.readFileSync(FilePath));

const deleteOldData = () => {
  if (billData.length >= 4000) {
    for (let i = 0; i <= 200; i++) {
      billData.shift();
    }
  }
  fs.writeFileSync(FilePath, JSON.stringify(billData));
};

module.exports = deleteOldData;
