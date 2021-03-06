import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as manageUserActionTypes} from '../reducers/adminManageUser';
import {get,post} from '../fetch/fetch';

export function* getUsers(pageNum,rowsPerPage){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(get, `/admin/getUsers?pageNum=${pageNum}&rowsPerPage=${rowsPerPage}`);
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"get users info failed", msgType:0});
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* updateUser(id,type,state){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(post, '/admin/updateUser',{id,type,state});
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"update user failed", msgType:0});
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* getUsersFlow(){
    while(true){
        let request = yield take(manageUserActionTypes.GET_USERS);
        let pageNum = request.pageNum||1;
        let rowsPerPage = request.rowsPerPage||10;
        let response = yield call(getUsers,pageNum,rowsPerPage);
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
                yield put({type:manageUserActionTypes.RESOLOVE_USERS_LIST,data:data});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}
export function* updateUserFlow(){
    while(true){
        let request = yield take(manageUserActionTypes.UPDATE_USER);
        const id = request.user._id;
        const type = request.user.type;
        const state = request.user.state;
        let response = yield call(updateUser,id,type,state);
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