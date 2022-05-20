import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const { fetchQuiz, quiz, selectAnswer, postAnswer, selectedAnswer } = props

  useEffect(() => {
    fetchQuiz()
  }, [])

  const handlePost = evt => {
    evt.preventDefault()
    postAnswer(quiz.quiz_id, selectedAnswer)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === quiz.answers[0].answer_id ? 'selected': ''}`} onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                {quiz.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className={`answer ${selectedAnswer === quiz.answers[1].answer_id ? 'selected': ''}`} onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                {quiz.answers[1].text}
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handlePost}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)
