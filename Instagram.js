var casper = require('casper').create();
var url = 'http://instagram.com/';
 
casper.start(url, function() {
    var js = this.evaluate(function() {
		return document; 
	});	
    this.echo(JSON.stringify(js)); 
});
casper.run();