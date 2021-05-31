export const filterAnecdotes = (filter_keyword) => {  return {
    type: 'FILTER',
    filter_keyword
}
}
const initialState = null

const filterReducer = (state = initialState, action) => {
    switch(action.type){
    case 'FILTER':
        return action.filter_keyword   
    default:
        return state
    }
  }
  
export default filterReducer