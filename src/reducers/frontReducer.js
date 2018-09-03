const initialState = {
    articleList: [],
    pageNum: 1,
    endOfAll: false,
};

export const actionTypes = {
    RESPONSE_ARTICLE_LIST: "RESPONSE_ARTICLE_LIST",
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
}

export const actions = {
    getArticleList: function (tag='', pageNum = 1){
        return{
            type: actionTypes.GET_ARTICLE_LIST,
            tag,
            pageNum,
        }
    },
}

export function reducer(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_ARTICLE_LIST:
          return {
              ...state,
              articleList: [...action.data.list],
              pageNum: action.data.pageNum,
              endOfAll: action.data.endOfAll,
          }
        default:
          return state;
    }
}