const initialState = [];

export const actionTypes = {
    GET_TAGS: "GET_TAGS",
    RESOLOVE_TAGS: "RESOLOVE_TAGS",
    ADD_TAG: "ADD_TAG",
    DEL_TAG: "DEL_TAG",
}

export const actions = {
    getTags: function(){
        return{
            type: actionTypes.GET_TAGS,
        }
    },
    addTag: function(tag){
        return{
            type: actionTypes.ADD_TAG,
            name: tag,
        }
    },
    delTag: function(tag){
        return{
            type: actionTypes.DEL_TAG,
            name: tag,          
        }
    }
}

export function tags(state = initialState, action){
    switch(action.type){
        case actionTypes.RESOLOVE_TAGS:
            return action.data;
        default:
            return state;
    }
}