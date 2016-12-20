let button = document.querySelector('.btn');
let label = document.querySelector('h4');

let clickStream = Rx.Observable.fromEvent(button, 'click');

let dbClickStream = clickStream
	.buffer(() => clickStream.debounce(250))
	.map(arr => arr.length)
	.filter(len => len === 2);

dbClickStream.subscribe(event => {
	label.textContent = 'double click';
});

dbClickStream
	.delay(1000)
	.subscribe(suggestion => {
		label.textContent = '-';
	});
