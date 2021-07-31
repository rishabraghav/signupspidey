const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    
    const url = 'https://us17.api.mailchimp.com/3.0/lists/538391afae';
    const options = {
        method: 'POST',
        auth: 'rishabh1:d42868994530e0efb24b7ee141c811b7-us17'
    }

    const request = https.request(url, options, function(res) {
        res.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
    
})

app.listen(3000, function(){
    console.log("server is started at port http://localhost:3000/");
})



// api key
// 

// list ID
// 538391afae

// curl -X GET \
  
//   --user "anystring:${apikey}"'