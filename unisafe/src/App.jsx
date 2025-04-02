import { useState } from 'react'

// komponentti, joka renderöi napin 
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log("Good", updatedGood)
    setTotal(updatedGood + neutral + bad)
    console.log("Total", total)
    setAverage((updatedGood - bad) / (updatedGood + neutral + bad))
    console.log("Average", average)
    setPositive((updatedGood / (updatedGood + neutral + bad)) * 100)
    console.log("Positive", positive)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log("Neutral", updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    console.log("Total", total)
    setAverage((good - bad) / (updatedNeutral + good + bad))
    console.log("Average", average)
    setPositive((good / (updatedNeutral + good + bad)) * 100)
    console.log("Positive", positive)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log("Bad", updatedBad)
    setTotal(updatedBad + good + neutral)
    console.log("Total", total)
    setAverage((good - updatedBad) / (updatedBad + good + neutral))
    console.log("Average", average)
    setPositive((good / (updatedBad + good + neutral)) * 100)
    console.log("Positive", positive)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <h2>Statistics</h2>
      <p>Good: {good} </p>
      <p>Neutral: {neutral} </p>
      <p>Bad: {bad} </p>
      <p>All: {total}</p>
      <p>Average: {average} </p> 
      <p>Positive: {positive}</p>
      </div>
  )
}

export default App