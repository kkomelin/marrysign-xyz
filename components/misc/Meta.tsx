import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_SLOGAN,
  APP_TWITTER_HANDLE,
  APP_URL,
} from '../../lib/config'
import { isStagingProd, toAbsolute } from '../../lib/helpers'

type MetaProps = {}
const Meta: FC<PropsWithChildren<MetaProps>> = ({ children }) => {
  return (
    <>
      <Head>
        {isStagingProd() && (
          <link rel="canonical" href="https://marrysign.xyz/" />
        )}
        {isStagingProd() && <meta name="robots" content="noindex" />}

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#db2777"
        />
        <meta name="msapplication-TileColor" content="#db2777" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}

        <title key="title">{APP_NAME + ' - ' + APP_SLOGAN}</title>
        <meta name="description" content={APP_DESCRIPTION} key="description" />

        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={APP_NAME} key="og:title" />
        <meta
          property="og:description"
          content={APP_DESCRIPTION}
          key="og:description"
        />
        <meta property="og:locale" content="en_US" key="og:locale" />
        <meta property="og:site_name" content={APP_NAME} key="og:site_name" />
        <meta property="og:url" content={APP_URL} key="og:url" />
        <meta
          property="og:image"
          content={toAbsolute('/images/ogimage.jpg')}
          key="og:image"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        {/* <meta name="twitter:creator" content={`@${SITE_TWITTER_HANDLE}`} key="twitter:creator" /> */}
        <meta
          name="twitter:site"
          content={`@${APP_TWITTER_HANDLE}`}
          key="twitter:site"
        />

        {/* <meta name="author" content={Config.author} key="author" /> */}
        {/* {props.canonical && <link rel="canonical" href={props.canonical} key="canonical" />} */}
      </Head>

      <Head>{children}</Head>
    </>
  )
}

export default Meta
