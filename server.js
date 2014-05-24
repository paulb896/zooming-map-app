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

app.listen(config.serverPort, "127.0.0.1");
console.log('Listening on 127.0.0.1,  port ' + config.serverPort);
