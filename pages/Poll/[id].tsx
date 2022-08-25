import {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'

import { useEffect, useState } from 'react'

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

    const [totalVotes, setTotalVotes] = useState(total)
    const [pollPayload, setPollPayload] = useState(poll)
    const [userVote, setUserVote] = useState(alreadyVote)

    const onUserVote = (answer_id: string)=> {
        const index = pollPayload.findIndex(item=>item.answer_id === answer_id)
        pollPayload[index] = {...pollPayload[index], answer_amount: pollPayload[index].answer_amount+1}
        setPollPayload([...pollPayload])
        setTotalVotes(prev=>prev+1)
        setUserVote(true)
    }

    return (
        <>
            <Head>
                <title>Poll </title>
            </Head>
            {userVote ? <Result {...{poll: pollPayload, total: totalVotes}} /> : <Vote {...{poll: pollPayload, onUserVote}} />}

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