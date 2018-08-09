import { put, take, call, fork } from 'redux-sage/effects';
import { actionTypes } from '../reducers';

export function* login(username,password) {
    yield put({type: actionTypes.FETCH_START});
    try{
        return yield call(post, '/user/login', {username,password});
    } catch(error) {
        yield put({type: actionTypes.SET_MESSAGE,msgContent:'The username or passord is incorrect',msgType:0});
    } finally {
        yield put({type: action.FETCH_END});
    }
}
