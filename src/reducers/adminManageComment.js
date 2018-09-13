const initialState = {
    list: [],
};

export const actionTypes = {
    GET_REPORTED_COMMENT_LIST: "GET_REPORTED_COMMENT_LIST",
    RESPONSE_REPORTED_COMMENT_LIST: "RESPONSE_REPORTED_COMMENT_LIST",
    CHECKED: "CHECKED",
    DELETE: "DELETE",
};

export const actions = {
    getReportedCommentList: function(){
        return{
            type: actionTypes.GET_REPORTED_COMMENT_LIST,
        }
    },
    checkedComment: function(id){
        return{
            type: actionTypes.CHECKED,
            id,
        }
    },
    deleteComment: function(id){
        return{
            type: actionTypes.DELETE,
            id,
        }
    },
};

export function comments(state=initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_REPORTED_COMMENT_LIST:
            return{
                ...state,
                list: action.data,
            };
        default:
            return state;
    }
};