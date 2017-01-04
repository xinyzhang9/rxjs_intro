var weight = Rx.Observable.interval(500).take(5);
var height = Rx.Observable.interval(500).take(5);

/*
----0----1----2----(3|)
--0--1--2--3--(4|)
	combineLatest((x,y)=> x+y) (AND style)
----01--23-4--(56)-(7|)	
*/


var bmi = weight.combineLatest(height,(w,h) => w * h);

bmi.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

