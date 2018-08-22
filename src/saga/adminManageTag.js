import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as managerTagActionTypes} from '../reducers/adminManageTag';
import {get, post} from '../fetch/fetch';

export function* getTags(){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(get, '/getTags');
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"get tags failed", msgType:0});
        return error.response;
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}

export function* addTag(name){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(post, '/admin/tags/addTag',{name});
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"add tags failed", msgType:0});
        return error.response;
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* delTag(name){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(get, `/admin/tags/delTag?name=${name}`);
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"del tags failed", msgType:0});
        return error.response;
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* getTagsFlow(){
    while(true){
        yield take(managerTagActionTypes.GET_TAGS);
        let response = yield call(getTags);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                let tags = [];
                tags = info.data.map(tag=> {return tag.name});
                yield put({type:managerTagActionTypes.RESOLOVE_TAGS,data:tags});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}
export function* addTagFlow(){
    while(true){
        let req = yield take(managerTagActionTypes.ADD_TAG);
        let response = yield call(addTag,req.name);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                yield put({type: managerTagActionTypes.GET_TAGS});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}
export function* delTagFlow(){
    while(true){
        let req = yield take(managerTagActionTypes.DEL_TAG);
        let response = yield call(delTag,req.name);
        if(response){
            let info = response.data;
            if(info&&info.code === 0){
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:1});
                yield put({type: managerTagActionTypes.GET_TAGS});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}