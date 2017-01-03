var foo = Rx.Observable.interval(1000);
/*

foo: --0----1----2----3---
		multiplyBy(2)
bar: --0----2----4----6---
*/

function multipleBy(multiplier){
	var source = this;
	var result = Rx.Observable.create(function subscribe(observer){
		source.subscribe(
			function(x){ observer.next(x * multiplier); },
			function(err){ observer.error(err); },
			function(){ observer.complete(); }
		);
	});
	return result;
}

Rx.Observable.prototype.multipleBy = multipleBy;

var bar = foo.multipleBy(100);

bar.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

