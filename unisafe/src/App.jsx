import { useState } from 'react'

// komponentti, joka renderöi napin jonka avulla voi antaa palautetta (good, neutral, bad) tai äänestää anekdoottia tai vaihtaa anekdoottia
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// komponentti, joka renderöi yksittäisen tilastorivin taulukossa (esim. Good 5)
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// komponentti, joka näyttää tilastot (good, neutral, bad, total, average, positive) taulukossa
// jos tilastoja ei ole annettu, näytetään teksti "No feedback given"
const Statistics = ({ good, neutral, bad, total, average, positive }) => {

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
}

// komponentti, joka renderöi koko sovelluksen
// sisältää napit, tilastot ja anekdootit
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
    setAverage((updatedGood - bad) / (updatedGood + neutral + bad))
    setPositive((updatedGood / (updatedGood + neutral + bad)) * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log("Neutral", updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    setAverage((good - bad) / (updatedNeutral + good + bad))
    setPositive((good / (updatedNeutral + good + bad)) * 100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log("Bad", updatedBad)
    setTotal(updatedBad + good + neutral)
    setAverage((good - updatedBad) / (updatedBad + good + neutral))
    setPositive((good / (updatedBad + good + neutral)) * 100)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    const randomPart = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomPart)
  }

  const voteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

return (
  <div>
    <h1>Give feedback</h1>
    <Button onClick={handleGoodClick} text="Good" />
    <Button onClick={handleNeutralClick} text="Neutral" />
    <Button onClick={handleBadClick} text="Bad" />
    <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      total={total}
      average={average}
      positive={positive}
    />
    <h2>Anecdote of the day</h2>
    <p>{anecdotes[selected]}</p>
    <Button onClick={randomAnecdote} text="Next anecdote" />
    <Button onClick={voteAnecdote} text="Vote" />
    <p>Has {votes[selected]} votes</p>
    <h2>Anecdote with most votes</h2>
    <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    <p>Has {Math.max(...votes)} votes</p>
  </div>
)
  }

export default App