import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as commentActionTypes} from '../reducers/comment';
import {post} from '../fetch/fetch';

export function* addComment(comment){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(post, '/comment/addComment',comment);
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE,msgContent:"add comment failed",msgType:0});
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* addCommentFlow(){
    while(true){
        let req = yield take(commentActionTypes.ADD_COMMENT);
        let response = yield call(addComment, req.comment);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }            
        }
    }
}