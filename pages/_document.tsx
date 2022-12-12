import { Head, Html, Main, NextScript } from 'next/document'
import { isProd } from '../lib/helpers'

export default function Document() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || undefined
  const isProduction = isProd()

  return (
    <Html lang="en">
      <Head>
        {isProduction && (
          <>
            {gaId && (
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

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:3284638,hjsv:6};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
