// of
var foo = Rx.Observable.of(42,100,200);

foo.subscribe(function(x){
	console.log('next '+x);
},function(err){
	console.log('error '+err);
},function(){
	console.log('done');
});