const { sheetService } = require('../services/google_sheet');
const { DOCUMENTS } = require('../config/constants.json');
const Message = require('../model/message')
async function logMessage(googleSheets, msg) {
    try {
        const sheets = await sheetService(googleSheets);

        // let arrayToadd = [];
        // console.log(msg);
        // console.log(msg.isGroupMsg, msg.chat.id, msg.chat.name, msg.sender.id, msg.sender.pushname, msg.body, msg.type, msg.timestamp);
        let msgToLog = {
            isGroup: msg.isGroupMsg,
            msgType: msg.type,
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
        await Message.create(msgToLog)
        //sheets.addToSheet(DOCUMENTS.MESSAGES.DOC_REF, DOCUMENTS.MESSAGES.SHEET, msgToLog);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    logMessage
}