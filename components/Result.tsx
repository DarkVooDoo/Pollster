import React, { useEffect, useMemo, useState } from 'react'

import styles from 'styles/Result.module.css'

interface ResultProps {
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
const Result:React.FC<ResultProps> = ({poll, total})=>{
    let jsonData:any = ""
    const [dynamicTotal, setDynamicTotal] = useState(total)
    const [pollAnswers, setPollAnswers] = useState(poll)
    const calcPourcentage = (total: number, votes: number)=>((votes / total) * 100).toFixed(1)

    const getRandomColor = useMemo(()=>{
        const luminance = Math.floor(Math.random() * (80 - 50)) + 50
        const saturation = Math.floor(Math.random() * 100)
        const hue = Math.floor(Math.random() * 360)
        return `hsl(${hue} ${saturation}% ${luminance}%)`
    }, [])

    useEffect(()=>{
        let job:NodeJS.Timer
        job = setInterval(async ()=>{
            const fetchPoll = await fetch(`/api/poll?id=${poll[0].poll_id}`)
            const refreshPoll = await fetchPoll.json()
            setPollAnswers(refreshPoll.poll)
            setDynamicTotal(refreshPoll.total)
        }, 60000)
            return ()=>{
                clearInterval(job)
            }
    }, [])
    
    const results = pollAnswers.map(item=>{
        const pourcentage = calcPourcentage(dynamicTotal, item.answer_amount)
        const backgroundColor = getRandomColor
        return (
            <div className={styles.poll_result} key={item.answer_id}>
                <b>{item.answer_text} </b>
                <div style={{width: `${pourcentage}%`, backgroundColor}} className={styles.poll_result_bar} >
                    {parseInt(pourcentage) > 0 && <p>{pourcentage}% </p>}
                </div>
            </div>
        )
    })

    return (
        <div className={styles.poll}>
            <h3 className={styles.poll_question}>{poll[0].poll_question} </h3>
            {results}
            <div className={styles.poll_separator} />
            <h3 className={styles.poll_total}>Total Votes: {dynamicTotal} </h3>
        </div>

    )
}

export default Result