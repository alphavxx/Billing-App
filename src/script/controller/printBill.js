const fs = require("fs");

const filePath = `${__dirname}/../../../data/appData.json`;

const { PosPrinter } = require("electron").remote.require(
  "electron-pos-printer"
);

const printTest = (arg) => {
  const appData = JSON.parse(fs.readFileSync(filePath));
  const shopData = appData.shop_data;
  const data = arg;
  const customerData = data.costumer;
  const billData = data.item_list;
  const printData = [];

  function shopHeader(shopName) {
    return {
      type: "text",
      value: `${shopName}`,
      style: `text-align:center;`,
      css: {
        "font-size": "22px",
        "font-weight": "700",
        "text-transform": "uppercase",
        "margin-bottom": "3px",
        "font-family": "sans-serif",
      },
    };
  }

  function shopAddress(shopAddress) {
    return {
      type: "text",
      value: `${shopAddress}`,
      style: `text-align:center;`,
      css: {
        "font-size": "14px",
        "font-weight": "600",
        "margin-bottom": "4px",
        "font-family": "sans-serif",
      },
    };
  }

  function shopContact(shopContactNo, shopEmail) {
    return {
      type: "text",
      value: `${shopEmail} - ${shopContactNo}<br><br>`,
      style: `text-align:center`,
      css: {
        "font-size": "12px",
        "font-weight": "600",
        "margin-bottom": "3px",
        "font-family": "sans-serif",
      },
    };
  }

  function billDate(date) {
    return {
      type: "text",
      value: `Date: ${date}`,
      style: `text-align:left`,
      css: {
        "font-size": "12px",
        "margin-bottom": "-10px",
        "font-family": "sans-serif",
      },
    };
  }

  function billTime(time) {
    return {
      type: "text",
      value: `Time: ${time}`,
      style: `text-align:right`,
      css: {
        "font-size": "12px",
        "margin-bottom": "5px",
        "font-family": "sans-serif",
      },
    };
  }

  function customerPrint(CustomerName, customerNo) {
    return {
      type: "text",
      value: `Customer: ${CustomerName} - ${customerNo} <hr>`,
      css: {
        "font-size": "12px",
        "margin-bottom": "10px",
        "font-family": "sans-serif",
      },
    };
  }

  function totalPrint(totalQty, totalPrice) {
    return {
      type: "text",
      value: `<hr>TOTAL QTY: ${totalQty} <br>TOTAL PRICE: ${totalPrice} <br> <hr>`,
      css: {
        "font-size": "16px",
        "margin-bottom": "10px",
        "font-weight": "600",
        "font-family": "sans-serif",
      },
    };
  }

  function billFooter() {
    return {
      type: "text",
      value: "Thank You! Visit again <br><br>",
      style: `text-align:center`,
      css: {
        "font-size": "12px",
        "margin-bottom": "10px",
        "font-family": "sans-serif",
      },
    };
  }

  const shopHeaderData = shopHeader(shopData.shopName);
  const shopAddressData = shopAddress(shopData.shopAddress);
  const shopContactData = shopContact(
    shopData.shopContactNo,
    shopData.shopEmail
  );
  const billDateData = billDate(data.date);
  const billTimeData = billTime(data.time);
  const customerPrintData = customerPrint(
    customerData.name,
    customerData.number
  );
  const totalPrintData = totalPrint(data.total.quantity, data.total.price);
  const billFooterPrint = billFooter();

  printData.push(shopHeaderData);
  printData.push(shopAddressData);
  printData.push(shopContactData);
  printData.push(billDateData);
  printData.push(billTimeData);
  printData.push(customerPrintData);
  billData.forEach((element) => {
    const nameData = {
      type: "text",
      value: `${element.item_name} <br> Price: ${element.price} Qty: ${element.quantity} Discount: ${element.discount}% `,
      css: {
        "font-size": "12px",
        "margin-bottom": "-12px",
        "font-family": "sans-serif",
      },
    };

    const priceData = {
      type: "text",
      value: `Rs ${element.total}`,
      style: `text-align:right`,
      css: {
        "font-size": "12px",
        "margin-bottom": "10px",
        "font-family": "sans-serif",
      },
    };

    printData.push(nameData);
    printData.push(priceData);
  });
  printData.push(totalPrintData);
  printData.push(billFooterPrint);

  console.log(printData);

  const options = {
    // preview: true, // Preview in window or print
    width: "300px", //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    // printerName: "PRP-250C", // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  PosPrinter.print(printData, options)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });

  console.log(data);
  console.log(shopData);
  console.log(customerData);
  console.log(billData);
};

module.exports = printTest;
