var foo = Rx.Observable.interval(500).take(5);
var bar = Rx.Observable.interval(400).take(4);

/*

*/

var combined = foo.zip(bar,(x,y)=>x+y);

combined.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

