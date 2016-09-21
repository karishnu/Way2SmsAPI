# **Way2SmsAPI**
---
# Login

**URI** - [site21.way2sms.com/Login1.action](site21.way2sms.com/Login1.action)

**Type** - Post

**Parameters**
* username
* password

## Send SMS
**URI** - [site21.way2sms.com/smstoss.action](site21.way2sms.com/smstoss.action)

**Type** - Post

**Parameters**
* mobile
* message
* **Token**


#Request JSON

https://way2smsapi.herokuapp.com/send

    {"username":"9867555569","password":"passsssss","mobile":["9943430733","8952692224"],"message":"Hello Hello Hello"}
    
# Login Test and Sent Number

https://way2smsapi.herokuapp.com/login

    {"username":"9867555569","password":"passsss"}
    
    Successful Response
    
    {"code":"0","sent":"1","message":"Logged In Successfully"}
