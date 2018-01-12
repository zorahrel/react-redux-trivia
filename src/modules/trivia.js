export const QUESTIONS_REQUESTED = 'trivia/QUESTIONS_REQUESTED'
export const QUESTIONS_RECEIVED = 'trivia/QUESTIONS_RECEIVED'
export const ANSWER_QUESTION = 'trivia/ANSWER_QUESTION'

const initialState = {
  isLoading: false,
  questions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONS_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case QUESTIONS_RECEIVED:
      return {
        ...state,
        isLoading: false,
        questions: action.questions
      }

    case ANSWER_QUESTION:
      const questions = [...state.questions.slice()]
      questions[action.question].answer = action.response
      
      return {
        ...state,
        questions
      }

    default:
      return state
  }
}


export const loadQuestions = () => {
  return async dispatch => {
    dispatch({
      type: QUESTIONS_REQUESTED
    })

    const results = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    const { results: questions } = await results.json()

    dispatch({
      type: QUESTIONS_RECEIVED,
      questions
    })
  }
}

export const answer = ({ question, response }) => {
  return dispatch => {
    dispatch({
      type: ANSWER_QUESTION,
      question,
      response
    })
  }
}