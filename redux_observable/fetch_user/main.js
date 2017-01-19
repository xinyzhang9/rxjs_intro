const { Observable } = Rx;

const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED =  'FETCH_USER_FULFILLED';
const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED';

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

// reducer
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

