var foo = Rx.Observable.interval(1000);
/*

foo: --0----1----2----3---
		multiplyBy(2)
bar: --0----2----4----6---
*/

// function calculate(transformationFn){
// 	var source = this;
// 	var result = Rx.Observable.create(function subscribe(observer){
// 		source.subscribe(
// 			function(x){ observer.next(transformationFn(x)); },
// 			function(err){ observer.error(err); },
// 			function(){ observer.complete(); }
// 		);
// 	});
// 	return result;
// }


// Rx.Observable.prototype.calculate = calculate;

var bar = foo.map(x => x * 2);

bar.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

