var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var sessionID;

/* GET users listing. */
router.post('/', function (req, res, next) {

    var cJar = unirest.jar();

    var mobileCount = req.body.mobile.length;
    var sentCount = 0;

    function onSubmitMessage(response) {

        sentCount++;

        if (sentCount >= mobileCount) {
            res.send(JSON.stringify({code: '0', message: 'message(s) successfully sent'}));
        }
    }

    function onSubmitLogin(response) {

        var cookie = response.request.headers.cookie;
        sessionID = cookie.split('~')[1];

        var mobileArray = req.body.mobile;

        mobileArray.forEach(sendMessage);
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
});

module.exports = router;
