import { AddVote } from "models/PollModel"
import {NextApiRequest, NextApiResponse} from "next"

export default async (req: NextApiRequest, res: NextApiResponse)=>{

    if(req.method === "GET"){
        // GetCachePoll()
        // const {id}:any = req.query.id
        // usersConnected.add(id)
        // res.setHeader("Content-Type", "text/event-stream")
        // res.send(`data: ${JSON.stringify({hello: "Moises"})}\n\n`)
        res.send("He")

    }else if(req.method === "POST"){
        const updatePoll = await AddVote(req.body.answer_id)
    }

}