let mousemove = Rx.Observable.fromEvent(document,'mousemove');
let source = Rx.Observable.interval(1000).delay(2000).take(30).takeUntil(mousemove).repeat();

let sleepSub = source.subscribe(
	(x)=>{	
			document.getElementById('res').style.visibility = 'visible';
			document.getElementById('res').innerHTML = `You will be logged of after ${30-x} seconds`;
		}
);

let mouseSub = mousemove.subscribe(
	(x) => {
		document.getElementById('res').style.visibility = 'hidden';
	}
)
