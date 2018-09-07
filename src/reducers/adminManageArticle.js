const initialState = {
    list: [],
    pageNum: 1,
    total: 0,
    rowsPerPage: 10,
    article: {},
    onlyShowAuditing: false,
};

export const actionTypes = {
    GET_ALL_ARTICLE_LIST: "GET_ALL_ARTICLE_LIST",
    RESPONSE_ALL_ARTICLE_LIST: "RESPONSE_ALL_ARTICLE_LIST",
    DEAL_ARTICLE: "DEAL_ARTICLE"
};

export const actions = {
    getAllArticleList: function (pageNum=1,rowsPerPage=10,onlyShowAuditing=false) {
        return{
            type: actionTypes.GET_ALL_ARTICLE_LIST,
            pageNum: pageNum,
            rowsPerPage: rowsPerPage,
            onlyShowAuditing,
        }
    },
    dealArticle: function(id,state){
        return{
            type: actionTypes.DEAL_ARTICLE,
            id,
            state,
        }
    }
};

export function articles(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_ALL_ARTICLE_LIST:
            return{
                list: action.data.list,
                pageNum: action.data.pageNum,
                total: action.data.total,
                rowsPerPage: action.data.rowsPerPage,
                onlyShowAuditing: action.data.onlyShowAuditing,
            }
        default: 
            return state;
    }
}