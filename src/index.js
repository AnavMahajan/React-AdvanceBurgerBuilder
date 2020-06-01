import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import thunk from 'redux-thunk';


const reducer=combineReducers({
   burgerBuilder: burgerBuilderReducer,
   order:orderReducer,
   auth:authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk) ));

const app=<BrowserRouter>
       <App />
          </BrowserRouter>

ReactDOM.render( <Provider store={store}> {app} </Provider>, document.getElementById('root'));
registerServiceWorker();
