const { sheetService } = require('../services/google_sheet');
const { DOCUMENTS } = require('../config/constants.json');

async function logMessage(msg) {
    const sheets = await sheetService();

    // let arrayToadd = [];
    // console.log(msg);
    // console.log(msg.isGroupMsg, msg.chat.id, msg.chat.name, msg.sender.id, msg.sender.pushname, msg.body, msg.type, msg.timestamp);
    let msgToLog = {
        isGroup: msg.isGroupMsg,
        type: msg.type,
        groupChatId: msg.chat.id,
        groupName: msg.chat.name,
        senderId: msg.sender.id,
        senderName: msg.sender.pushname,
        body: msg.body,
        caption: msg.caption,
        lat: msg.lat,
        lng: msg.lng,
        timestamp: msg.timestamp,
        dump: JSON.stringify(msg)
    };
    //arrayToadd.push(msgToLog);
    sheets.addToSheet(DOCUMENTS.MESSAGES.DOC_REF, DOCUMENTS.MESSAGES.SHEET, msgToLog);
}

module.exports = {
    logMessage
}