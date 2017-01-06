var foo = Rx.Observable.interval(500).take(5)
	.zip(Rx.Observable.of('a','b','a','a','b'), (x,y)=>y);
/*

---a---b---a---a---b|
	distinctUntilChanged
---a---b---a-------b|

*/

// var result = foo.distinct(
// 	(x,y) => x.toLowerCase() === y.toLowerCase()
// );

var result = foo.distinctUntilChanged();
result.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

