import { put, take, call } from 'redux-saga/effects';
import { actionTypes } from '../reducers';
import { get, post } from '../fetch/fetch';

export function* login(username,password) {
    yield put({type: actionTypes.FETCH_START});
    try{
        return yield call(post, '/user/login', {username,password});
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:'The username or passord is incorrect',msgType:0});
    } finally {
        yield put({type: actionTypes.FETCH_END});
    }
}

export function* loginFlow(){
    while(true){
        let request = yield take(actionTypes.USER_LOGIN);
        let response = yield call(login, request.username, request.password);
        let info = response.data;
        if(info && info.code===0){
            yield put({type: actionTypes.SET_MESSAGE, msgContent:'login success!',msgType:1});
            yield put({type: actionTypes.RESPONSE_USER_INFO, data:info.data});
        }
        else{
        }
    }
}

export function* user_auth(){
    while(true){
        yield take(actionTypes.USER_AUTH);
        try{
            yield put({type:actionTypes.FETCH_START});
            let response = yield call(get, 'user/userInfo');
            let info = response.data;
            if(info && info.code === 0){
                yield put({type:actionTypes.RESPONSE_USER_INFO,data:info.data})
            }
        }catch(err){
            console.log(err);
        }finally{
            yield put({type: actionTypes.FETCH_END});
        }
    }
}