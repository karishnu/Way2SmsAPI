var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var sessionID;
var cheerio = require('cheerio');

/* GET users listing. */
router.post('/', function (req, res, next) {

    if (req.body.username == null || req.body.password == null) {
        res.send(JSON.stringify({code: '200', message: 'Bad Request'}));
    }
    /*    else if(req.body.mobile.size > 25){
     res.send(JSON.stringify({code: '300', message: 'Mobile numbers greater than 25'}));
     }*/
    else {
        var cJar = unirest.jar();

        function onSubmitLogin(response) {

            var cookie = response.request.headers.cookie;

            if (response.request == null || response.request.headers == null) {
                res.send(JSON.stringify({code: '400', message: 'Unknown Error'}));
            }
            else if (cookie == null) {
                res.send(JSON.stringify({code: '100', message: 'Invalid Login'}));
            }
            else if(response.request.headers.cookie){
                unirest.post("http://site21.way2sms.com/sentSMS?Token=" + response.request.headers.cookie.split('~')[1])
                    .jar(cJar)
                    .end(onSubmitLeft);
            }
        }

        function onSubmitLeft(response) {

            var $ = cheerio.load(response.body);

            res.send(JSON.stringify({code: '0', sent: $($('.hed')).text().trim().split('(')[1].split(')')[0], message: 'Logged In Successfully'}));
        }

        unirest.post('http://site21.way2sms.com/content/Login1.action')
            .jar(cJar)
            .form({
                username: req.body.username,
                password: req.body.password
            })
            .end(onSubmitLogin);
    }
});

module.exports = router;