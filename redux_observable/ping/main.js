const PING = 'PING';
const PONG = 'PONG';

const ping = ()=>({type: PING});

const pingEpic = action$ =>
	action$.ofType(PING)
		.delay(1000)
		.mapTo({type:PONG});

const pingReducer = (state = {isPinging: false}, action) => {
	switch(action.type){
		case 'PING':
			return { isPinging: true };
		case 'PONG':
			return { isPinging: false };
		default:
			return state;
	}
};

