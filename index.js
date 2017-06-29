var AWS = require("aws-sdk");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// AWS Configuration

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://dynamodb.us-west-2.amazonaws.com	"
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.get('/tables', function (req, res) {
  res.send("{list of tables}")
})


var getItem = function (params) {
  return new Promise(function (resolve, reject) {
    docClient.get(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  })
};


app.get('/departamento/:code', function (req, res) {
  var params = {
    TableName: "departamentos",
    Key: {
      "codigo": req.params.code,
      "name": "hola"
    }
  }

  var newd = getItem(params)
  .then((data) => { res.send("<br><br><br><h1>"+JSON.stringify(data)+"</h1>") })
  .catch((err)=>{res.send("not found or bad keys")})


});

app.post('/items/:token', function (req, res) {
  var propItem = JSON.parse(Buffer.from(req.params.token, 'base64').toString('utf8'));
  addItem(propItem)
  console.log('new Item:' + propItem)
})


var addItem = function (params) {
  console.log("Adding a new item...");
  var newItem = {
    TableName: "departamentos",
    Item: {
      "codigo": params.codigo,
      "name": params.name,
      "topics": params.topics
    }
  };

  docClient.put(newItem, function (err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });

}

app.listen(1212, function () {
  console.log('Listening on port 1212')
})
