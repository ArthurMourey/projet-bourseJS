var express = require('express');
var app = express();
app.use(express.static('./public'));

var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/server');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
	name: String,
	symbol: String,
	price: Number
});

var Stock = mongoose.model('Stock', StockSchema);

app.get('/', function(req, response){
	response.send('Hello World');
});


app.route('/stocks').get(function(req, response, next){
	var url = "https://query.yahooapis.com/v1/public/yql?q=env%20'store%3A%2F%2Fdatatables.org%2Falltableswithkeys'%3B%20" ;
	var data = encodeURIComponent('select * from yahoo.finance.quotes where symbol = "' + req.query.symbol + '"');
	var url2 = url + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";

	request.get(url2, function (error, res, body) {
		if (!error && res.statusCode == 200) {
			var dataParsed = JSON.parse(body);
			console.log(dataParsed);
			if(dataParsed.query.count != 0){
				response.json(dataParsed);
			}
		}
		else{
			next();
		}
	});
})
.post(function(req, response, next){
	var stock = new Stock(req.body);
	stock.save(function(erreur){
		if(erreur){
			return next(erreur);
		} else {
			response.json(stock);
		}
	})
});

app.route('/portefeuille').post(function(req, response, next){
	var stock = new Stock(req.body);
	stock.save(function(erreur){
		if(erreur){
			return next(erreur);
		} else {
			response.json(stock);
		}
	})
})
.get(function(req, response, next){
	Stock.find({}, function(erreur, stocks){
		if(erreur){
			return next(erreur);
		} else {
			response.json(stocks);
		}
	})
})
.delete(function(req, response, next){
    var stock = new Stock(req.body);
    stock.remove(function(erreur){
        if(erreur){
            return next(erreur);
        } else {
            console.log(response.json(stock));
        }
    })
});

//TODO : LA FONCTION DELETE AU DESSUS

app.listen(3000);
console.log('Server is running...');
