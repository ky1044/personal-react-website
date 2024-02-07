const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");
fs.readFile(dataPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const json = JSON.parse(data);
  json.latestDeploy = Date.now();

  fs.writeFile(dataPath, JSON.stringify(json, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(
        "Data updated successfully. File name: " +
          dataPath +
          ". Data: " +
          JSON.stringify(json, null, 2)
      );
    }
  });
});
