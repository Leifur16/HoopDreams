var request = require('request');


var data = request.get('https://basketball-fields.herokuapp.com/api/basketball-fields', {json: true}, (err, res, body) => {
    if(err) {return console.log(err);}
    return body;
});

module.exports = {
    basketballFields: data
};
