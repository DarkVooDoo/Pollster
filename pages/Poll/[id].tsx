import {NextPage} from 'next'
import {useRouter} from 'next/router'
import Head from 'next/head'

interface PollProps {
    
}
const Poll:NextPage<PollProps> = ({ })=>{
    const {query} = useRouter()

    return (
        <>
            <Head>
                
            </Head>
            <div>
                {query.id}
            </div>

        </>
    )
}

export default Poll