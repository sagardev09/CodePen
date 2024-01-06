const searchReducer = (state = "", action) => {
    switch (action.type) {
        case "SEARCH_TERM":
            return {
                ...state,
                searchterm: action.searchterm
            }
        case "SET_SEARCH_TERM_NULL":
            return {
                ...state,
                searchterm: ""
            }
        default:
            return state
    }
}

export default searchReducer