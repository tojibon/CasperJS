/*
A scrapping script to download picjumbo photos.

1. https://picjumbo.com - Base Domain
2. https://picjumbo.com/category/abstract/ - Category URL
3. https://picjumbo.com/category/abstract/page/2/ - Pagination URL
*/

var category = 'abstract';
var links = [];
var curPageImgSrcList = [];
var casper = require("casper").create();

function getCurPageImgSrcList() {
    var curPageImgSrcList = document.querySelectorAll('img.image');
    return Array.prototype.map.call(curPageImgSrcList, function(e) {
		var src = e.getAttribute('src').split("?")[0];
		if (src.indexOf("//") == 0) {
			src = 'https:' + src;
		}
        return src;
    });
}

casper.start("https://picjumbo.com/category/"+category+"/", function() {
	this.echo(this.getTitle());
	curPageImgSrcList = this.evaluate(getCurPageImgSrcList);
});

casper.run(function() {
    this.echo(curPageImgSrcList.length + ' links found:');
    this.echo(' - ' + curPageImgSrcList.join('\n - ')).exit();
	for (i = 0; i < curPageImgSrcList.length; i++) { 
		this.echo('Downloading ' + curPageImgSrcList[i].split(".net/")[1]);
		this.download( curPageImgSrcList[i], category + '/' + curPageImgSrcList[i].split(".net/")[1] );
	}	
});