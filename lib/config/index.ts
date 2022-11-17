export const APP_NAME: string = 'MarrySign'
export const APP_URL: string =
  process.env.NODE_ENV === 'production'
    ? 'https://marrysign.com'
    : 'http://localhost:3000'
// export const APP_DESCRIPTION: string =
//   'We empower any couple to register marriage online'
export const APP_DESCRIPTION: string = 'Digital marriages powered by Blockchain without restrictions on age, location, culture, gender or anything else.'
export const APP_SLOGAN: string = 'Unrestricted Crypto Marriages'
// export const APP_SLOGAN: string =
//   'Closer than Copenhagen & quicker than Las Vegas'
// No @ in Twitter handle, please.
// @todo: Replace with the app handle.
export const APP_TWITTER_HANDLE: string = 'kkomelin'

export const SERVICE_FEE_PERCENT = 10
