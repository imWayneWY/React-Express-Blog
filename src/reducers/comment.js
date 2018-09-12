const initialState = {
    list: [],
};

export const actionTypes = {
    ADD_COMMENT: "ADD_COMMENT",
    GET_COMMENT_LIST: "GET_COMMENT_LIST",
    RESPONSE_COMMENT_LIST: "RESPONSE_COMMENT_LIST",
    REPORT_COMMENT: "REPORT_COMMENT",
};

export const actions = {
    addComment: function(comment){
        return{
            type: actionTypes.ADD_COMMENT,
            comment,
        }
    },
    getCommentList: function(id){
        return{
            type: actionTypes.GET_COMMENT_LIST,
            id,
        }
    },
    reportComment: function(report,articleId){
        return{
            type: actionTypes.REPORT_COMMENT,
            report,
            articleId,
        }
    }
};

export function reducer(state=initialState,action){
    switch(action.type){
        case actionTypes.RESPONSE_COMMENT_LIST:
            return {
                ...state,
                list: action.data,
            };
        default:
            return state;
    }
};
