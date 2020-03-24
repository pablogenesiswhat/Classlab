require('dotenv').config();

const fs = require('fs');
const { SCOPES, TOKEN_PATH, CREDENTIAL_PATH } = require("./config");
const readline = require('readline');
const { google } = require('googleapis');

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(callback) {
  const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "urn:ietf:wg:oauth:2.0:oob");

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function login(credentials) {
  const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "urn:ietf:wg:oauth:2.0:oob");

  return getNewToken(oAuth2Client);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error while trying to retrieve access token', err);
        if (callback)
          return callback(undefined, err);
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          console.erro('Dont save Token', err);
          if (callback)
            return callback(undefined, err);
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      if (callback)
        callback(oAuth2Client);
    });
  });
}

module.exports = class {
  exec() {
    // Load client secrets from a local file.
    const promise = new Promise((resolve, reject) => {
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize((auth, err) => {
          if (err) return reject(err);
          return resolve(auth);
        });
    });

    return promise;
  }

  login(callback) {
    // Load client secrets from a local file.
    fs.readFile(CREDENTIAL_PATH, (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      login(JSON.parse(content), callback);
    });
  }
};
