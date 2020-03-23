const readline = require('readline');
const { google } = require('googleapis');
const { SHEETS_VERSION, RANGE } = require("./config");
const { error, info } = require("./logger");

module.exports = class {
  constructor(auth) {
    this.sheets = google.sheets({
      version: SHEETS_VERSION,
      auth
    });
  }

  getSheet(callback) {
    const sheets = this.sheets;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the id of the spreadsheet: ', (spreadsheetID) => {
      rl.close();
      const options = {
        spreadsheetId: spreadsheetID,
        range: RANGE,
        majorDimension: "ROWS"
      };

      info(`Reading spreadsheet by id: ${spreadsheetID}`);

      sheets.spreadsheets.values.get(options, (err, res) => {
        if (err) {
          if (callback) return callback({ err: err });
          else return error(err);
        } else {
          const values  = res.data.values;
          const tmp = {
            courses: values[0][0].split(","),
            teachers: values[0][1].split(","),
            students: values[0][2].split(",")
          }
          const parse = (value) => {
            if (value !== "")
              return value;
          }
          const response = {
            courses: tmp.courses.filter(parse),
            teachers: tmp.teachers.filter(parse),
            students: tmp.students.filter(parse)
          };

          if (callback) return callback({ res: response });
          else return info(res.data.values);
        }
      });
    });
  }
};
