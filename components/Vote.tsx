import React, {useState} from 'react'

import styles from 'styles/Poll.module.css'

interface VoteProps {
    poll: {
        poll_id: string,
        poll_question: string,
        poll_lastupdate: string | null,
        answer_id: string,
        answer_text: string,
        answer_amount: number
    }[]
}
const Vote:React.FC<VoteProps> = ({poll })=>{
    const [pickAnswer, setPickAnswer] = useState("")

    const onAddVote = async ()=>{
        const vote = await fetch(`/api/poll/${poll[0].poll_id}`, {
            method: "POST",
            headers: [["Content-Type", "application/json"]],
            body: JSON.stringify({answer_id: pickAnswer})
        })
    }

    const answers = poll.map(item=>(
        <div key={item.answer_id} className={styles.poll_answers_single}>
            <input  type="radio" name="vote" value={item.answer_text} onChange={({currentTarget:{value}})=>setPickAnswer(item.answer_id)} />
            <label htmlFor="vote">{item.answer_text}</label>
        </div>
        
    ))

    return (
        <div className={styles.poll_container}>
            <h2 className={styles.poll_question}>{poll[0].poll_question}</h2>
            <div className={styles.poll_answers}>
                {answers}
            </div>
            <div className={styles.poll_button}>
                <button className={styles.poll_button_result}>Results</button>
                <button className={styles.poll_button_vote} onClick={onAddVote}>Vote</button>
            </div>
        </div>

    )
}

export default Vote