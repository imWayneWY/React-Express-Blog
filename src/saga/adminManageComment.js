import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as manageCommentActionTypes} from '../reducers/adminManageComment';
import {get} from '../fetch/fetch';

export function* getReportedCommentList(){
    while(true){
        yield take(manageCommentActionTypes.GET_REPORTED_COMMENT_LIST);
        yield put({type:actionTypes.FETCH_START});
        try{
            let response = yield call(get, '/admin/comment/getReportedCommentList');
            if(response){
                let info = response.data;
                if(info&&info.code === 0){
                    yield put({type: manageCommentActionTypes.RESPONSE_REPORTED_COMMENT_LIST,data:info.data});
                }else{
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                }
            }
        }catch(error){
            yield put({type:actionTypes.SET_MESSAGE, msgContent:"get comments failed", msgType:0});
        } finally {
            yield put({type:actionTypes.FETCH_END});
        }
    }
};


export function* checkedComment(){
    while(true){
        let request = yield take(manageCommentActionTypes.CHECKED);
        yield put({type:actionTypes.FETCH_START});
        try{
            let response = yield call(get, `/admin/comment/checkedComment?id=${request.id}`);
            if(response){
                let info = response.data;
                if(info&&info.code === 0){
                    yield put({type: manageCommentActionTypes.GET_REPORTED_COMMENT_LIST});
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                }else{
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                }
            }
        }catch(error){
            yield put({type:actionTypes.SET_MESSAGE, msgContent:"check comment failed", msgType:0});
        } finally {
            yield put({type:actionTypes.FETCH_END});
        }
    }
};



export function* deleteComment(){
    while(true){
        let request = yield take(manageCommentActionTypes.DELETE);
        yield put({type:actionTypes.FETCH_START});
        try{
            let response = yield call(get, `/admin/comment/deleteComment?id=${request.id}`);
            if(response){
                let info = response.data;
                if(info&&info.code === 0){
                    yield put({type: manageCommentActionTypes.GET_REPORTED_COMMENT_LIST});
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                }else{
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                }
            }
        }catch(error){
            yield put({type:actionTypes.SET_MESSAGE, msgContent:"check comment failed", msgType:0});
        } finally {
            yield put({type:actionTypes.FETCH_END});
        }
    }
};

