const initialState = {
    articleList: [],
    pageNum: 1,
    endOfAll: false,
    editDrawer: false,
    myArticlesDrawer: false,
    detailDrawer: false,
    articleId: '',
};

export const actionTypes = {
    RESPONSE_ARTICLE_LIST: "RESPONSE_ARTICLE_LIST",
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
    SET_DRAWER: "SET_DRAWER",
    SET_ARTICLE_ID: "SET_ARTICLE_ID",
}

export const actions = {
    getArticleList: function (tag='', pageNum = 1){
        return{
            type: actionTypes.GET_ARTICLE_LIST,
            tag,
            pageNum,
        }
    },
    setDrawer: function(side,open){
        return{
            type: actionTypes.SET_DRAWER,
            side,
            open,
        }
    },
    setArticleId: function(id){
        return{
            type: actionTypes.SET_ARTICLE_ID,
            id,
        }
    }
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
        case actionTypes.SET_DRAWER:
          let newState = {};
          newState = {...state};
          newState[action.side] = action.open;
          return newState;
        case actionTypes.SET_ARTICLE_ID:
          return {
              ...state,
              articleId: action.id,
            }
        default:
          return state;
    }
}