import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === 'Positive' ? '%' : ''}
      </td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (((good - bad) / all) * 100) / 100
  const positive = (good / all) * 100

  if (all <= 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="All" value={all} />
          <StatisticsLine text="Average" value={average.toFixed(2)} />
          <StatisticsLine text="Positive" value={positive.toFixed(1)} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleSetGood = () => {
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <Button handleClick={handleSetGood} text="Good" />
      <Button handleClick={handleSetNeutral} text="Neutral" />
      <Button handleClick={handleSetBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
