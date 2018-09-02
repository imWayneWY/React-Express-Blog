import { fork } from 'redux-saga/effects';
import { loginFlow, registerFlow, logout, user_auth } from './homeSage';
import { getUsersFlow, updateUserFlow } from './adminManageUser';
import { getTagsFlow, addTagFlow, delTagFlow } from './adminManageTag';
import { saveArticleFlow } from './editSaga';

export default function* rootSaga(){
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(logout);
    yield fork(user_auth);
    yield fork(getUsersFlow);
    yield fork(updateUserFlow);
    yield fork(getTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);
    yield fork(saveArticleFlow);
}