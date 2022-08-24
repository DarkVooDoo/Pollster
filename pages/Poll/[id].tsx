import {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'

import { useEffect } from 'react'

import styles from 'styles/Poll.module.css'

import Vote from 'components/Vote'
import Result from 'components/Result'

interface PollProps {
    id: string,
    alreadyVote: boolean,
    total: number,
    poll: {
        poll_id: string,
        poll_question: string,
        poll_lastupdate: string | null,
        answer_id: string,
        answer_text: string,
        answer_amount: number
    }[]
}
const Poll:NextPage<PollProps> = ({id, alreadyVote, poll, total})=>{

    useEffect(()=>{
        (async ()=>{
            // const sse = new EventSource(`/api/poll/${id}`)
            // sse.onmessage = (e)=>{
            //     console.log(JSON.parse(e.data))
            // }
        })() 
    }, [])


    return (
        <>
            <Head>
                <title>Poll </title>
            </Head>
            {alreadyVote ? <Result {...{poll, total}} /> : <Vote {...{poll}} />}

        </>
    )
}

export const getServerSideProps:GetServerSideProps = async ({params, req})=>{
    const id:any = params?.id
    const alreadyVote = req.cookies[id] ? true : false
    const fetchPoll = await fetch(`http://localhost:3000/api/poll?id=${id}`)
    const poll = await fetchPoll.json()

    return {props: {id, alreadyVote, ...poll}}
}

export default Poll