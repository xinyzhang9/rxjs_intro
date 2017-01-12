
var subject = new Rx.AsyncSubject();

// ReplaySubject: replays many, before or after completion
// BehaviorSubject: replays one, only before completion
// AsyncSubject: replays one, only if completed

var observableA = {
	next: function(x){ console.log('A next '+x) },
	error: function(err){ console.log('A error '+err); },
	complete: function(){ console.log('A done');}
};

subject.subscribe(observableA);
console.log('observableA subscribed');

var observableB = {
	next: function(x){ console.log('B next '+x) },
	error: function(err){ console.log('B error '+err); },
	complete: function(){ console.log('B done');}
};

setTimeout(()=> subject.next(1),100);
setTimeout(()=> subject.next(2),200);
setTimeout(()=> subject.next(3),300);
setTimeout(()=> subject.complete(),350);


/*
0---1---2---3---|
	............3|
						3|
*/

setTimeout(function(){
	subject.subscribe(observableB);
	console.log('observableB subscribed');
},400);