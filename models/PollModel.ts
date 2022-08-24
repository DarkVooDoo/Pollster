import DB from 'models/DBConn'

type CreatePollTypes = {
    question: string,
    answers: string[]
}

export const CreatePoll = async ({answers, question}:CreatePollTypes)=>{
    const transaction = await DB.connect()
    try{
        await transaction.query("BEGIN")
        const {rows} = await transaction.query("INSERT INTO Poll (poll_question) VALUES($1) RETURNING poll_id", [question])
        for(let answer of answers){
            await transaction.query("INSERT INTO Answer (answer_text, answer_question_id) VALUES($1, $2)", [answer, rows[0].poll_id])
        }
        await transaction.query("COMMIT")
        return {id: rows[0].poll_id}
    }catch(err){
        await transaction.query("ROLLBACK")
        throw("Error")
    }finally{
        transaction.release()
    }
}

export const GetPoll = async (poll_id: string)=>{
    try{
        const {rows} = await DB.query("SELECT * FROM Poll LEFT JOIN Answer ON poll_id=answer_question_id WHERE poll_id=$1", [poll_id])
        return rows
    }catch(err){
        console.log(err)
        throw("Error")
    }
}

export const AddVote = async (answer_id: string)=>{
    try{
        await DB.query("UPDATE Answer SET answer_amount=answer_amount+1 WHERE answer_id=$1", [answer_id])
    }catch(err){
        console.log(err)
        throw(err)
    }
}