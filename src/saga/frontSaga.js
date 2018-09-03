import {put, take, call} from 'redux-saga/effects';
import { actionTypes } from '../reducers';
import { get } from '../fetch/fetch';
import { actionTypes as frontActionTypes } from '../reducers/frontReducer';

export function* getArticleList(tag,pageNum){
    yield put({type: actionTypes.FETCH_START});
    try{
        return yield call(get, `/article/getArticleList?pageNum=${pageNum}&tag=${tag}`);
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:"fail to get articles",msgType:0});
        return error.response;
    } finally {
        yield put({type: actionTypes.FETCH_END});
    }
}
export function* getArticleListFlow(){
    while(true){
        let request = yield take(frontActionTypes.GET_ARTICLE_LIST);
        let response = yield call(getArticleList, request.tag, request.pageNum);
        if(response){
            let info = response.data;
            if(info && info.code===0){
                yield put({type: frontActionTypes.RESPONSE_ARTICLE_LIST, data:info.data});
            }else if(info){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                yield put({type: frontActionTypes.RESPONSE_USER_INFORESPONSE_ARTICLE_LIST, data:info.data});
            }
        }
    }
}