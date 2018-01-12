import React from 'react'
import styled from 'styled-components'

const Question = ({ index, total, category, question, onAnswer, isLast }) => (
  <QuestionWrapper>
    <Status>Question {index+1} of {total}</Status>
    <Category>Category {category}</Category>
    <QuestionBox dangerouslySetInnerHTML={{ __html: question }}/>
    <button onClick={onAnswer.bind(this, true)}>True</button>
    {' '}
    <button onClick={onAnswer.bind(this, false)}>False</button>
    { isLast && <small><br/>you will see the score after this reply</small>}
  </QuestionWrapper>
)

const QuestionWrapper = styled.div``

const Category = styled.div`
  font-weight: bold;
`
const QuestionBox = styled.div`
  margin: 20px 0;
  border: 1px solid #333;
  padding: 30px;
  max-width: 300px;
`;

const Status = styled.div`

`

export default Question;