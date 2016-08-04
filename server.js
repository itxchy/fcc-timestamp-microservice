
const compression = require('compression');
const express     = require('express');
const _           = require('lodash');
const app         = express();

app.use(compression());

app.use('/', express.static(__dirname + '/public'));

app.get('/:time', (req, res) => {

    let time = req.params.time;




    res.end(`<h1>${time}</h1>`);
});

function isUnixTimestamp (time) {

    // change time into number
    let time = +time;

    // if time is a number, return the number, else return false
    if 
}

app.listen(4000, () => {
    console.log('Express app listening on port 4000!');
});