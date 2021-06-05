async function sendTextIndividual(client, sheetContact, message) {
    const some = "abcd"
    await client
        .sendText(sheetContact, message)
        .then(async (result) => {
            //console.log('Result: ', result);
            //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
    return some
}
module.exports = {
    sendTextIndividual
}