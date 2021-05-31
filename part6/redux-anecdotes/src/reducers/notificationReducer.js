export const voteNotify = (anecdote) => {  return {
    type: 'VOTE_NOTIFICATION',
    anecdote
}
}
export const addNotify = (anecdote) => {  return {
    type: 'ADD_NOTIFICATION',
    anecdote
}
}
export const clearNotify = () => {  return {
    type: 'CLEAR_NOTIFICATION',
}
}
const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
    case 'VOTE_NOTIFICATION':
        return `you voted '${action.anecdote}'`
    case 'ADD_NOTIFICATION':
        return `you added '${action.anecdote}'`
    case 'CLEAR_NOTIFICATION':
        return null       
    default:
        return state
    }
  }
  
export default notificationReducer