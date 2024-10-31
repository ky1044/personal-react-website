const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

const ATHELETE_ID = 9966064;

async function updateData() {
  try {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

    const data = await fs.readFile(dataPath, "utf8");
    const json = JSON.parse(data);

    const accessTokenResp = await fetch(
      `https://www.strava.com/api/v3/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );
    if (!accessTokenResp.ok) {
      throw new Error("error getting access token", accessTokenResp.text());
    }
    const accessTokenData = await accessTokenResp.json();

    const accessToken = accessTokenData.access_token;

    const atheleteResp = await fetch(
      `https://www.strava.com/api/v3/athletes/${ATHELETE_ID}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!atheleteResp.ok) {
      throw new Error("error getting athelete data", atheleteResp.text());
    }
    const atheleteData = await atheleteResp.json();
    const ytdDistance = Math.floor(atheleteData.ytd_run_totals.distance / 1000);
    const allTimeDistance = Math.floor(
      atheleteData.all_run_totals.distance / 1000
    );
    json.stravaStats = {
      ytdDistance,
      allTimeDistance,
    };

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
