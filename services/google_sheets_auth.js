const { GoogleSpreadsheet } = require('google-spreadsheet');

async function authGoogleSheets(documentToAuth) {
    try {
        // Initialize the sheet - doc ID is the long id in the sheets URL
        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        // console.log('AUTHENTICATING SHEETS');


        switch (documentToAuth) {
            case 'docMessages':
                const docMessages = new GoogleSpreadsheet(process.env.GOOGLE_MESSAGES_SHEET_ID);
                await docMessages.useServiceAccountAuth({
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY,
                });
                await docMessages.loadInfo(); // loads document properties and worksheets
                console.log(docMessages.title, 'loaded');
                return {
                    docMessages
                };
                break;
            case 'docBroadcast':
                const docBroadcast = new GoogleSpreadsheet(process.env.GOOGLE_BROADCAST_SHEET_ID);
                await docBroadcast.useServiceAccountAuth({
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY,
                });
                await docBroadcast.loadInfo(); // loads document properties and worksheets
                console.log(docBroadcast.title, 'loaded');
                return {
                    docBroadcast
                };
                break;
            case 'docGroupInvite':
                const docGroupInvite = new GoogleSpreadsheet(process.env.GOOGLE_GROUP_INVITE_SHEET_ID);
                await docGroupInvite.useServiceAccountAuth({
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY,
                });
                await docGroupInvite.loadInfo(); // loads document properties and worksheets
                console.log(docGroupInvite.title, 'loaded');
                return {
                    docGroupInvite
                };
                break;

            default:
                break;
        }

        return false;
    } catch (error) {
        console.log('-- ERROR IN GOOGLE SHEET AUTH ---');
        console.log(error);
    }
}

module.exports = {
    authGoogleSheets
};
