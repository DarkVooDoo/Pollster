import {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'

import { useEffect } from 'react'

import styles from 'styles/Poll.module.css'

interface PollProps {
    id: string,
    poll: {
        poll_id: string,
        poll_question: string,
        poll_lastupdate: string | null,
        answer_id: string,
        answer_text: string,
        answer_amount: number
    }[]
}
const Poll:NextPage<PollProps> = ({id, poll})=>{

    useEffect(()=>{
        (async ()=>{
            const sse = new EventSource(`/api/poll/${id}`)
            sse.onmessage = (e)=>{
                console.log(JSON.parse(e.data))
            }
        })() 
    }, [])

    const answers = poll.map(item=>(
        <div key={item.answer_id} className={styles.poll_answers_single}>
            <p>{item.answer_text} </p>
        </div>
    ))

    return (
        <>
            <Head>
                <title>Poll </title>
            </Head>
            <>
                <h2 className={styles.poll_question}>{poll[0].poll_question}</h2>
                <div className={styles.poll_answers}>
                    {answers}
                </div>
            </>

        </>
    )
}

export const getServerSideProps:GetServerSideProps = async (e)=>{
    const id = e.params?.id
    const fetchPoll = await fetch(`http://localhost:3000/api/poll?id=${id}`)
    const poll = await fetchPoll.json()

    return {props: {id, poll}}
}

export default Poll