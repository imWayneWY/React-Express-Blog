const initialState = {
    articleList: [],
    pageNum: 1,
    endOfAll: false,
    
    editDrawer: false,
    myArticlesDrawer: false,
    detailDrawer: false,
    
    articleId: '',
    
    myArticleList: [],
    myArticleListPageNum: 1,
    myArticleListTotal: 0,
    myArticleListRowsPerPage: 10,

    onlyShowPublished: false,

};

export const actionTypes = {
    RESPONSE_ARTICLE_LIST: "RESPONSE_ARTICLE_LIST",
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
    SET_DRAWER: "SET_DRAWER",
    SET_ARTICLE_ID: "SET_ARTICLE_ID",
    RESPONSE_MY_ARTICLE_LIST: "RESPONSE_MY_ARTICLE_LIST",
    GET_MY_ARTICLE_LIST: "GET_MY_ARTICLE_LIST",
    DEL_ARTICLE: "DEL_ARTICLE",
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
    },
    getMyArticleList: function(pageNum,rowsPerPage,onlyShowPublished){
        return{
            type: actionTypes.GET_MY_ARTICLE_LIST,
            pageNum,
            rowsPerPage,
            onlyShowPublished,
        }
    },
    delArticle: function(id){
        return{
            type: actionTypes.DEL_ARTICLE,
            id,
        }
    }
}

export function reducer(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_ARTICLE_LIST:
          if(action.data.pageNum === '1'){
              state.articleList=[];
          };
          return {
              ...state,
            //   articleList: [...action.data.list],
              articleList: state.articleList.concat(action.data.list),
              pageNum: action.data.pageNum,
              endOfAll: action.data.endOfAll,
          };
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
        case actionTypes.RESPONSE_MY_ARTICLE_LIST:
            return {
                ...state,
                myArticleList: [...action.data.list],
                myArticleListPageNum: action.data.pageNum,
                myArticleListRowsPerPage: action.data.rowsPerPage,
                myArticleListTotal: action.data.total,
                onlyShowPublished: action.data.onlyShowPublished,
            }
        default:
          return state;
    }
}