import { fork } from 'redux-saga/effects';
import { loginFlow, registerFlow, logout, user_auth, get_article_detail } from './homeSage';
import { getUsersFlow, updateUserFlow } from './adminManageUser';
import { getTagsFlow, addTagFlow, delTagFlow } from './adminManageTag';
import { saveArticleFlow } from './editSaga';
import { getArticleListFlow, getMyArticleListFlow,delArticle } from './frontSaga';
import {getAllArticleListFlow,dealArticleFlow} from './adminManageArticle';
import {addCommentFlow,getCommentList,reportComment} from './commentSaga';
import {getReportedCommentList, deleteComment, checkedComment} from './adminManageComment';

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
    yield fork(getArticleListFlow);
    yield fork(getMyArticleListFlow);
    yield fork(get_article_detail);
    yield fork(delArticle);
    yield fork(getAllArticleListFlow);
    yield fork(dealArticleFlow);
    yield fork(addCommentFlow);
    yield fork(getCommentList);
    yield fork(reportComment);
    yield fork(getReportedCommentList);
    yield fork(deleteComment);
    yield fork(checkedComment);
}