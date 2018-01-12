import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { loadQuestions, answer } from 'modules/trivia'

import Question from 'components/question'
import Results from 'components/results'

class App extends Component {
  state = {
    current: '',
    showResults: false
  }
  componentDidMount() {
    this.props.loadQuestions()
  }
  handleBegin = () => {
    this.setState({ current: 0 })
  }
  handleAnswer = (question, response) => {
    this.props.answer({ question, response })
    if (question+1 === this.props.questions.length) {
      this.setState({ showResults: true })
    } else {
      this.setState({ current: question+1 })
    }
  }
  handlePlayAgain = () => {
    this.setState({ current: 0, showResults: false })
  }
  render() {
    const { current, showResults } = this.state
    const { isLoading, questions } = this.props

    const showWelcome = current === '' && !showResults
    const showBegin = !isLoading && questions.length > 0 && current === ''
    const showQuestion = current !== '' && !showResults;

    return (
      <TriviaWrapper>
        <Trivia>
          { showWelcome && <Welcome>
            <h1>Welcome to the Trivia Challenge!</h1>
            <p>You will be presented with 10 <b>true</b> or <b>false</b> questions.</p>
            <p>Can you score 100%?</p>
          </Welcome> }
          { isLoading && <div>Questions are loading</div> }
          { showBegin && <button onClick={this.handleBegin}>Begin!</button> }
          { showQuestion &&
            <Question
              index={current}
              total={questions.length}
              {...questions[current]}
              onAnswer={this.handleAnswer.bind(this, current)}
              isLast={current+1 === questions.length}
            /> }
          { showResults && <Results questions={questions} onPlayAgain={this.handlePlayAgain} />}
        </Trivia>
      </TriviaWrapper>
    )
  }
}

const Welcome = styled.div``

const TriviaWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`

const Trivia = styled.div`
  padding: 20px;
  text-align: center;
`

const mapStateToProps = state => ({
  isLoading: state.trivia.isLoading,
  questions: state.trivia.questions,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadQuestions,
  answer
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
