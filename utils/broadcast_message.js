const { sheetService } = require('../services/google_sheet');
const { getAllChatGroups } = require('../services/get_groups');
const { chatReply } = require('../services/send_message');
const { DOCUMENTS, DELAYS } = require('../config/constants.json');

async function broadcastMessage(client) {
    const sheets = await sheetService();
    // read message from google sheet
    const messages = await sheets.readSheet(DOCUMENTS.BROADCAST.DOC_REF, DOCUMENTS.BROADCAST.SHEET);
    // messages.forEach(message => {
    //     if (message.enable === 'yes') {
    //         sendMessage();
    //     }
    // });
    if(messages[0].active === 'yes') {
        const message = messages[0].message;

        // get all groups
        const chatGroups = await getAllChatGroups(client);

        // send message in loop to ALL THE GROUPS
        chatGroups.forEach(group => {
            //if (group.name === 'Me and') {
                setTimeout(() => chatReply(client, group.id._serialized, message), DELAYS.BROADCAST);
            //}
        });
    }
}

module.exports = {
    broadcastMessage
}
