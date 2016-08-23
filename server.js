const compression = require('compression');
const express     = require('express');
const _           = require('lodash');
const moment      = require('moment');
const app         = express();

app.use(compression());

app.use('/', express.static(__dirname + '/public'));

app.get('/:time', (req, res) => {

    // ignore requests for favicaon.ico
    if (req.url === '/favicon.ico') {
        return;
    }

    let time = req.params.time;
    let timestamp = timeHelpers.isUnixTimestamp(time);
    let naturalDate = null;
    let convertedTimes = {
        unix: null,
        naturalDate: null
    };

    // if timestamp is true, craft a JSON response
    if (timestamp) {
        convertedTimes.unix = timestamp;
        convertedTimes.naturalDate = moment.unix(timestamp).format('MMMM Do YYYY');
        return res.json(convertedTimes);
    }

    // if a valid natural date was passed as a param, parse it and craft a JSON response
    naturalDate = timeHelpers.validateDate(time);

    if (naturalDate) {
        convertedTimes.unix = moment(naturalDate, 'MMMM Do YYYY').unix();
        convertedTimes.naturalDate = naturalDate;
        return res.json(convertedTimes);
    }

    console.log(`ERROR: ${time} is not a valid Unix time or date.`);

    return res.json(convertedTimes);
});

var timeHelpers = (function () {

    // returns a number or false
    function isUnixTimestamp (time) {
        console.log('time:', time);

        let timeNumber = _.toNumber(time);

        if ( isNaN(timeNumber) ) {
            console.log(`55ERROR: ${timeNumber} is not a number.`);
            return false;
        } else {
            return timeNumber;
        }
    }

    // returns a string of the valid date, or false
    function validateDate (time) {

        let checkDate = moment(time, 'MMMM Do YYYY', true).isValid();

        if (checkDate) {
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

var server = app.listen(process.env.PORT || 4000, () => {
    console.log('Express app listening!');
});

module.exports = {
    server: server,
    timeHelpers: timeHelpers
};
