import React from 'react'

interface ResultProps {
    poll: {
        poll_id: string,
        poll_question: string,
        poll_lastupdate: string | null,
        answer_id: string,
        answer_text: string,
        answer_amount: number
    }[]
}
const Result:React.FC<ResultProps> = ({poll })=>{
    return (
        <div>
            
        </div>

    )
}

export default Result