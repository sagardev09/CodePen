export const SEARCH_TERM = (searchterm) => {
    return {
        type: 'SEARCH_TERM',
        searchterm: searchterm
    }
}
export const SET_SEARCH_TERM_NULL = () => {
    return {
        type: 'SET_SEARCH_TERM_NULL',
    }
}