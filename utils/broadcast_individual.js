const { sheetService } = require('../services/google_sheet');
const { sendTextIndividual } = require('../services/send_message_individual');
const { DOCUMENTS, DELAYS } = require('../config/constants.json');
// const util = require('util')
// const fs = require('fs')

async function broadcastMessageIndividual(client, googleSheets, msg) {
    const sheets = await sheetService(googleSheets);
    const contacts = await sheets.readSheet(DOCUMENTS.BROADCAST_INDIVIDUAL.DOC_REF, DOCUMENTS.BROADCAST_INDIVIDUAL.SHEET)

    let promise = Promise.resolve();
    // get contact list from sheet
    contacts.forEach(contact => {
        promise = promise.then(() => {
            if (contact.active === 'yes') {
                let sheetContact = contact.contacts;
                sheetContact = '91' + sheetContact + '@c.us'
                // format received 10 digit numbers with enable 'yes' from sheet
                // message text received as input to function
                // send message in loop with delay
                // text msg send demo
                //91923456789@c.us
                // if (msg.isMedia === true || msg.type === 'image' || msg.type === 'document' || message.isMMS === true) {
                //     const fileName = `beat-covid-whatsapp1.jpg`
                //     const buffer = await client.decryptFile(msg);
                //     const writeFilePromise = util.promisify(fs.writeFile)
                //     await writeFilePromise(fileName, buffer)
                //     client
                //             .sendImage(
                //                     contact,
                //                     'D:/WhatsappGroupScraping/beat-covid-whatsapp1.jpg',
                //                     'image-name',
                //                     'Caption text'
                //             )
                //             .then((result) => {
                //                     // console.log('Result: ', result); //return object success
                //             }).catch((erro) => {
                //                     console.error('Error when sending: ', erro); //return object error
                //             });

                //  }
                sendTextIndividual(client, sheetContact, msg.body)
            }
            return new Promise((resolve) => {
                setTimeout(resolve, DELAYS.BROADCAST);
            })
        })

    })
    promise.then(function () {
        console.log('BROADCAST_INDIVIDUAL:-- FINISHED BROADCAST --')
    });
}
module.exports = {
    broadcastMessageIndividual
}