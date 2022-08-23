import DB from 'models/DBConn'

type CreatePollTypes = {
    question: string,
    answers: string[]
}

export const CreatePoll = async ({answers, question}:CreatePollTypes)=>{

    const {rows} = await DB.query("INSERT INTO Poll (poll_question) VALUES($1)", [question])
}