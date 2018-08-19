const initialState = {
    list: [],
    pageNum: 1,
    total: 0,
    rowsPerPage: 10
};

export const actionTypes = {
    GET_USERS: "GET_USERS",
    RESOLOVE_USERS_LIST: "RESOLOVE_USERS_LIST"
};

export const actions = {
    getUsers: function (pageNum=1,rowsPerPage=10) {
        return{
            type: actionTypes.GET_USERS,
            pageNum: pageNum,
            rowsPerPage: rowsPerPage
        }
    }
};

export function users(state = initialState, action){
    switch(action.type){
        case actionTypes.RESOLOVE_USERS_LIST:
            return{
                list: action.data.list,
                pageNum: action.data.pageNum,
                total: action.data.total,
                rowsPerPage: action.data.rowsPerPage
            }
        default: 
            return state;
    }
}