const OAuth = require("../../modules/auth");
const Sheets = require("../../modules/spreadsheets");
const { google } = require('googleapis');

const oauth = new OAuth();

oauth.exec()
  .then(auth => {
    const sheets = new Sheets(auth);
    sheets.getSheetCourse();
  })
  .catch(e => {
    console.error(e);
  });
