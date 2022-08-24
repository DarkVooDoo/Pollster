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
        try{
            const {id}:any = req.query
            await AddVote(req.body.answer_id)
            res.setHeader("Set-Cookie", `${id}=yes;Path=/;SameSite=Strict;Max-Age=${60*60*24}`)
            res.send({status: "Success"})
        }catch(err){
            res.status(403).send("Forbidden")
        }
    }

}