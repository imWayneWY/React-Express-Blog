import { put, take, call } from 'redux-saga/effects';
import { actionTypes } from '../reducers';
import { get, post } from '../fetch/fetch';

export function* login(username,password) {
    yield put({type: actionTypes.FETCH_START});
    try{
        return yield call(post, '/user/login', {username,password});
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:"login failed",msgType:0});
        return error.response;
    } finally {
        yield put({type: actionTypes.FETCH_END});
    }
}

export function* loginFlow(){
    while(true){
        let request = yield take(actionTypes.USER_LOGIN);
        let response = yield call(login, request.username, request.password);
        if(response){
            let info = response.data;
            if(info && info.code===0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                yield put({type: actionTypes.RESPONSE_USER_INFO, data:info.data});
            }else if(info){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                yield put({type: actionTypes.RESPONSE_USER_INFO, data:info.data});
            }
        }
    }
}

export function* register(username,password) {
    yield put({type: actionTypes.FETCH_START});
    try{
        return yield call(post, '/user/register', {username,password});
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:"register failed",msgType:0});
        return error.response;
    } finally {
        yield put({type: actionTypes.FETCH_END});
    }
}

export function* registerFlow(){
    while(true){
        let request = yield take(actionTypes.USER_REGISTER);
        let response = yield call(register, request.username, request.password);
        if(response){
            let info = response.data;
            if(info && info.code===0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                yield put({type: actionTypes.RESPONSE_USER_INFO, data:info.data});
            }else if(info){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                yield put({type: actionTypes.RESPONSE_USER_INFO, data:info.data});
            }
        }
    }
}

export function* user_auth(){
    while(true){
        yield take(actionTypes.USER_AUTH);
        try{
            yield put({type:actionTypes.FETCH_START});
            let response = yield call(get, '/user/userInfo');
            let info = response.data;
            if(info && info.code === 0){
                yield put({type:actionTypes.RESPONSE_USER_INFO,data:info.data});
            }
        }catch(err){
            console.log(err);
        }finally{
            yield put({type: actionTypes.FETCH_END});
        }
    }
}

export function* logout(){
    while(true){
        yield take(actionTypes.USER_LOGOUT);
        try{
            yield put({type:actionTypes.FETCH_START});
            let response = yield call(post, '/user/logout',{});
            let info = response.data;
            if(info && info.code === 0){
                yield put({type:actionTypes.RESPONSE_USER_INFO,data: info.data});
            }
        }catch(err){
            console.log(err);
        }finally{
            yield put({type: actionTypes.FETCH_END});
        }
    }
}