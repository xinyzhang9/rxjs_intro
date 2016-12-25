// variables 
let refreshButton = document.querySelector('.refresh');

let refreshClickStream = Rx.Observable.fromEvent(refreshButton,'click');

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
function createSuggestionStream(responseStream){
	return responseStream.map(listUser => 
		listUser[Math.floor(Math.random()*listUser.length)]
	).startWith(null)
	.merge(refreshClickStream.map(ev => null));
}

let suggestion1Stream = createSuggestionStream(responseStream);
let suggestion2Stream = createSuggestionStream(responseStream);
let suggestion3Stream = createSuggestionStream(responseStream);

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