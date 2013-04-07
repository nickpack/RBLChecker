var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express(),
    dns = require('dns');


server.configure(function() {

  server.use(express["static"](__dirname + "/public"));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));

  server.use(express.bodyParser())

  server.use(server.router);

});

server.get('/check/:ip/:endpoint', function(req, res) {
    var fs = require('fs');
    var file = 'public/lists.json';
    var lists = require('./public/lists');
    var list_in_config = false;

    for (var i = 0; i < lists.length; i++) { 
        if (lists[i].endpoint == req.params.endpoint) {
          list_in_config = true;
          break;
        }
    }

    if (!list_in_config) {
      res.json({ 'error': 'Unknown List'});
    }

    dns.resolveTxt(rbl_hostname(req.params.ip, req.params.endpoint), function (err, addresses) {

        if (err) {
          if (err.code === 'ENOTFOUND') {
            // Not listed.
            res.json(false);
            return;
          } else {
            res.json('error');
          }
        }
        res.json(addresses);
    });
});

function rbl_hostname (ip, endpoint) {
    ip_parts = ip.split('.');
    return ip_parts.reverse().join('.') + '.' + endpoint;
}

http.createServer(server).listen(port);

console.log('RBL Checker is running...\n\nPlease go to http://localhost:' + port);