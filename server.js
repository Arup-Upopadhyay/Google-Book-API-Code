const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route.js').routes;
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

routes.forEach( function(routeItem) {
	app[routeItem['method-type']](`${routeItem['url']}`, require('./controllers/' + routeItem['path'][0])[routeItem['path'][1]]);
});

/*
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/name', function(req, res) {
	console.log('Got ya');
	res.send('Hii');
});
*/

app.listen(process.env.PORT || 8080);
