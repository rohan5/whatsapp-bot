const { sheetService } = require('../services/google_sheet');

async function logMessage(msg) {
    const sheets = await sheetService();

    // let arrayToadd = [];
    // console.log(msg);
    console.log(msg.isGroupMsg, msg.chat.id, msg.chat.name, msg.sender.id, msg.sender.pushname, msg.body, msg.type, msg.timestamp);
    let msgToLog = {
        isGroup: msg.isGroupMsg,
        groupName: msg.chat.name,
        content: msg.body   
    };
    //arrayToadd.push(msgToLog);
    sheets.addToSheet(msgToLog, 'MESSAGES');
}

module.exports = {
    logMessage
}