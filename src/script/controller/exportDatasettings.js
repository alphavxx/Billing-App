const electron = require("electron");
const path = require("path");
const fs = require("fs");
// Importing dialog module using remote
const dialog = electron.remote.dialog;

const exportData = () => {
  const FilePath = `${__dirname}/../../../data/productData.json`;
  const productData = fs.readFileSync(FilePath);
  // Resolves to a Promise<Object>
  dialog
    .showSaveDialog({
      title: "Select the File Path to save",
      defaultPath: path.join(__dirname, "../assets/exported-data.json"),
      // defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: "Save",
      // Restricting the user to only Text Files.
      filters: [
        {
          name: "JSON Files",
          extensions: ["json", "txt", "docx"],
        },
      ],
      properties: [],
    })
    .then((file) => {
      // Stating whether dialog operation was cancelled or not.
      if (!file.canceled) {
        // Creating and Writing to the sample.txt file
        fs.writeFile(file.filePath.toString(), productData, function (err) {
          if (err) throw err;
          console.log("Saved!");
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = exportData;
