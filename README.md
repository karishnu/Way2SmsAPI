# **Way2SmsAPI**
---
#Request JSON

https://way2smsapi.herokuapp.com/send

    {"username":"9867555569","password":"passsssss","mobile":["9943430733","8952692224"],"message":"Hello Hello Hello"}
    
# Login Test and Sent Number

https://way2smsapi.herokuapp.com/login

    {"username":"9867555569","password":"passsss"}
    
    Successful Response
    
    {"code":"0","sent":"1","message":"Logged In Successfully"}

# Error Responses

    {code: '500', message: 'Day quota finished!'}
    {code: '200', message: 'Bad Request'}
    {code: '400', message: 'Unknown Error'}
    {code: '100', message: 'Invalid Login'}