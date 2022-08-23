import React, { useState } from 'react'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from 'components/Layout'

function MyApp({ Component, pageProps }: AppProps) {

  const [answers, setAnswers] = useState<Set<string>>(new Set([""]))

  const onAnswersChange = (allAnswers: Set<string>)=>{
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

export const AnswersContext = React.createContext<[Set<string>, (allAnswers: Set<string>)=>void]>([new Set([]), ()=>{}])

export default MyApp
