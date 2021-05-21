require('dotenv').config()
//console.log(process.env);
const venom = require('venom-bot');

const commands = require('./config/commands.json');
const { runCommand } = require('./utils/command');
const { logMessage } = require('./utils/log_message');

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

        // bulk join and messaging

        // On new message
        client.onMessage(message => {
            // checkIfCommand
            if (commands[message.body]) {
                runCommand(client, message.body);
            }
            logMessage(message);
        })

        // getAllMessagesInChat
        //const messages = await client.getAllMessagesInChat('919729695315-1588869495@g.us');
        // console.log(messages);
        console.log('--------222222222222----------');

        // Retrieve more chat message
        //const moreMessages = await client.loadEarlierMessages('919729695315-1588869495@g.us');
        // console.log(moreMessages);

        // moreMessages.forEach(msg => {
        //     console.log(msg.sender.formattedName, msg.sender.id, '---', msg.body);
        // })
        console.log('-----------33333333333---------------')

        // Retrieve all messages in chat
        // const allMessages = await client.loadAndGetAllMessagesInChat(
        //     '919729695315-1588869495@g.us'
        // );
        // // allMessages.forEach(msg => {
        //     console.log(msg.sender.formattedName, msg.sender.id, '---', msg.body);
        // })

        //start(client);
    })
    .catch((erro) => {
        console.log(erro);
    });
