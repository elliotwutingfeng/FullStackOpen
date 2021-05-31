import React from 'react'
import { useDispatch } from 'react-redux'
import {create} from  '../reducers/anecdoteReducer'
import { addNotify, clearNotify } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        if(content.length === 0){return}
        event.target.anecdote.value = ''
        const anecdote = await anecdoteService.createNew(content)
        dispatch(create(anecdote))
        dispatch(addNotify(content))
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