const setNotify = (content) => {  return {
    type: 'SET_NOTIFICATION',
    content
}
}
const setTimeOutID = (timeoutID) => {  return {
    type: 'SET_TIMEOUTID',
    timeoutID
}
}
const clearNotify = () => {  return {
    type: 'CLEAR_NOTIFICATION',
}
}
export const setNotification = (content,notification_lifetime) => {
    return async dispatch => {
        dispatch(setNotify(content))
        const timeoutID = setTimeout(()=>dispatch(clearNotify()),notification_lifetime*1000)
        dispatch(setTimeOutID(timeoutID))
    }
}
const initialState = {content: null, timeoutID: null}

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
    case 'SET_NOTIFICATION':
        if(state.timeoutID !== null){clearTimeout(state.timeoutID)}
        return {content: action.content, timeoutID: null}
    case 'SET_TIMEOUTID':
        return {content: state.content, timeoutID: action.timeoutID}
    case 'CLEAR_NOTIFICATION':
        return initialState
    default:
        return state
    }
  }
  
export default notificationReducer