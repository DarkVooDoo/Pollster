import {NextApiRequest, NextApiResponse} from 'next'

export default (req:NextApiRequest, res:NextApiResponse)=>{
    if(req.method === "POST"){
        console.log(req.body)
        res.send("Succes")
    }
}