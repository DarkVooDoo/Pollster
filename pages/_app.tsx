import React, { useState } from 'react'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from 'components/Layout'

function MyApp({ Component, pageProps }: AppProps) {

  const [answers, setAnswers] = useState<string[]>([""])

  const onAnswersChange = (allAnswers: string[])=>{
    setAnswers(allAnswers)
  }

  return (
    <AnswersContext.Provider value={[answers, onAnswersChange]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnswersContext.Provider>
  )
}

export const AnswersContext = React.createContext<[string[], (allAnswers: string[])=>void]>([[], ()=>{}])

export default MyApp
