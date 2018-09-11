import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as managerArticleActionTypes} from '../reducers/adminManageArticle';
import {get,post} from '../fetch/fetch';

export function* getAllArticleList(pageNum,rowsPerPage,onlyShowAuditing){
    yield put({type:actionTypes.FETCH_START});
    try{
        if(onlyShowAuditing){
            return yield call(get, `/admin/article/getArticles?pageNum=${pageNum}&rowsPerPage=${rowsPerPage}&onlyShowAuditing=true`);
        }else{
            return yield call(get, `/admin/article/getArticles?pageNum=${pageNum}&rowsPerPage=${rowsPerPage}`);
        }
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"get articles info failed", msgType:0});
        return error.response;
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* dealArticle(id,state){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(post, '/admin/article/dealArticle',{id,state});
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"deal article failed", msgType:0});
        return error.response;
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* getAllArticleListFlow(){
    while(true){
        let request = yield take(managerArticleActionTypes.GET_ALL_ARTICLE_LIST);
        let pageNum = request.pageNum||1;
        let rowsPerPage = request.rowsPerPage||10;
        let onlyShowAuditing = request.onlyShowAuditing;
        let response = yield call(getAllArticleList,pageNum,rowsPerPage,onlyShowAuditing);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                for(let i=0; i<info.data.list.length;i++){
                    info.data.list[i].key = i;
                }
                let data = {};
                data.total = info.data.total;
                data.list = info.data.list;
                data.pageNum = Number.parseInt(pageNum,10);
                data.rowsPerPage = Number.parseInt(rowsPerPage,10);
                data.onlyShowAuditing = onlyShowAuditing;
                yield put({type:managerArticleActionTypes.RESPONSE_ALL_ARTICLE_LIST,data:data});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}
export function* dealArticleFlow(){
    while(true){
        let request = yield take(managerArticleActionTypes.DEAL_ARTICLE);
        const id = request.id;
        const state = request.state;
        let response = yield call(dealArticle,id,state);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                yield put({type: managerArticleActionTypes.GET_ALL_ARTICLE_LIST,pageNum:1})
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}