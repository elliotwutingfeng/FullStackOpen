import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'
const vote = (id) => {  return {
  type: 'VOTE',
   id 
}
}
const create = (anecdote) => {  return {
  type: 'CREATE',
  data: anecdote
}
}
const initialise = (anecdotes) => {  return {
  type: 'INITIALISE',
  data: anecdotes
}
}
export const initialiseAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(initialise(anecdotes))
}
}
export const createNewAnecdote = (content) => {
  return async dispatch => {
      const anecdote = await anecdoteService.createNew(content)
      dispatch(create(anecdote))
      dispatch(setNotification(`you added '${content}'`,5))
  }
}
export const upvoteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote}
    newAnecdote['votes'] += 1
    await anecdoteService.updateExisting(newAnecdote.id,newAnecdote)
    dispatch(vote(newAnecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`,5))
  }
}
const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      return [...state.map(item=>{if(item.id === action.id){
      let newItem = {...item};
      newItem['votes'] += 1
      return newItem
      }
    else{return item}})].sort((a,b)=>b.votes-a.votes)
    case 'CREATE':
      return state.concat(action.data).sort((a,b)=>b.votes-a.votes)
    case 'INITIALISE':
      return action.data.sort((a,b)=>b.votes-a.votes)
    default:
      return state.sort((a,b)=>b.votes-a.votes)
  }

}

export default anecdoteReducer