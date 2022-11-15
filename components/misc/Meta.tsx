import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { APP_NAME, APP_TWITTER_HANDLE, APP_URL } from '../../lib/config'
import { toAbsolute } from '../../lib/helpers'

type MetaProps = {}
const Meta: FC<PropsWithChildren<MetaProps>> = ({ children }) => {
  const description =
    'Digital marriages powered by Blockchain without restrictions on age, location, culture, gender or anything else.'
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" /> */}
        {/* <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        /> */}
        <meta name="msapplication-TileColor" content="#85baa1" />
        <meta
          name="msapplication-config"
          content="/favicon/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}

        <title key="title">{APP_NAME}</title>
        <meta name="description" content={description} key="description" />

        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={APP_NAME} key="og:title" />
        <meta
          property="og:description"
          content={description}
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
