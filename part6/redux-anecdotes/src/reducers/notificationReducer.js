const setNotify = (content) => {  return {
    type: 'SET_NOTIFICATION',
    content
}
}
const clearNotify = () => {  return {
    type: 'CLEAR_NOTIFICATION',
}
}
export const setNotification = (content,notification_lifetime) => {
    return async dispatch => {
        dispatch(setNotify(content))
        setTimeout(()=>dispatch(clearNotify()),notification_lifetime*1000)
    }
}
const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
    case 'SET_NOTIFICATION':
        return action.content
    case 'CLEAR_NOTIFICATION':
        return null       
    default:
        return state
    }
  }
  
export default notificationReducer