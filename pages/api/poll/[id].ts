import { AddVote, GetPoll } from "models/PollModel"
import {NextApiRequest, NextApiResponse} from "next"

const cache = new Set()
let hasChange:boolean = false

export default async (req: NextApiRequest, res: NextApiResponse)=>{

    if(req.method === "GET"){
        const {id}:any = req.query
        const cacheArray = Array.from(cache)
        if(hasChange){
            const poll = await GetPoll(id)
            cache.clear()
            cache.add(poll)
            hasChange = false
        }
        res.setHeader("Content-Type", "text/event-stream")
        res.send(`data: ${JSON.stringify({payload: JSON.stringify(cacheArray[0])})}\n\n`)

    }else if(req.method === "POST"){
        try{
            const {id}:any = req.query
            await AddVote(req.body.answer_id)
            hasChange = true
            res.setHeader("Set-Cookie", `${id}=yes;Path=/;SameSite=Strict;Max-Age=${60*60*24}`)
            res.send({status: "Success"})
        }catch(err){
            res.status(403).send("Forbidden")
        }
    }

}