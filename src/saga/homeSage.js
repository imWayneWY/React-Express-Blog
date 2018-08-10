import { put, take, call, fork } from 'redux-sage/effects';
import { actionTypes } from '../reducers';
import {post} from '../fetch/fetch';

export function* login(username,password) {
    yield put({type: actionTypes.FETCH_START});
    try{
        return yield call(post, '/user/login', {username,password});
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:'The username or passord is incorrect',msgType:0});
    } finally {
        yield put({type: action.FETCH_END});
    }
}

export function* loginFlow(){
    while(true){
        let request = yield take(actionTypes.USER_LOGIN);
        let response = yield call(login, request.username, request.password);
        if(response && response.code===0){
            yield put({type: actionTypes.SET_MESSAGE, msgContent:'login success!',msgType:1});
            yield put({type: actionTypes.RESPONSE_USER_INFO,data:respinse.data});
        }
    }
}