//const { GoogleSpreadsheet } = require('google-spreadsheet');
const { authGoogleSheets } = require('./google_sheets_auth');
const { DOCUMENTS } = require('../config/constants.json');
// require all sheets
async function sheetService() {
  
  // SERVICE METHODS
  
  async function addToSheet(document, sheetName, rowToAdd) {
    const documents = await authGoogleSheets(document);
    const sheet = documents[document].sheetsByTitle[sheetName];
    //const moreRows = await sheet.addRows(rowsToAdd);
    return await sheet.addRow(rowToAdd);
  }

  async function readSheet(document, sheetName) {
    const documents = await authGoogleSheets(document);
    const sheet = documents[document].sheetsByTitle[sheetName];
    return await sheet.getRows();
  }

  return {
    addToSheet,
    readSheet
  }
}

module.exports = { sheetService };
