var foo = Rx.Observable.interval(500).take(4);
var bar = Rx.Observable.interval(300).take(5);

/*

*/


var merged = Rx.Observable.merge(foo,bar);

merged.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

