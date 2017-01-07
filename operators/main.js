var foo = Rx.Observable.interval(500)
	.zip(Rx.Observable.of('a','b','c','d',2), (x,y)=>y);

var bar = foo.map(x => x.toUpperCase());
/*

---a---b---c---d---2|
	map(toUpperCase)
---A---B---C---D---#
	catch(# => ---)
---A---B---C---D--------...

*/

// var result = foo.distinct(
// 	(x,y) => x.toLowerCase() === y.toLowerCase()
// );

var result =bar.retryWhen(errorObs => errorObs.delay(3000));
result.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

