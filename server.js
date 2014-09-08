// Map zoom server

var express = require('express'),
app = express(),
config={
    serverPort:8111
};

/**
 * Configure express server
 */


app.set('view engine', 'html');
app.use(express.static(__dirname));
app.set('partials', __dirname);
app.set('views', __dirname);
app.engine('.html', require('ejs').__express);

app.listen(config.serverPort);
console.log('Listening on port ' + config.serverPort);
