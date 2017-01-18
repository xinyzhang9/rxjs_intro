const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

const increment = () => ({ type: INCREMENT });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    .filter(() => store.getState().counter % 2 === 1)
    .map(increment);

const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    default:
      return state;
  }
};


const { combineReducers, createStore, applyMiddleware } = Redux;
const { combineEpics, createEpicMiddleware } = ReduxObservable;

const rootReducer = combineReducers({ counter });
const rootEpic = combineEpics(incrementIfOddEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer,applyMiddleware(epicMiddleware));


const renderApp = ()=>{
	const { counter } = store.getState();
	document.body.innerHTML = `
		<div>
			<h1>Current count: ${counter} </h1>
			<button onclick = '(${()=>{
				store.dispatch(increment());
			}})();'>
				increment
			</button>
			<button onclick = '(${()=>{
				store.dispatch(incrementIfOdd());
			}})();'>
				increment if odd
			</button>

		</div>
	`;

};
store.subscribe(renderApp);
	renderApp();