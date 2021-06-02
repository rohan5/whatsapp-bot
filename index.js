require('dotenv').config();
const venom = require('venom-bot');
const fs = require('fs');
const commands = require('./config/commands.json');
const { runCommand } = require('./utils/command');
const { logMessage } = require('./utils/log_message');
//const { chatReply } = require('./services/send_message');
const { authGoogleSheets } = require('./services/google_sheets_auth');

require('./config/db');

venom
    .create(
        'sessionName',
        undefined,
        (statusSession, session) => {
            console.log('Status Session: ', statusSession);
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
            //Create session wss return "serverClose" case server for close
            console.log('Session name: ', session);
            // Retrieve all groups

        },
        undefined
    )
    .then(async (client) => {
        const googleSheets = await authGoogleSheets();
        client.onMessage(async message => {
            // checkIfCommand
            if (commands[message.body]) {
                runCommand(client, googleSheets, message.body);
            }
            // for one to one 
            // if(sender in configured oneTOOnenumber number){
            //  call oneTonebulk method and send message text
            // }

            // for bulk group
            // if(sender in configured bulkgroup number){
            //  call groupbulk method
            // }

            logMessage(client, googleSheets, message);
        })
    })
    .catch((erro) => {
        console.log(erro);
    });
