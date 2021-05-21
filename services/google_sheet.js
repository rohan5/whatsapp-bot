const { GoogleSpreadsheet } = require('google-spreadsheet');

async function sheetService() {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('xxxxx - sheet id - xxxxxxxx');

  // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  // console.log('AUTHENTICATING SHEETS');
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: "xxxxxxxxx",
  });


  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  // SERVICE METHODS

  async function addToSheet(rowToAdd, sheetName) {
    const sheet = doc.sheetsByTitle[sheetName];
  
    //const moreRows = await sheet.addRows(rowsToAdd);
    return await sheet.addRow(rowToAdd);
  }

  async function readSheet(sheetName) {
    const sheet = doc.sheetsByTitle[sheetName];
    return await sheet.getRows();
  }

  return {
    addToSheet,
    readSheet
  }
}

module.exports = { sheetService };
