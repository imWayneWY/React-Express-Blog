import {fork} from 'redux-saga/effects';
import { loginFlow, registerFlow, logout, user_auth } from './homeSage';
import { getUsersFlow, updateUserFlow } from './adminManageUser';

export default function* rootSaga(){
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(logout);
    yield fork(user_auth);
    yield fork(getUsersFlow);
    yield fork(updateUserFlow);
}