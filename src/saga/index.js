import {fork} from 'redux-saga/effects';
import { loginFlow } from './homeSage';

export default function* rootSaga(){
    yield fork(loginFlow);
}