require('dotenv').config()
const venom = require('venom-bot');
const fs = require('fs');
const mime = require('mime-types');
const commands = require('./config/commands.json');
const { runCommand } = require('./utils/command');
const { logMessage } = require('./utils/log_message');
const { awsUpload } = require('./utils/awsUpload');
//const { chatReply } = require('./services/send_message');
const { authGoogleSheets } = require('./services/google_sheets_auth');


require('./config/db')


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
            if (message.isMedia === true || message.isMMS === true) {
                const buffer = await client.decryptFile(message);
                // At this point you can do whatever you want with the buffer
                // Most likely you want to write it into a file
                const fileName = `beat-covid-whatsapp.${mime.extension(message.mimetype)}`;
                data = await awsUpload(fileName, buffer)
                message.attachment = data.Location
                logMessage(googleSheets, message);
            }
            else
                logMessage(googleSheets, message);
        })

        // bulk join and messaging
        // accept invite
        // https://chat.whatsapp.com/LwtK8oNgHEJJRVYH7ajDE2
        // https://chat.whatsapp.com/C5U7TTuY3wJ39VqrU4owoh
        // https://chat.whatsapp.com/DLTw8AvVbLkCchmaFob36Y
        //console.log(await client.joinGroup('DLTw8AvVbLkCchmaFob36Y'));
        // await client
        // .sendMessageOptions(
        //   '919594445366@c.us',
        //   'did you get this message ? -- Rohan',
        //    {
        //      // quotedMessageId: reply,
        //     }
        // )
        // .then((retorno) => {
        //   resp = retorno;
        // })
        // .catch((e) => {
        //   console.log(e);
        // });

        // On new message
        // console.log(await chatReply(client, '919729140966@c.us', 'did you get this message ? -- Rohan'));
        //console.log(await chatReply(client, '919594445366@c.us', 'did you get this message ? -- Rohan'));

        // await client
        //     .sendText('9729140966@c.us', 'did you get this message 2? -- Rohan')
        //     .then((result) => {
        //         console.log('Result: ', result); //return object success
        //     })
        //     .catch((erro) => {
        //         console.error('Error when sending: ', erro); //return object error
        //     });

        // getAllMessagesInChat
        //const messages = await client.getAllMessagesInChat('919729695315-1588869495@g.us');
        // console.log(messages);
        //console.log('--------222222222222----------');

        // Retrieve more chat message
        //const moreMessages = await client.loadEarlierMessages('919729695315-1588869495@g.us');
        // console.log(moreMessages);

        // moreMessages.forEach(msg => {
        //     console.log(msg.sender.formattedName, msg.sender.id, '---', msg.body);
        // })
        //console.log('-----------33333333333---------------')

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
