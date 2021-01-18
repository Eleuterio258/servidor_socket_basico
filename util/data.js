const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const dayFormat = today.toUTCString();
module.exports = {
    dayFormat
}