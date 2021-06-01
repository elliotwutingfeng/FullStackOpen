import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from  '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        if(content.length === 0){return}
        event.target.anecdote.value = ''
        props.createNewAnecdote(content)
      }
    return <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
}
const mapDispatchToProps = { createNewAnecdote }
export default connect(null,mapDispatchToProps)(AnecdoteForm)