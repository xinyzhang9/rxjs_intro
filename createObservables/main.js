
// function foo(){
// 	console.log('hello');
// 	return 42;
// }

// console.log(foo.call());

// producer determine when the values are sent
var bar = Rx.Observable.create(function(observer){
	try{
		console.log('hello');
		observer.next(42);
		observer.next(100);
		observer.next(200);
		observer.complete();		

		setTimeout(function(){
			observer.next(300);
		},1000)
	}catch(err){
		observer.error(err);
	}
	
});

// console.log('before');

bar.subscribe(function nextValueHandler(x){
	console.log(x);
},function errorHandler(err){
	console.log('Something went wrong: '+ err);
},function completeHandler(){
	console.log('done');
});

// console.log('after');

// generator
// function* baz(){
// 	console.log('hello');
// 	yield 42;
// 	yield 100;
// 	yield 200;
// }

// consumer determine when the values are sent
// var iterator = baz();
// console.log(iterator.next().value);
// console.log(iterator.next().value);