import {put, take, call} from 'redux-saga/effects';
import {actionTypes} from '../reducers';
import {actionTypes as managerUserActionTypes} from '../reducers/adminManageUser';
import {get} from '../fetch/fetch';

export function* getUsers(pageNum,rowsPerPage){
    yield put({type:actionTypes.FETCH_START});
    try{
        return yield call(get, `/admin/getUsers?pageNum=${pageNum}&rowsPerPage=${rowsPerPage}`);
    } catch(error) {
        yield put({type:actionTypes.SET_MESSAGE, msgContent:"get users info failed", msgType:0});
        return error.response;
    } finally {
        yield put({type:actionTypes.FETCH_END});
    }
}
export function* getUsersFlow(){
    while(true){
        let request = yield take(managerUserActionTypes.GET_USERS);
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
                yield put({type:managerUserActionTypes.RESOLOVE_USERS_LIST,data:data});
            }else{
                yield put({type: actionTypes.SET_MESSAGE, msgContent:info.message,msgType:0});
            }
        }
    }
}