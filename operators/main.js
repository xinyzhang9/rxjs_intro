var foo = Rx.Observable.interval(1000);
/*

foo: --0----1----2----3---
		multiplyBy(2)
bar: --0----2----4----6---
*/


var bar = foo.filter(x => x % 2 === 0)


bar.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

