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

const { createStore, applyMiddleware } = Redux;
const { createEpicMiddleware } = ReduxObservable;
const epicMiddleware = createEpicMiddleware(pingEpic);

const store = createStore(pingReducer, applyMiddleware(epicMiddleware));

const renderApp = ()=>{
	const { isPinging } = store.getState();

	document.body.innerHTML = `
		<div>
			<h1>is pinging: ${isPinging} </h1>
			<button onclick = '(${()=>{
				store.dispatch(ping());
			}})();'>start Ping</button>
		</div>
	`;
};
store.subscribe(renderApp);
renderApp();