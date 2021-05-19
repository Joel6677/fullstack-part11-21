const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let anecdotes = [
    {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 4
      },
      {
        "content": "Adding manpower to a late software project makes it later!",
        "id": "21149",
        "votes": 1
      },
      {
        "content": "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "id": "69581",
        "votes": 5
      },
      {
        "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "id": "36975",
        "votes": 4
      },
      {
        "content": "Premature optimization is the root of all evil.",
        "id": "25170",
        "votes": 5
      },
      {
        "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "id": "98312",
        "votes": 8
      },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/anecdotes', (req, res) => { 
  res.json(anecdotes)
})

const generateId = () => {
  const maxId = anecdotes.length > 0
    ? Math.max(...anecdotes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/anecdotes', (request, response) => {
  const body = request.body

  console.log('body: ', body)

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const anecdote = {
    content: body.content,
    id: generateId(),
    votes: body.votes
  }

  anecdotes = anecdotes.concat(anecdote)

  response.json(anecdote)
})

app.get('/api/anecdotes/:id', (request, response) => { 
  const id = request.params.id
  console.log('id: ', id)
  const anecdote = anecdotes.find(anecdote => anecdote.id === id)
  console.log('anecdote: ', anecdote)

  if (anecdote) {
    response.json(anecdote)
  } else {
    response.status(404).end()
  }
})

app.put('/api/anecdotes/:id', (request, response) => {
    const body = request.body
    const id = request.params.id
    console.log('id: ', id)
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    console.log('anecdote: ', anecdote)
    const updatedAnecdote =
    {
        content: body.content,
        id: body.id,
        votes: body.votes
    }

    console.log('updated anecdote: ', updatedAnecdote)

    for (let i = 0; i < anecdotes.length; i++) {
        if (anecdotes[i].id === anecdote.id) {
            anecdotes.splice(i, 1, updatedAnecdote)
        }
    }

    console.log('anecdotes: ', anecdotes)

    response.json(anecdotes)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})