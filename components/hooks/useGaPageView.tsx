import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isProd } from '../../lib/helpers'
import * as ga from '../../lib/helpers/ga'

const useGaPageView = () => {
  const router = useRouter()

  const isProduction = isProd()

  useEffect(() => {
    // Do nothing if it's not Production.
    if (!isProduction) {
      return
    }

    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }

    // Subscribe to router changes and log page views to GA.
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, isProduction])
}

export default useGaPageView
