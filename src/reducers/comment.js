const initialState = {
    list: [],
};

export const actionTypes = {
    ADD_COMMENT: "ADD_COMMENT",
};

export const actions = {
    addComment: function(comment){
        return{
            type: actionTypes.ADD_COMMENT,
            comment,
        }
    }
};

export function reducer(state=initialState,action){
    switch(action.type){
        default:
            return state;
    }
};
