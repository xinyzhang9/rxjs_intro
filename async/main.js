
let refreshButton = document.querySelector('.refresh');

let refreshClickStream = Rx.Observable.fromEvent(refreshButton,'click');

let startupRequestStream = Rx.Observable.just('https://api.github.com/users');

let requestOnRefreshStream = refreshClickStream
						.map(ev => {
							let randomOffset = Math.floor(Math.random()*500);
							return 'https://api.github.com/users?since'+randomOffset;
						})

let responseStream = requestOnRefreshStream.merge(startupRequestStream)
						.flatMap(requestURL => Rx.Observable.fromPromise(jQuery.getJSON(requestURL))
						);

responseStream.subscribe(response => {
	console.log(response);
})

function createSuggestionStream(responseStream){
	return responseStream.map(listUser => 
		listUser[Math.floor(Math.random()*listUser.length)]
	);
}

function renderSuggestion(userData, selector){
	let element = document.querySelector(selector);
	let usernameEl = element.querySelector('.username');
	usernameEl.href = userData.html_url;
	usernameEl.textContent = userData.login;
	let imgEl = element.querySelector('img');
	imgEl.src = userData.avatar_url;
}
let suggestion1Stream = createSuggestionStream(responseStream);
let suggestion2Stream = createSuggestionStream(responseStream);
let suggestion3Stream = createSuggestionStream(responseStream);

suggestion1Stream.subscribe(user => {
	renderSuggestion(user,'.suggestion1');
})

suggestion2Stream.subscribe(user => {
	renderSuggestion(user,'.suggestion2');
})

suggestion3Stream.subscribe(user => {
	renderSuggestion(user,'.suggestion3');
})