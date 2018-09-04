import { combineReducers } from 'redux';
import admin from './admin';
import {reducer as front} from './frontReducer';

const initialState = {
    isFetching: true,
    msg: {
        type: 1, //0:fail, 1: success
        content: ''
    },
    userInfo: {},
    articleDetail: {},
};

export const actionTypes = {
    FETCH_START: "FETCH_START",
    FETCH_END: "FETCH_END",
    SET_MESSAGE: "SET_MESSAGE",
    USER_LOGIN: "USER_LOGIN",
    USER_REGISTER: "USER_REGISTER",
    USER_LOGOUT: "USER_LOGOUT",
    RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
    USER_AUTH: "USER_AUTH",
    SAVE_ARTICLE: "SAVE_ARTICLE",
    GET_ARTICLE_DETAIL: "GET_ARTICLE_DETAIL",
    RESPONSE_ARTICLE_DETAIL: "RESPONSE_ARTICLE_DETAIL",
};

export const actions = {
    get_login: function(username, password){
        return {
            type: actionTypes.USER_LOGIN,
            username,
            password
        }
    },
    register: function(username,password){
        return {
            type: actionTypes.USER_REGISTER,
            username,
            password
        }
    },
    logout: function(){
        return {
            type: actionTypes.USER_LOGOUT
        }
    },
    clear_msg: function(){
        return{
            type: actionTypes.SET_MESSAGE,
            msgType: 1,
            msgContent: ''
        }
    },
    user_auth: function(){
        return{
            type: actionTypes.USER_AUTH
        }
    },
    save_article: function(newArticle,articleInfo){
        return{
            type: actionTypes.SAVE_ARTICLE,
            newArticle,
            articleInfo
        }
    },
    get_article_detail: function(id){
        return{
            type: actionTypes.GET_ARTICLE_DETAIL,
            id,
        }
    },
};

export function reducer(state=initialState,action) {
    switch(action.type){
        case actionTypes.FETCH_START:
            return{
                ...state, isFetching: true
            };
        case actionTypes.FETCH_END:
            return{
                ...state, isFetching: false
            }
        case actionTypes.SET_MESSAGE:
            return{
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            }
        case actionTypes.RESPONSE_USER_INFO:
            return{
                ...state, userInfo: action.data
            }
        case actionTypes.RESPONSE_ARTICLE_DETAIL:
            return{
                ...state, articleDetail: action.data
            }
        default:
            return state;
    }
};
export default combineReducers({
    globalState: reducer,
    admin,
    front
})