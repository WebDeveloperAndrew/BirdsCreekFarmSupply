module.exports = function(app, express) {
const jwt = require('jsonwebtoken');
app.post('/api/login', login);
app.post('/api/token', compareToken);

function login(req, res) 
    {
        var store = '';
        req.on('data', function (data) {
        store += data;
        });
        req.on('end', function () {
            try {
                store = JSON.parse(store);
            }
            catch (e) {
                console.log(e);
                console.error("Could Not Parse JSON data");
                res.send("Could Not Parse JSON data")
            }
            if(store.login == "JeffGraf" && store.password == "bcfeed2019admin")
                res.send({ "Status": "Login Successful", "JWT": generateToken(req.headers['user-agent'])});
            else
                res.send({ "Status": "Login Unsuccessful" });
        });
    }

function generateToken(useragent){
return jwt.sign({
    auth:  'admin',
    agent: useragent,
    exp:   Math.floor(new Date().getTime()/1000) + 7*24*60*60
}, process.env.SECRET); 
}
function validateToken(token){
    // validate the token supplied in request header
    console.log(token);
    try {
      var decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded);
    } catch (e) {
      console.log(e);
      return "Error";
    }
    if(!decoded || decoded.auth !== 'admin') {
      return "Failed";
    } else {
      return "Accepted";
    }
}
function compareToken(req, res)
{
    var store = '';
    req.on('data', function (data) {
    store += data;
    });
    req.on('end', function () {
        try {
            store = JSON.parse(store);
        }
        catch (e) {
            console.log(e);
            console.error("Could Not Parse JSON data");
            res.send("Could Not Parse JSON data")
        }
        validation = validateToken(store.jwt);
        res.send({"Authorization": validation});
    });
}
}