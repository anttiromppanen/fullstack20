import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVotedAnecdote = ({ anecdote, numOfVotes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {numOfVotes} votes</p>
    </div>
  )
}

const ViewAnecdote = ({ anecdote, numOfVotes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {numOfVotes} votes</p>
    </div>
  )
}

const Button = ({ text, onBtnPress }) => {
  return (
    <button onClick={onBtnPress}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const onButtonPress = () => {
    const rand = Math.floor(Math.random() * (anecdotes.length))
    setSelected(rand)
  }
  
  const addVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const mostVotedAnecdote = () => {
    let indexOfMostVoted = 0
    let biggest = votes[0]
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > biggest) {
        biggest = votes[i]
        indexOfMostVoted = i
      } 
    }

    return indexOfMostVoted
  }

  console.log(votes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <ViewAnecdote anecdote={anecdotes[selected]} numOfVotes={votes[selected]}/>
      <Button text={"next anecdote"} onBtnPress={onButtonPress} />
      <Button text={"vote"} onBtnPress={addVote} />
      <h2>Anecdote with the most votes</h2>
      <MostVotedAnecdote anecdote={anecdotes[mostVotedAnecdote()]} numOfVotes={votes[mostVotedAnecdote()]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
