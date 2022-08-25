import Net from 'net'

import { AddVote } from "models/PollModel"
import {NextApiRequest, NextApiResponse} from "next"

export default async (req: NextApiRequest, res: NextApiResponse)=>{

    if(req.method === "GET"){
        console.log(req)
        res.send("Hello")

    }else if(req.method === "POST"){
        try{
            const {id}:any = req.query
            await AddVote(req.body.answer_id)
            
            res.setHeader("Set-Cookie", `${id}=${req.headers['user-agent']};Path=/;SameSite=Strict;Max-Age=${60*60*24}`)
            res.send({status: "Success"})
        }catch(err){
            res.status(403).send("Forbidden")
        }
    }

}