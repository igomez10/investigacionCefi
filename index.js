var AWS = require("aws-sdk");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// AWS Configuration

const pool = require('./lib/db');

//to run a query we just pass it to the pool
//after we're done nothing has to be taken care of
//we don't have to return any client to the pool or close a connection




var getAll = function (tableName) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM '+ tableName, function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    })
  }
  )
};

app.get('/departamentos', function (req, res) {

  var newd = getAll("DEPARTAMENTOS")
    .then((data) => { res.send(JSON.stringify(data.rows)) })
    .catch((err) => { res.send("not found or bad keys") })


});


app.get('/investigaciones', function(req,res){
  var newd = getAll("INVESTIGACIONES")
    .then((data) => { res.send(JSON.stringify(data.rows)) })
    .catch((err) => { res.send("not found or bad keys") })

});



// the token is the json object to add
app.post('/items/:token', function (req, res) {
  var propItem = JSON.parse(Buffer.from(req.params.token, 'base64').toString('utf8'));
  addItem(propItem)
  res.send("new Item:" + JSON.stringify(propItem))
  console.log('new Item:' + JSON.stringify(propItem))
})

// function to add items to the table departamentos
var addItem = function (params) {
  return new Promise(function (resolve, reject) {
    const finalQuery = 'INSERT INTO DEPARTAMENTOS VALUES (' + "'" + params.codigo + "', '" + params.nombre + "')";
    console.log(finalQuery);
    pool.query( finalQuery , function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    })
  }
  )
}

app.get('/componente.js', function(req, res){
  res.sendFile(__dirname + '/src/componente.js')
})


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})



app.listen(1212, function () {
  console.log('Listening on port 1212')
})
