var foo = Rx.Observable.interval(100).take(5);
/*

---0---1---2---3---4|
	debounceTime(1000) //waits for 1000 silence
-----0---1---2---3---4|

*/

var result = foo.debounce(() =>
	Rx.Observable.interval(1000).take(1)
);

result.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

