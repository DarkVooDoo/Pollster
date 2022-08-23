import React, {useEffect, useState, useRef} from 'react'

import styles from 'styles/Answer.module.css'

interface AnswerProps{
    question: string,
    answer: string,
    onAddAnswer: (newAnswer: string)=> void,
    onDeleteAnswer: (answerToRemove: string)=> void
  }
  
const Answer:React.FC<AnswerProps> = ({onAddAnswer, answer, onDeleteAnswer})=>{
    const boxRef = useRef<HTMLDivElement>(null)
    const [answers, setAnswers] = useState(answer)

    useEffect(()=>{
        boxRef.current?.classList.add(styles.box_fade)
    },[])

    return (
      <div ref={boxRef} className={styles.box}>
        <input type="text" name="answer" id="answer" className={styles.box_input} required autoFocus placeholder='Answer' value={answers.toLowerCase()} onChange={({currentTarget:{value}})=>setAnswers(value)} onKeyDown={(e)=>{
          if(e.key === "Enter") onAddAnswer(answers)
        }} />
        <button className={styles.box_remove} onClick={()=>onDeleteAnswer(answer)}>
          <svg
            className={styles.box_remove_svg}
            viewBox="0 0 36.799344 36.799344">
              <g
                id="layer1"
                transform="translate(-33.411139,-82.120597)">
                <rect
                  className={styles.box_remove_svg_line}
                  id="rect61"
                  width="10.216216"
                  height="47.797295"
                  x="-39.550896"
                  y="83.815689"
                  transform="rotate(-45)"
                  ry="5.108108" />
                <rect
                  className={styles.box_remove_svg_line}
                  id="rect63"
                  width="10.216216"
                  height="47.797295"
                  x="102.60623"
                  y="10.544141"
                  transform="rotate(45)"
                  ry="5.108108" />
                </g>
            </svg>
            
        </button>
      </div>
    )
  }

export default Answer