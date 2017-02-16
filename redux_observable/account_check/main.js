const { Observable } = Rx;

const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED =  'FETCH_USER_FULFILLED';
const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED';

// action
const fetchUser = id => ({ type: FETCH_USER, payload: id });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });
const cancelFetchUser = ()=> ({ type: FETCH_USER_CANCELLED });

// function
const fakeAjax = url =>
	Observable.of({
		id: url.substring(url.lastIndexOf('/')+1),
		firstName: 'Xinyang',
		lastName: 'Zhang'
	}).delay(1000);


// epic 
const fetchUserEpic = action$ =>
	action$.ofType(FETCH_USER)
		.mergeMap(action =>
			fakeAjax(`/api/users/${action.payload}`)
				.map(fetchUserFulfilled)
				.takeUntil(action$.ofType(FETCH_USER_CANCELLED))
		);

// reducers
const users = (state = {}, action) => {
	switch(action.type){
		case FETCH_USER:
			return {};
		case FETCH_USER_FULFILLED:
			return {
				...state,
				[action.payload.id]:action.payload
			};
		default:
			return state;
	}
}

const isFetchingUser = (state = false, action) => {
	switch(action.type){
		case FETCH_USER:
			return true;
		case FETCH_USER_FULFILLED:
		case FETCH_USER_CANCELLED:
			return false;
		default:
			return state;
	}
};

// start 
const { combineReducers, createStore, applyMiddleware } = Redux;
const { combineEpics, createEpicMiddleware } = ReduxObservable;

const rootReducer = combineReducers({ users, isFetchingUser });

const rootEpic = combineEpics(fetchUserEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

const renderApp = ()=> {
	const userId = 'xz';
	const { users, isFetchingUser } = store.getState();
	const user = users[userId] || '';

	document.body.innerHTML = `
		<div>
			<h1>Fetch User </h1>
			<button onclick = '(${()=>{
				store.dispatch(fetchUser("xz"));
			}})();'
			>
				Fetch User Info
			</button>
			<button onclick = '(${()=>{
				store.dispatch(cancelFetchUser());
			}})();'
			>
				Cancel
			</button>

			<span>${ isFetchingUser? 'Loading...' : '' }</span>
			<div>
				${ user && `
					<textarea>${JSON.stringify(user, null, 2)}</textarea>
				`}
			</div>
		</div>
	`;
};

store.subscribe(renderApp);
renderApp();
