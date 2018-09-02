import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {post} from '../fetch/fetch';

export function* saveArticle(newArticle,articleInfo){
    yield put({type:actionTypes.FETCH_START});
    try{
        if(newArticle){
            return yield call(post, '/addArticle', articleInfo);
        }else{

        }
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE,msgContent:"save article failed",msgType:0});
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* saveArticleFlow(){
    while(true){
        let req = yield take(actionTypes.SAVE_ARTICLE);
        let response = yield call(saveArticle,req.newArticle,req.articleInfo);
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