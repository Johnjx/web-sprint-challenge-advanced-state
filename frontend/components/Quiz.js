import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const { fetchQuiz, quiz, selectAnswer, postAnswer, selectedAnswer, setNumbers, numbers } = props

  useEffect(() => {
    if (!quiz) { setNumbers(),fetchQuiz() }
  }, [])

  const handlePost = evt => {
    evt.preventDefault()
    postAnswer(quiz.quiz_id, selectedAnswer)
  }

  const handleY = (x) => {
    if (x === 0) {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === quiz.answers[numbers.x].answer_id ? 'selected': ''}`} onClick={() => selectAnswer(quiz.answers[numbers.x].answer_id)}>
                {quiz.answers[numbers.x].text}
                <button>
                  {selectedAnswer === quiz.answers[numbers.x].answer_id? 'SELECTED': 'Select'}
                </button>
              </div>

              <div className={`answer ${selectedAnswer === quiz.answers[handleY(numbers.x)].answer_id ? 'selected': ''}`} onClick={() => selectAnswer(quiz.answers[handleY(numbers.x)].answer_id)}>
                {quiz.answers[handleY(numbers.x)].text}
                <button>
                {selectedAnswer === quiz.answers[handleY(numbers.x)].answer_id? 'SELECTED': 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handlePost} disabled={selectedAnswer ? false: true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)
