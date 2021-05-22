const { broadcastMessage } = require('./broadcast_message');
const { acceptGroupInvite } = require('../services/accept_invite');

function runCommand(client, cmd) {
    switch (cmd) {
        case 'INITIATE_MSG_BROADCAST@007':
            broadcastMessage(client);
            break;
        case 'INITIATE_INVITE_ACCEPT@007':
            acceptGroupInvite(client);
            break;
        default:
            break;
    }
}

module.exports = {
    runCommand
}