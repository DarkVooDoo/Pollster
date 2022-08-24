import React, { useEffect, useState } from 'react'

import styles from 'styles/Result.module.css'

const COLORS = ['#40F99B', '#FFC857', '#8DE969', '#8BE8CB', '#7EBC89', '#D7C0D0']

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

    const calcPourcentage = (total: number, votes: number)=>((votes / total) * 100).toFixed(1)

    const getRandomColor = ()=>{
        const luminance = Math.floor(Math.random() * (80 - 50)) + 50
        const saturation = Math.floor(Math.random() * 100)
        const hue = Math.floor(Math.random() * 360)
        return `hsl(${hue} ${saturation}% ${luminance}%)`
    }

    useEffect(()=>{

    }, [])
    
    const results = poll.map(item=>{
        const pourcentage = calcPourcentage(total, item.answer_amount)
        const backgroundColor = getRandomColor()
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
            <h3 className={styles.poll_total}>Total Votes: {total} </h3>
        </div>

    )
}

export default Result