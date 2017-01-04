var foo = Rx.Observable.of('l','o','v','e','u');
var bar = Rx.Observable.interval(400).take(5);

/*
(hello|)
---0---1---2---3---4|
	zip((x,y)=>x)
---h---e---l---l---o|
	scan((acc,x)=>axx+x,'')
---h---(he)---(hel)---(hell)---(hello)

*/

var combined = foo.zip(bar,(x,y)=>x).scan((acc,x)=>acc+x,'');

combined.subscribe(
	function(x){ console.log('next '+x); },
	function(err){ console.log('error '+err); },
	function(x){ console.log('done'); }
);

