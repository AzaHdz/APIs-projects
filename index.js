//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended_: true}));

app.get("/", function(req, res){   //obtiene la pagina en la raiz del documento html y la despliega
  res.sendFile(__dirname + "/index.html");//accede a dicho documento
});

app.post("/", function(req, res){

  var crypto = req.body.crypto; //se obtiene la opcion del drop down menu correspondiente acrypto
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  // var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  // var finalURL = baseURL + crypto + fiat;
var options = { //creamos el objeto con los parametros necesarios para obntener la informacion 
  url:"https://apiv2.bitcoinaverage.com/convert/global?",
  method: "GET",
  qs : {
    from: crypto,
    to : fiat,
    amount : amount
  }
};

  request(options, function(error, response, body){ //para hacer un request a un servidor externo mediante la url

    var data = JSON.parse(body); //obtiene los datos en formato jason para ser utilizados
    var price = data.price; //obtiene el dato last
    var currentDate = data.time; //obtiene la fecha
    console.log(price);
    res.write("<p>The current date is "+ currentDate + "</p>");
    res.write("<h1>"+ amount +" "+ crypto +  " is currently worth " + price +" "+ fiat + "</h1>");

    // console.log(price);
    res.send(); //envia la respuesta
  });
  // console.log(req.body.crypto);
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
