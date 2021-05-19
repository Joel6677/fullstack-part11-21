import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newNotification} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
             has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}


const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
   
    

  return (
    anecdotes.map(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) ? (
      <Anecdote
        key={anecdote.key}
        anecdote={anecdote}
        handleClick={() => {
          dispatch(vote(anecdote.id))
          dispatch(newNotification(`you voted for ${anecdote.content}`, 3))
        }

        }
      />

    ) : <></>
    )
  )
}

export default Anecdotes