const { sheetService } = require('../services/google_sheet');
const { DOCUMENTS, DELAYS } = require('../config/constants.json');

async function acceptGroupInvite(client) {
    // read sheet 
    // get array of ids
    // accept invite in loop with delay
    // await client.joinGroup('DLTw8AvVbLkCchmaFob36Y')

    try {
        const sheets = await sheetService();
        const invites = await sheets.readSheet(DOCUMENTS.GROUP_INVITE.DOC_REF, DOCUMENTS.GROUP_INVITE.SHEET);
        const inviteCodeArr = invites
            .filter(invite => {
                if (invite.active === 'yes') return true;
            })
            .map(invite => {
                return invite.invite_url.split('.com/')[1]
            })
        inviteCodeArr.forEach(invite => {
            setTimeout(() => client.joinGroup(invite), DELAYS.ACCEPT_INVITE);
        });
    } catch (error) {
        console.log('-- ERROR IN ACCEPTING INVITE ----');
        console.log(error);
    }
}

module.exports = {
    acceptGroupInvite
}
