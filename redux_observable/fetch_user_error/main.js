// make ajax call fail at some times

const ajaxShouldError = true;

const { Observable } = Rx;

const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';

const fetchUser = id => ({ type: FETCH_USER, payload: id });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });
const fetchUserRejected = payload => ({ type: FETCH_USER_REJECTED, payload, error: true });

let callCount = -1;

const fakeAjax = url => {
	callCount++;
	if (ajaxShouldError && callCount % 2 === 0){
		return Observable.throw({
			xhr: {
				response: {
					message: 'AJAX CALL FAILED!'
				}
			}
		}).materialize().delay(1000).dematerialize();
	} else {
		return Observable.of({
			id: url.substring(url.lastIndexOf('/')+1),
			firstName: 'Xinyang',
			lastName: 'Zhang'
		}).delay(1000);
	}
};

const fetchUserEpic = action$ => 
	action$.ofType(FETCH_USER)
		.mergeMap(action => 
			fakeAjax(`/api/users/${action.payload}`)
				.map(fetchUserFulfilled)
				.catch(error => Observable.of(
					fetchUserRejected(error.xhr.response)
				))
		);

// reducers
const users = (state = {}, action) => {
	switch(action.type){
		case FETCH_USER:
			return {};
		case FETCH_USER_FULFILLED:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		default:
			return state;
	}
};

const fetchUserError = (state = null, action) => {
	switch(action.type){
		case FETCH_USER:
		case FETCH_USER_FULFILLED:
			return null;
		case FETCH_USER_REJECTED:
			return action.payload;
		default:
			return state;
	}
};

const { combineReducers, createStore, applyMiddleware } = Redux;
const { combineEpics, createEpicMiddleware } = ReduxObservable;

const rootReducer = combineReducers({users, fetchUserError});
const rootEpic = combineEpics(fetchUserEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

const renderApp = ()=> {
	const userId = 'xz';
	const { users, fetchUserError } = store.getState();
	const user = users[userId] || '';

	document.body.innerHTML = `
		<div>
			<h1>Fetch User Demo</h1>
			<button onclick = "(${()=>{
				store.dispatch(fetchUser('xz'));
			}})();"
			>
				Fetch User Info
			</button>

			<div>
				${fetchUserError ? '<p color = "red"> ERROR: '+ fetchUserError.message + '</p>' : ''}
				${user && `<textarea>${JSON.stringify(user, null, 4)}</textarea>` }
			</div>
		</div>
	`;
};

store.subscribe(renderApp);
renderApp();







