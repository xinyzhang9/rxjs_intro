// of
// var foo = Rx.Observable.of(42,100,200);


//from event
// function addEventHandler(handler){
// 	document.addEventListener('click',handler);
// }

// function removeEventHandler(handler){
// 	document.removeEventListener('click',handler);
// }

// var foo = Rx.Observable.fromEventPattern(
// 	addEventHandler, removeEventHandler
// )


// var foo = Rx.Observable.fromEvent(document,'click');

// var foo = Rx.Observable.create(function(observer){
// 	var i = 0;
// 	setInterval(function(){
// 		observer.next(i);
// 		i = i+1;
// 	},1000);
// })

// var foo = Rx.Observable.interval(1000);

var date = new Date(new Date().getTime() + 3000);
var foo = Rx.Observable.timer(date,1000);

foo.subscribe(function(x){
	console.log('next '+x);
},function(err){
	console.log('error '+err);
},function(){
	console.log('done');
});