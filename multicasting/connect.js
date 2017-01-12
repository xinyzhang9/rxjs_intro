var connectableObservable = Rx.Observable.interval(1000)
	.take(5)
	.multicast(new Rx.ReplaySubject(500));

var observableA = {
	next: function(x){ console.log('A next '+x) },
	error: function(err){ console.log('A error '+err); },
	complete: function(){ console.log('A done');}
};

connectableObservable.connect();
connectableObservable.subscribe(observableA);

var observableB = {
	next: function(x){ console.log('B next '+x) },
	error: function(err){ console.log('B error '+err); },
	complete: function(){ console.log('B done');}
};

setTimeout(()=>{
	connectableObservable.subscribe(observableB);
}, 2000)