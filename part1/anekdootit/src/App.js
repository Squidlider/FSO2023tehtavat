import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const MostVoted = ({ votes, anecdotes }) => {
  const mostVotes = Math.max(...votes)
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(mostVotes)]}
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const setRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 8)
    setSelected(randomNumber)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>
      <Button handleClick={setRandomAnecdote} text="Random" />
      <Button handleClick={vote} text="Vote" />
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
