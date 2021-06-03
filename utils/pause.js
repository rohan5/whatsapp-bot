const pause = (DELAYS) => {
    return new Promise(resolve => setTimeout(resolve, DELAYS.BROADCAST))
}
module.exports = pause