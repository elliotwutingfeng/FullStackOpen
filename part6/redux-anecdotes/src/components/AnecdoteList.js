import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {vote} from  '../reducers/anecdoteReducer'
import { clearNotify, voteNotify } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter_keyword = useSelector(state=>state.filter_keyword)
    const dispatch = useDispatch()
    const voteAnecdote = (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(voteNotify(anecdote.content))
      setTimeout(()=>dispatch(clearNotify()),5000)
    }
    return <>
      {anecdotes.filter(anecdote=> filter_keyword === null || anecdote.content.includes(filter_keyword))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
}
export default AnecdoteList