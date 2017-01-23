const PING = 'PING';
const PONG = 'PONG';

const ping =  () => ({type: PING});

const pingEpic = action$ =>
	action$.ofType(PING)
		.delay(1000)
		.mapTo({type: PONG});

const pingReducer = (state = { isPinging: false }, action) => {
	switch(action.type){
		case PING:
			return { isPinging: true };
		case PONG:
			return { isPinging: false };
		default:
			return state;
	}	
};

const { connect } = ReactRedux;
let App = ({ isPinging, ping }) => (
	<div>
		<h1>is pinging: { isPinging.toString() }</h1>
		<button onClick = { ping }>Start PING</button>
	</div>
);

// connect(mapStateToProps, mapDispatchToProps)
const mapStateToProps = (state) => ({ isPinging: state.isPinging });

// App = connect(
// 	({ isPinging }) => ({ isPinging }),{ ping }
// )(App);

App = connect(mapStateToProps, {ping})(App);

const { Provider } = ReactRedux;
const { createStore, applyMiddleware } = Redux;
const { createEpicMiddleware } = ReduxObservable;

const epicMiddleware = createEpicMiddleware(pingEpic);

const store = createStore(pingReducer, applyMiddleware(epicMiddleware));

ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>,
	document.getElementById('root')
);