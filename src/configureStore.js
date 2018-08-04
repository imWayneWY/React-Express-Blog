import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import rootSaga from './saga';

const win = window;
const sagaMiddleware = createSagaMiddleware();
const middleware = [];

let storeEnhancers;
if(process.env.NODE_ENV === 'production'){
    storeEnhancers = compose(
        applyMiddleware(...middleware,sagaMiddleware)
    );
} else {
    storeEnhancers = compose(
        applyMiddleware(...middleware,sagaMiddleware),
        (win && win.devToolsExtension)? win.devToolsExtension() : (f)=>f
    )
}

export default function configureStore(initialState={}){
    const store = createStore(rootReducer, initialState, storeEnhancers);
    sagaMiddleware.run(rootSaga);
    return store;
}