// of
// var foo = Rx.Observable.of(42,100,200);


//from event
function addEventHandler(handler){
	document.addEventListener('click',handler);
}

function removeEventHandler(handler){
	document.removeEventListener('click',handler);
}

// var foo = Rx.Observable.fromEventPattern(
// 	addEventHandler, removeEventHandler
// )


var foo = Rx.Observable.fromEvent(document,'click');

foo.subscribe(function(x){
	console.log('next '+x);
},function(err){
	console.log('error '+err);
},function(){
	console.log('done');
});