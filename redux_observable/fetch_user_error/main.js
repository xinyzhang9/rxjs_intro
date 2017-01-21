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

const fetchUserEpic = 
