import React from 'react'
import { useDispatch } from 'react-redux'
import {create} from  '../reducers/anecdoteReducer'
import { addNotify, clearNotify } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        if(anecdote.length === 0){return}
        event.target.anecdote.value = ''
        dispatch(create(anecdote))
        dispatch(addNotify(anecdote))
        setTimeout(()=>dispatch(clearNotify()),5000)
      }
    return <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
}
export default AnecdoteForm