import {fork} from 'redux-saga/effects';
import { loginFlow, user_auth } from './homeSage';

export default function* rootSaga(){
    yield fork(loginFlow);
    yield fork(user_auth);
}