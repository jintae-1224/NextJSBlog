import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ErrorBoundary from '../components/ErrorBoundary'

export function reportWebVitals(metric) {
  console.log(metric)
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [visitedTime] = useState(new Date())
  // visitedTime은 새로고침 전까지 계속 유지됨
  return (
    <Layout home={router.pathname === '/'}>
      <div>
        visitedTime :{' '}
        {formatDistanceToNow(new Date(visitedTime), {
          addSuffix: true,
          includeSeconds: true,
        })}
      </div>
      <ErrorBoundary fallbackComponents={<div>민망..</div>}>
        <Component {...pageProps} pathname={router.pathname} />
      </ErrorBoundary>
    </Layout>
  )
}
