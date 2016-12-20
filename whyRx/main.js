console.clear();

let streamA = Rx.Observable.of(3,4,5)
let streamB = streamA.map( a => 10 * a);

streamB.subscribe(b => console.log(b));