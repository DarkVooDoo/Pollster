import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEventHandler, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [question, setQuestion] = useState("")

  const onAddPoll:FormEventHandler = (e)=>{
    e.preventDefault()
    console.log(`Question: ${question}`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className={styles.form} onSubmit={onAddPoll}>
        <div className={styles.form_input}>
          <input type="text" name="question" id="question" className={styles.form_input_box} required value={question} onChange={({currentTarget:{value}})=>setQuestion(value)} />
          <label htmlFor="question">Question</label>
        </div>
        {/* <button type="submit" >Submit</button> */}
      </form>
    </div>
  )
}

export default Home