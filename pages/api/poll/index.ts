import {NextApiRequest, NextApiResponse} from 'next'

import { CreatePoll, GetPoll } from 'models/PollModel'

export default async (req:NextApiRequest, res:NextApiResponse)=>{
    if(req.method === "POST"){
        try{
            const addPoll = await CreatePoll(req.body)
            res.json(addPoll)
        }catch(err){
            res.status(403).send("Forbidden")
        }
    }else if(req.method === "GET"){
        try{
            const id:any = req.query.id
            if(!id) res.status(403).send("Forbidden")
            const poll = await GetPoll(id)
            res.send(poll)
        }catch(err){
            console.log(err)
            res.status(403).send("Forbidden")
        }
    }
}