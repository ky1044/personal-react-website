const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

async function updateData() {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    const json = JSON.parse(data);
    json.latestDeploy = Date.now();

    await fs.writeFile(dataPath, JSON.stringify(json, null, 2), "utf8");

    console.log(
      "Data updated successfully. File name: " +
        dataPath +
        ". Data: " +
        JSON.stringify(json, null, 2)
    );
  } catch (err) {
    console.error("Error:", err);
  }
}

updateData();
