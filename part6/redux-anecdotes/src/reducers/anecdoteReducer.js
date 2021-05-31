export const vote = (id) => {  return {
  type: 'VOTE',
   id 
}
}
export const create = (anecdote) => {  return {
  type: 'CREATE',
  data: anecdote
}
}
export const initialise = (anecdotes) => {  return {
  type: 'INITIALISE',
  data: anecdotes
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
      return action.data
    default:
      return state.sort((a,b)=>b.votes-a.votes)
  }

}

export default anecdoteReducer