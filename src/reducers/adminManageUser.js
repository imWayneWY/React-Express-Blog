const initialState = {
    list: [],
    pageNum: 1,
    total: 0,
    rowsPerPage: 10,
    user: {},

};

export const actionTypes = {
    GET_USERS: "GET_USERS",
    RESOLOVE_USERS_LIST: "RESOLOVE_USERS_LIST",
    UPDATE_USER: "UPDATE_USER"
};

export const actions = {
    getUsers: function (pageNum=1,rowsPerPage=10) {
        return{
            type: actionTypes.GET_USERS,
            pageNum: pageNum,
            rowsPerPage: rowsPerPage
        }
    },
    updateUser: function(user){
        return{
            type: actionTypes.UPDATE_USER,
            user: user
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