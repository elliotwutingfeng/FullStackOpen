import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {upvoteAnecdote} from  '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter_keyword = useSelector(state=>state.filter_keyword)
    const dispatch = useDispatch()
    return <>
      {anecdotes.filter(anecdote=> filter_keyword === null || anecdote.content.includes(filter_keyword))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>dispatch(upvoteAnecdote(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </>
}
export default AnecdoteList