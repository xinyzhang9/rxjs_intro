
// DOMs
let refreshButton = document.querySelector('.refresh');
let closeButton1 = document.querySelector('.close1');
let closeButton2 = document.querySelector('.close2');
let closeButton3 = document.querySelector('.close3');

// Streams
let refreshClickStream = Rx.Observable.fromEvent(refreshButton,'click');
let close1Clicks = Rx.Observable.fromEvent(closeButton1,'click');
let close2Clicks = Rx.Observable.fromEvent(closeButton2,'click');
let close3Clicks = Rx.Observable.fromEvent(closeButton3,'click');



let startupRequestStream = Rx.Observable.just('https://api.github.com/users');

let requestOnRefreshStream = refreshClickStream
						.map(ev => {
							let randomOffset = Math.floor(Math.random()*500);
							return 'https://api.github.com/users?since'+randomOffset;
						})

let responseStream = startupRequestStream.merge(requestOnRefreshStream)
						.flatMap(requestURL => {
							console.log('do network request');
							return Rx.Observable.fromPromise(jQuery.getJSON(requestURL));
						})
						.shareReplay(1);

// ----u---------u->
// startWith(null)
// N---u----------->
// -------N----N--->
//	merge
// N---u--N----N-u->

function getRandomUser(listUsers){
	return listUsers[Math.floor(Math.random()*listUsers.length)];
}

function createSuggestionStream(responseStream, closeClickStream){
	return responseStream.map(getRandomUser)
	.startWith(null)
	.merge(refreshClickStream.map(ev => null))
	.merge(
		closeClickStream.withLatestFrom(responseStream,(x,R)=> getRandomUser(R))
	);
}

let suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
let suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
let suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);

//rendering users
function renderSuggestion(suggestedUser, selector){
	let suggestionEl = document.querySelector(selector);
	if(suggestedUser === null){
		suggestionEl.style.visibility = 'hidden';
	}else{
		suggestionEl.style.visibility = 'visible';
		let usernameEl = suggestionEl.querySelector('.username');
		usernameEl.href = suggestedUser.html_url;
		usernameEl.textContent = suggestedUser.login;
		let imgEl = suggestionEl.querySelector('img');
		imgEl.src = "";
		imgEl.src = suggestedUser.avatar_url;
	}
	
}

suggestion1Stream.subscribe(user => {
	renderSuggestion(user,'.suggestion1');
})

suggestion2Stream.subscribe(user => {
	renderSuggestion(user,'.suggestion2');
})

suggestion3Stream.subscribe(user => {
	renderSuggestion(user,'.suggestion3');
})