import React, {useState} from 'react'

import styles from 'styles/Answer.module.css'

interface AnswerProps{
    question: string,
    answer: string,
    onAddAnswer: (newAnswer: string)=> void
  }
  
  const Answer:React.FC<AnswerProps> = ({onAddAnswer, answer})=>{
    const [answers, setAnswers] = useState(answer)
    return (
      <div className={styles.box}>
        <input type="text" name="answer" id="answer" className={styles.box_input} required placeholder='Answer' value={answers} onChange={({currentTarget:{value}})=>setAnswers(value)} onKeyDown={(e)=>{
          if(e.key === "Enter") onAddAnswer(answers)
        }} />
      </div>
    )
  }

export default Answer