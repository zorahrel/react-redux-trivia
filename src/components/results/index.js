import React from 'react'
import styled from 'styled-components'

const parseBool = (str) => str === 'True'

const Results = ({ questions, onPlayAgain }) => {
  const score = questions.reduce((acc, next) => {
    if (next.answer === parseBool(next.correct_answer)) {
      acc++
    }
    return acc;
  }, 0)
  return (
    <ResultsWrapper>
      <p>You scored {score} out of {questions.length}</p>
      {questions.map(q => {
        const correct = q.answer === parseBool(q.correct_answer)
        return <Answer key={q.question} correct={correct}>
          {correct ? '+' : '-'}
          {' '}
          <span dangerouslySetInnerHTML={{ __html: `${q.question.substring(0, 25)}...`}}/>
        </Answer>
      })}
      <br/>
      <button onClick={onPlayAgain}>Play again?</button>
    </ResultsWrapper>
  )
}

const ResultsWrapper = styled.div``
const Answer = styled.div`
  ${props => props.correct ? `color: green;` : `color: red`}
`

export default Results;