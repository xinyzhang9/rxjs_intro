var foo = Rx.Observable.of('l','o','v','e','u')
	.zip(Rx.Observable.interval(600).take(5),(x,y)=>x);

var bar = Rx.Observable.interval(900).take(3);
/*
(hello|)
---0---1---2---3---4|
	zip((x,y)=>x)
---h---e---l---l---o|
	bufferCount(2)
-------he------ll---([o]|)

*/

// var combined = foo.zip(bar,(x,y)=>x).scan((acc,x)=>acc+x,'');
var combined = foo.buffer(bar);

combined.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

