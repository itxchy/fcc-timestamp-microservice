
const compression = require('compression');
const express     = require('express');
const _           = require('lodash');
const moment      = require('moment');
const app         = express();

app.use(compression());

app.use('/', express.static(__dirname + '/public'));

app.get('/:time', (req, res) => {

    let time = req.params.time;
    let timestamp = timeHelpers.isUnixTimestamp(time);
    let naturalDate = null;
    let convertedTimes = {
        unix: null,
        naturalDate: null
    };

    if (req.url === '/favicon.ico') {
        return;
    }

    // if timestamp is true, proceed
    if (timestamp) {
        convertedTimes.unix = timestamp;
        convertedTimes.naturalDate = moment.unix(timestamp).format('MMMM Do YYYY');
        return res.json(convertedTimes);
    }

    naturalDate = timeHelpers.validateDate(time);

    // if a valid natural date was passed as a param, parse it.
    if (naturalDate) {
        convertedTimes.unix = moment(naturalDate, 'MMMM Do YYYY').unix();
        convertedTimes.naturalDate = naturalDate;
        return res.json(convertedTimes);
    }

    console.log(`ERROR: ${time} is not a valid Unix time or date.`)

    return res.json(convertedTimes);
});

var timeHelpers = (function () {

    // returns a number or false
    function isUnixTimestamp (time) {

        let timeNumber = _.toNumber(time);

        if ( isNaN(timeNumber) ) {
            console.log(`ERROR: ${timeNumber} is not a number.`)
            return false;
        } else if ( timeNumber < 0 ) {
            console.log(`ERROR: ${timeNumber} is less than zero.`)
            return false;
        }
        else {
            return timeNumber;
        }
    }

    // returns a string of the valid date, or false
    function validateDate (time) {

        let checkDate = moment(time, 'MMMM Do YYYY', true).isValid;

        let parsingFlagsObj = moment(time, 'MMMM Do YYYY', true).parsingFlags();

        console.log('parsing obj', parsingFlagsObj);

        /** if checkDate is true, and the invalidMonth property of .isValid's parsing flags is null, 
         *  the date is valid. If invalidMonth's value is a mispelled month (or anything else), 
         *  the date is invalid.
         */
        if (checkDate && !parsingFlagsObj.invalidMonth) {
            return time;
        } else {
            return false;
        }
    }

    return {
        isUnixTimestamp: isUnixTimestamp,
        validateDate: validateDate
    };

})();

var server = app.listen(4000, () => {
    console.log('Express app listening on port 4000!');
});

module.exports = {
    server: server,
    timeHelpers: timeHelpers
};