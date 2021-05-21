const { sheetService } = require('../services/google_sheet');
const { getAllChatGroups } = require('../services/get_groups');
const { chatReply } = require('../services/send_message');


async function broadcastMessage(client) {
    const sheets = await sheetService();
    // read message from google sheet
    const messages = await sheets.readSheet('MSG_BROADCAST');
    // messages.forEach(message => {
    //     if (message.enable === 'yes') {
    //         sendMessage();
    //     }
    // });
    if(messages[0].active === 'yes') {
        const message = messages[0].message;

        // get all groups
        const chatGroups = await getAllChatGroups(client);

        // send message in loop
        chatGroups.forEach(group => {
           // if (group.name === 'Me and') {
                chatReply(client, group.id._serialized, message);
         //   }
        });
    }
}

module.exports = {
    broadcastMessage
}
