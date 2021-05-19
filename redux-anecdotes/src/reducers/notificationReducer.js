const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.data.content
  case 'REMOVE':
    state = ''
    return state
  default:
    return state
  }
}

let timeoutID

export const newNotification = (content, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: { content }
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, seconds*1000)
  }
}




export default notificationReducer