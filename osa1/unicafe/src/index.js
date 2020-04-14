import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>{text}</button>
    </form>
  )
}

const AllStatistics = ({ statSum, good, neutral, bad, all, avg, posi }) => {
  const stats = 
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={avg} />
        <StatisticLine text={"positive"} value={posi} />
      </tbody>
    </table>

  return statSum > 0 ? stats : "No feedback given"
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (e) => {
    e.preventDefault();
    setGood(good + 1);
  }

  const addNeutral = (e) => {
    e.preventDefault();
    setNeutral(neutral + 1);
  }

  const addBad = (e) => {
    e.preventDefault();
    setBad(bad + 1);
  }

  const all = good + neutral + bad;
  const average = (1 * good - 1 * bad) / all;
  const positiveComments = (good / (good + neutral + bad)) * 100;

  const checkIfNaN = (x) => {
    return isNaN(x) ? 0 : x;
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text={"good"} handleSubmit={addGood} />
      <Button text={"neutral"} handleSubmit={addNeutral} />
      <Button text={"bad"} handleSubmit={addBad} />
      <h2>statistics</h2>
      <AllStatistics
        statSum={all}
        good={good}
        neutral={neutral} 
        bad={bad}
        all={all}
        avg={checkIfNaN(average)}
        posi={`${checkIfNaN(positiveComments)} %`}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

