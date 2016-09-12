var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var sessionID;

/* GET users listing. */
router.post('/', function (req, res, next) {

    if (req.body.username == null || req.body.password == null || req.body.mobile == null || req.body.message == null) {
        res.send(JSON.stringify({code: '200', message: 'Bad Request'}));
    }
/*    else if(req.body.mobile.size > 25){
        res.send(JSON.stringify({code: '300', message: 'Mobile numbers greater than 25'}));
    }*/
    else {
        var cJar = unirest.jar();

        var mobileCount = req.body.mobile.length;
        var sentCount = 0;

        function onSubmitMessage(response) {
            sentCount++;

            //console.log(response);

            if (sentCount >= mobileCount) {
                res.send(JSON.stringify({code: '0', message: 'message(s) successfully sent'}));
            }
        }

        function onSubmitLogin(response) {

            var cookie = response.request.headers.cookie;

            if(response.request == null || response.request.headers == null){
                res.send(JSON.stringify({code: '400', message: 'Unknown Error'}));
            }
            else if (cookie == null) {
                res.send(JSON.stringify({code: '100', message: 'Invalid Login'}));
            }
            else {
                sessionID = cookie.split('~')[1];
                var mobileArray = req.body.mobile;
                mobileArray.forEach(sendMessage);
            }
        }

        function sendMessage(mobileNo) {
            unirest.post("http://site21.way2sms.com/smstoss.action")
                .jar(cJar)
                .form({
                    mobile: mobileNo,
                    message: req.body.message,
                    Token: sessionID
                })
                .end(onSubmitMessage);
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