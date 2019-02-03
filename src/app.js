
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store/configureStore';
import { getUser } from './actions/auth';


const store = configureStore();

store.dispatch(getUser()).then(() => ReactDOM.render(<App store={store} />, document.getElementById('app'))
);