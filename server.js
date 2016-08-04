
const compression = require('compression');
const express     = require('express');
const _           = require('lodash');
const moment      = require('moment');
const app         = express();

app.use(compression());

app.use('/', express.static(__dirname + '/public'));

app.get('/:time', (req, res) => {

    let time = req.params.time;
    let timestamp = isUnixTimestamp(time);
    let naturalDate = null;
    let convertedTimes = {
        unix: null,
        naturalDate: null
    };

    // if timestamp is true, and is greater than 0, proceed
    if (timestamp > 0) {
        convertedTimes.unix = timestamp;
        convertedTimes.naturalDate = moment.unix(timestamp).format('MMMM Do YYYY');
        res.json(convertedTimes);
    }

    naturalDate = validateDate(time);

    // if a valid natural date was passed as a param, parse it.
    if (naturalDate) {
        convertedTimes.unix = moment(naturalDate, 'MMMM Do YYYY').unix();
        convertedTimes.naturalDate = naturalDate;
    }

    res.end(`<h1>${time}</h1>`);
});

// returns a number or false
function isUnixTimestamp (time) {

    let timeNumber = _.toNumber(time);

    if (timeNumber !== NaN) {
        return timeNumber;
    } else {
        return false;
    }
}

function validateDate (time) {

    let checkDate = moment(time, 'MMMM Do YYYY').isValid;

    if (checkDate) {
        return time;
    } else {
        return false;
    }
}

app.listen(4000, () => {
    console.log('Express app listening on port 4000!');
});