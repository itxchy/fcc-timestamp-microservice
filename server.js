
const compression = require('compression');
const express     = require('express');
const _           = require('lodash');
const app         = express();

app.use(compression());

app.use('/', express.static(__dirname + '/public'));

app.get('/:time', (req, res) => {

    let time = req.params.time;
    let naturalDate = null;
    let unixTimestamp = null;
    let timestampCheck = isUnixTimestamp(time);
    let covertedTimes = {
        unixTimeStamp: unixTimeStamp,
        naturalDate: naturalDate
    }

    // if timestampCheck passes, and is greater than 0, proceed
    if (timestampCheck > 0) {
        unixTimestamp = timestampCheck;
        naturalDate = moment(timestamp).format('MMMM Do YYYY');
        res.json(convertedTimes);
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

app.listen(4000, () => {
    console.log('Express app listening on port 4000!');
});