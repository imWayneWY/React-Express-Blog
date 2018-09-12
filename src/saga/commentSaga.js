import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as commentActionTypes} from '../reducers/comment';
import {post,get} from '../fetch/fetch';

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
        let id = req.comment.articleId;
        let response = yield call(addComment, req.comment);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                yield put({type: commentActionTypes.GET_COMMENT_LIST,id});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }            
        }
    }
}

export function* getCommentList(){

    while(true){
        let req = yield take(commentActionTypes.GET_COMMENT_LIST);
        yield put({type:actionTypes.FETCH_START});
        try{
            let response = yield call(get,`/comment/getCommentList?id=${req.id}`);
            if(response){
                let info = response.data;
                if(info&&info.code === 0){
                    yield put({type: commentActionTypes.RESPONSE_COMMENT_LIST,data:info.data});
                }else{
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                }            
            };
        } catch(error) {
            yield put({type:actionTypes.SET_MESSAGE,msgContent:"get comment list failed",msgType:0});
        } finally {
            yield put({type:actionTypes.FETCH_END});
        } 
    }
}

export function* reportComment(){

    while(true){
        let req = yield take(commentActionTypes.REPORT_COMMENT);
        yield put({type:actionTypes.FETCH_START});
        try{
            let response = yield call(post,`/comment/report`,req.report);
            let id = req.articleId;
            if(response){
                let info = response.data;
                if(info&&info.code === 0){
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                    yield put({type: commentActionTypes.GET_COMMENT_LIST,id});
                }else{
                    yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                }            
            };
        } catch(error) {
            yield put({type:actionTypes.SET_MESSAGE,msgContent:"report comment failed",msgType:0});
        } finally {
            yield put({type:actionTypes.FETCH_END});
        } 
    }
}