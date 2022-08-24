import type { NextPage } from 'next'
import { useContext, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { AnswersContext } from './_app'

import Answer from 'components/Answer'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const router = useRouter()

  const [answers, setAnswers] = useContext(AnswersContext)
  const [isQuestion, setIsQuestion] = useState(true)
  const [question, setQuestion] = useState("")

  const onAddPoll = async ()=>{
    answers.delete("")
    const addPoll = await fetch(`/api/poll`, {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({answers: Array.from(answers), question})
    })

    if(addPoll.status !== 200) return
    const {id} = await addPoll.json()
    router.push(`/Poll/${id}`)

  }

  const onUpdateAnswerToRender = ()=>{
    const allAnswers = new Set<string>(answers)
    setAnswers(allAnswers)
  }

  const onDeleteAnswer = (answerToRemove: string)=>{
    answers.delete(answerToRemove)
    onUpdateAnswerToRender()
  }

  const onAddAnswer = (newAnswer: string)=>{
    answers.delete("")
    answers.add(newAnswer).add("")
    onUpdateAnswerToRender()
  }

  const allAnswers = Array.from(answers).map((answer)=><Answer key={Math.random()} {...{answer, question, onAddAnswer, onDeleteAnswer}}  />)

  return (
    <>
      <Head>
        <title>Pollster</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.form}>
        {!isQuestion && <h3 className={styles.poll_question}>{question} </h3>}
        {isQuestion ? <div className={styles.form_input}>
          <input type="text" name="question" id="question" className={styles.form_input_box} required value={question} onChange={({currentTarget:{value}})=>setQuestion(value)} onKeyDown={(e)=>{
            if(e.key === "Enter") setIsQuestion(false)
            
          }} />
          <label className={styles.form_input_label} htmlFor="question">Question</label>
        </div> : allAnswers}
        {!isQuestion && 
        <div className={styles.form_action}>
          <button className={`${styles.form_action_btn} ${styles.form_action_backBtn}`} onClick={()=>setIsQuestion(true)}>Retour</button>
          <button className={`${styles.form_action_btn} ${styles.form_action_createBtn}`} onClick={onAddPoll} >Create Poll</button>
        </div>}
      </div>
    </>
  )
}

export default Home
