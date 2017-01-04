var foo = Rx.Observable.interval(500).take(5)
	.zip(Rx.Observable.of('H','e','l','l','o'),(_,c) => c);

var bar = Rx.Observable.interval(300).take(7)
	.zip(Rx.Observable.of(0,1,0,1,0,1,0),(_,x) => x);

/*

*/

var combined = foo.withLatestFrom(bar,(c,n)=>n===1?c.toUpperCase():c.toLowerCase());

combined.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

