const { google } = require("googleapis");
// const keys = require("./credentials.json");
require("dotenv").config();

// const auth = new google.auth.GoogleAuth({
//   credentials: keys,
//   scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
// });


const SHEET_ID = process.env.SHEET_ID;

async function getSheetData() {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS_JSON, "base64").toString("utf8")
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A1:G2",
  });

  const rows = res.data.values;
  const keys = rows[0];
  const values = rows[1];
  const data = {};

  keys.forEach((key, i) => {
    const value = values[i];
    data[key] = isNaN(value) ? value : parseFloat(value);
  });

  return data;
}

module.exports = { getSheetData };
