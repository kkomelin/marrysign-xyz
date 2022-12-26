import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import { HOTJAR_ID } from '../../lib/config'
import { isProd } from '../../lib/helpers'
import * as ga from '../../lib/helpers/ga'

const HJID = Number(process.env.NEXT_PUBLIC_HOTJAR_ID || HOTJAR_ID)
const HJSV = 6
const isProduction = isProd()

const useStats = () => {
  const router = useRouter()

  useEffect(() => {
    // Do nothing if it's not Production.
    if (!isProduction) {
      return
    }

    hotjar.initialize(HJID, HJSV)
  }, [])

  useEffect(() => {
    // Do nothing if it's not Production.
    if (!isProduction) {
      return
    }

    const handleRouteChange = (url: string) => {
      ga.pageview(url)
      hotjar.stateChange(url)
    }

    // Subscribe to router changes and log page views to GA.
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

export default useStats
