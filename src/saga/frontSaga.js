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
                yield put({type: frontActionTypes.RESPONSE_ARTICLE_LIST, data:info.data});
            }
        }
    }
}



export function* getMyArticleList(pageNum,rowsPerPage,onlyShowPublished){
    yield put({type: actionTypes.FETCH_START});
    try{
        if(onlyShowPublished){
            return yield call(get, `/article/getMyArticleList?pageNum=${pageNum}&rowsPerPage=${rowsPerPage}&state=published`);
        }else{
            return yield call(get, `/article/getMyArticleList?pageNum=${pageNum}&rowsPerPage=${rowsPerPage}`);
        }
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:"fail to get articles",msgType:0});
        return error.response;
    } finally {
        yield put({type: actionTypes.FETCH_END});
    }
}

export function* getMyArticleListFlow(){
    while(true){
        let request = yield take(frontActionTypes.GET_MY_ARTICLE_LIST);
        let pageNum = request.pageNum||1;
        let rowsPerPage = request.rowsPerPage||10;
        let onlyShowPublished = request.onlyShowPublished;
        let response = yield call(getMyArticleList,pageNum,rowsPerPage,onlyShowPublished);
        if(response){
            let info = response.data;
            if(info && info.code===0){
                for(let i=0; i<info.data.list.length;i++){
                    info.data.list[i].key = i;
                }
                let data = {};
                data.total = info.data.total;
                data.list = info.data.list;
                data.pageNum = Number.parseInt(pageNum,10);
                data.rowsPerPage = Number.parseInt(rowsPerPage,10);
                data.onlyShowPublished = onlyShowPublished;
                yield put({type: frontActionTypes.RESPONSE_MY_ARTICLE_LIST, data});
            }else if(info){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
                yield put({type: frontActionTypes.RESPONSE_MY_ARTICLE_LIST, data:info.data});
            }
        }
    }
}

export function* delArticle(){
    while(true){
        let req = yield take(frontActionTypes.DEL_ARTICLE);
        const {id} = req;
        try{
            yield put({type:actionTypes.FETCH_START});
            let response = yield call(get, `/article/delArticle?id=${id}`);
            let info = response.data;
            if(info && info.code === 0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
            }else if(info){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }catch(err){
            console.log(err.data);
        }finally{
            yield put({type: actionTypes.FETCH_END});
        }
    }
}