const { broadcastMessage } = require('./broadcast_message');

function runCommand(client, cmd) {
    switch (cmd) {
        case 'INITIATE_MSG_BROADCAST@007':
            broadcastMessage(client);
            break;
        case 'INITIATE_INVITE_ACCEPT@007':
            acceptGroupInvite();
            break;
        default:
            break;
    }
}


function acceptGroupInvite() {
    
}

module.exports = {
    runCommand
}