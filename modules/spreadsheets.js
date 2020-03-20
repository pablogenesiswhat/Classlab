const readline = require('readline');
const { google } = require('googleapis');
const { SHEETS_VERSION } = require("./config");

module.exports = class {
  constructor(auth) {
    this.sheets = google.sheets({
      version: SHEETS_VERSION,
      auth
    });
  }

  getSheetCourse() {
    const sheets = this.sheets;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the id of the spreadsheet: ', (spreadsheetID) => {
      rl.close();
      const options = {
        spreadsheetId: spreadsheetID
      };

      sheets.spreadsheets.get(options, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data.sheets);
      });
    });
  }
};
