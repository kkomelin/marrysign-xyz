export const pageview = (url: string) => {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
  window.gtag('config', gaId, { page_path: url })
}

export const event = (action: string, params: any) => {
  window.gtag('event', action, params)
}
