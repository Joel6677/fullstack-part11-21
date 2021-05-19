import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification} from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.newNotification(`you created '${content}'`, 3)
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input id="create-anecdote" name="anecdote" />
        <button id= "add-button" type="submit">add</button>
      </form>
    </div>

  )
}


export default connect(null, { createAnecdote, newNotification })(NewAnecdote) 