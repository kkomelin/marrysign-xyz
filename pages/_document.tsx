import { Head, Html, Main, NextScript } from 'next/document'
import { isProd } from '../lib/helpers'

export default function Document() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || undefined
  const isProduction = isProd()

  return (
    <Html lang="en">
      <Head>
        {isProduction && gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
