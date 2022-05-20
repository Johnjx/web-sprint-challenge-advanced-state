// ❗ You don't need to add extra action creators to achieve MVP
import * as types from './action-types'
import axios from 'axios'

const nextQuizURL = "http://localhost:9000/api/quiz/next"
const newQuizURL = "http://localhost:9000/api/quiz/new"
const answerURL = "http://localhost:9000/api/quiz/answer"

export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() { 
  return { type: types.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer) { 
  return { type:types.SET_SELECTED_ANSWER, payload: answer }
}

export function setMessage(message) { 
  return { type: types.SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(data) { 
  return { type: types.SET_QUIZ_INTO_STATE, payload: data }
}

export function inputChange(name, value) { 
  return { type: types.INPUT_CHANGE, payload: { name, value } }
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null))
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(nextQuizURL)
    .then(res => {
      dispatch(setQuiz(res.data))
    })
    .catch(err => console.log(err))
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post(answerURL, { quiz_id: quizId, answer_id: answerId })
    .then(res => {
      dispatch(selectAnswer(null))
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err => console.log(err))
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(newQuizURL)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
